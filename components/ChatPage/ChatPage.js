import { VDom } from "../../my_core/VDom";
import Router, {RouterLink} from "../../my_core/router";
import WebSocket from "../../my_core/WebSocket";

import { state } from '../../my_core/core'

const host = 'https://ya-praktikum.tech/api/v2'

async function create_chat (e) {
    e.preventDefault()
    const title = (document.getElementsByName('title')[0]).value

    const create_chatResult = (await fetch(`${host}/chats`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ title }),
    }))

    if (create_chatResult.status !== 200) {
        const error = await create_chatResult.json()
        alert(error.reason)
        return
    }

    const chatsResult = await fetch(`${host}/chats`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.chats = await chatsResult.json()

    Router.get().to('/messenger')
}

async function selectChat (chat) {
    const onMessage = (message) => {
        console.log(message)
        const messages = JSON.parse(message)
        Array.isArray(messages) ? state.messages.push(...messages) : state.messages.push(messages)
        Router.get().to('/messenger')
    }

    if (state.currentChat?.id != chat.id) {
        state.messages = []
    }

    const tokenResult = await fetch(`${host}/chats/token/${chat.id}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })

    const token = await tokenResult.json()

    state.currentChat = chat
    state.webSocket = new WebSocket(state.user.id, chat.id, token.token, onMessage, () => { state.webSocket.getOld() })

    Router.get().to('/messenger')
}

async function sendMessage (e) {
    e.preventDefault()
    const message = (document.getElementsByName('message')[0]).value
    state.webSocket.send(message)
}

async function getData () {
    const chatsResult = await fetch(`${host}/chats`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.chats = await chatsResult.json()

    const userResult = await fetch(`${host}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.user = await userResult.json()

    Router.get().to('/messenger')
}

export default function ChatPage () {
    if (!state.user) getData()

    const children = state.currentChat ? [
        VDom.createElement(Sidebar, {chats: state.chats}),
        VDom.createElement(ChatPageWithChat),
        VDom.createElement(Popup)
    ] : [
        VDom.createElement(Sidebar, {chats: state.chats}),
        VDom.createElement(Popup)
    ]

    return VDom.createElement('div', { className: 'site-wrapper main-view'}, children)
}

function Sidebar ({ chats }) {
    return VDom.createElement('aside', {},
        VDom.createElement(SidebarHeader),
        //VDom.createElement(SidebarSearchResults1),
        //VDom.createElement(SidebarSearchResults2),
        VDom.createElement(ChatListArea, { chats }),
    )
}
function SidebarHeader () {
    return VDom.createElement('header', {},
        VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger' }),
        VDom.createElement('button', { className: 'profile', id: 'button_profile', onclick: (e) => {
                    e.preventDefault()
                    Router.get().to('/settings')
                } },
            'Профиль',
            VDom.createElement('img', { src: require('../../images/round-arrow.svg'), alt: '' })),
        VDom.createElement(SidebarSearch),
        VDom.createElement('button', { onclick: create_chat }, 'Добавить чат')
    )
}
function SidebarSearch () {
    return VDom.createElement('div', { className: 'search-line' },
        VDom.createElement('input', { type: 'search', name: 'title' }),
        VDom.createElement('div', { className: 'search-background' },
            VDom.createElement('img', { src: require('../../images/search.svg'), alt: '' }),
            VDom.createElement('span', {}, 'Название нового чата')),
    //  VDom.createElement('img', { className: 'search-icon', src: require('../../images/search.svg'), alt: '' })
    )
}
// function SidebarSearch () {
//     return VDom.createElement('div', { className: 'search-line' },
//         VDom.createElement('input', { type: 'search' }),
//         VDom.createElement('div', { className: 'search-background' },
//             VDom.createElement('img', { src: require('../../images/search.svg'), alt: '' }),
//             VDom.createElement('span', {}, 'Поиск')),
//         VDom.createElement('img', { className: 'search-icon', src: require('../../images/search.svg'), alt: '' })
//     )
// }

// function SidebarSearchResults1 () {
//     return VDom.createElement('div',{ className: 'search-results' })
// }
//
// function SidebarSearchResults2 () {
//     return VDom.createElement('template', { className: 'search-results--template'},
//         VDom.createElement('div', {className: 'search-result--wrapper' },
//             VDom.createElement('div',{ className: 'search-results' },
//                 VDom.createElement('div',{ className: 'search-result--smile' }),
//                 VDom.createElement('div', { className: 'search-result--name' })),
//             VDom.createElement('div', { className: 'search-result--separate-line' }))
//     )
// }

function ChatListArea ({ chats }) {
    return VDom.createElement('div', { className: 'chat-list' },
        chats.map((chat) => VDom.createElement(ChatListItems, { chat }))
    )
}

function ChatListItems ({ chat }) {
    return VDom.createElement('div', { className: 'chat-wrapper', onclick: () => { selectChat(chat) } },
        VDom.createElement('div', { className: 'chat'},
            VDom.createElement('div', { className: 'chat--smile' }),
            VDom.createElement('time', { className: 'chat--time' }),
            VDom.createElement('div', { className: 'chat--author' }, chat.title),
            VDom.createElement('div', { className: 'chat--message' }),
            VDom.createElement('div', { className: 'chat--unread-count' }, chat.unread_count)),
        VDom.createElement('div', { className: 'chat--separate-line' })
    )
}
//############

// function ChatPageWithChat () {
//     return VDom.createElement('main', { className: 'centered' },
//         VDom.createElement('img', { src: require('../../images/chat.svg') }),
//         VDom.createElement('div', { className: 'info' }, 'Выберите чат, чтобы отправить сообщение')
//     )
// }

function ChatPageWithChat () {
    return VDom.createElement('main', { },
        VDom.createElement('div', { className: 'chat-messages--parent' },
            VDom.createElement(ChatHeader),
            VDom.createElement(InputArea),
            VDom.createElement(MessagesBody)
        ),
    )
}

function ChatHeader () {
    return VDom.createElement('div', { className: 'chat-messages--header' },
        VDom.createElement('div', { className: 'smile' }),
        VDom.createElement('div', { className: 'name' }, 'Игорь'),
        VDom.createElement('div', { className: 'chat-menu' },
            VDom.createElement('img', { src: require('../../images/chat-icons/chat-menu.svg'), alt: '' })
        ),
        VDom.createElement('ul', { className: 'submenu' },
            VDom.createElement('li', { 'data-action': 'addUser' },
                VDom.createElement('img', { src: require('../../images/chat-icons/add-user.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Добавить пользователя')),
            VDom.createElement('li', { 'data-action': 'removeUser' },
                VDom.createElement('img', { src: require('../../images/chat-icons/remove-user.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Удалить пользователя')),
            VDom.createElement('li', { 'data-action': 'deleteChat' },
                VDom.createElement('img', { src: require('../../images/chat-icons/delete-chat.svg') }),
                VDom.createElement('span', { className: 'menu-action' }, 'Удалить чат'))
        )
    )
}

function InputArea () {
    return VDom.createElement('form', { className: 'chat-messages--input-area' },
        VDom.createElement('div', { className: 'clip'},
            VDom.createElement('button', { type: 'button' },
                VDom.createElement('img', { src: require('../../images/chat-icons/clip.svg'), alt: '' }))),
        VDom.createElement('input', { type: 'text', placeholder: 'Сообщение', name: 'message' }),
        VDom.createElement('div', { className: 'arrow', onclick: sendMessage },
            VDom.createElement('button', { type: 'submit' },
                VDom.createElement('img', { src: require('../../images/chat-icons/send-arrow.svg'), alt: '' }))),
        VDom.createElement('ul', { className: 'submenu' },
            VDom.createElement('li', { },
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-photo-video.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Фото или видео')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-file.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Файл')),
            VDom.createElement('li', {},
                VDom.createElement('img', { src: require('../../images/chat-icons/attach-location.svg') }),
                VDom.createElement('span', {className: 'menu-action' }, 'Локация'))
        )
    )
}

function MessagesBody () {
    const messages = state.messages.map(m => {
        return m.user_id == state.user.id ? VDom.createElement(MessageMy, { message: m }) : VDom.createElement(MessageYou, { message: m })
    })
    return VDom.createElement('div', { className: 'chat-messages--body' },
        VDom.createElement('div', { className: 'chat-message date-line' }, '17 Мая 2021'),
        ...messages
    )
}

function MessageMy ({ message }) {
    return VDom.createElement('div', { className: 'chat-message text-message is-my-message' },
        VDom.createElement('div', { className: 'chat-message--text' }, message.content),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('div', { className: 'chat-message--status visible' },
                VDom.createElement('img', { src: require('../../images/chat-icons/message-read.svg'), alt: '' })),
            VDom.createElement('time', { className: 'chat-message--time' }, '09:12'))
    )
}

function MessageYou ({ message }) {
    return VDom.createElement('div', { className: 'chat-message text-message' },
        VDom.createElement('div', { className: 'chat-message--text' }, message.content),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('div', { className: 'chat-message--status' },
                VDom.createElement('img', { src: require('../../images/chat-icons/message-read.svg'), alt: '' })),
            VDom.createElement('time', { className: 'chat-message--time' }, '09:34'))
    )
}

function MessageImage () {
    return VDom.createElement('div', { className: 'chat-message image-message' },
        VDom.createElement('div', { className: 'chat-message--image' },
            VDom.createElement('img', {src: require('../../images/chat-image.png'), alt: '' })),
        VDom.createElement('div', { className: 'chat-message--time-and-status' },
            VDom.createElement('time', { className: 'chat-message--time' }, '09:34'))
    )
}

function Popup () {
    return VDom.createElement('div', { className: 'chat-action-popup', style: 'display: none;' },
        VDom.createElement('div', { className: 'window modal' },
            VDom.createElement('form', { 'data-action': 'AddUser'},
                VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: '' }),
                VDom.createElement('h2', {}, 'Добавить пользователя'),
                VDom.createElement('div', { className: 'input-group' },
                    VDom.createElement('label', {}, 'Логин'),
                    VDom.createElement('input', { type: 'text' })),
                VDom.createElement('div', { className: 'error' }),
                VDom.createElement('div', { className: 'modal-bottom' },
                    VDom.createElement('button', {}),
                    VDom.createElement('div', { className: 'cancel' }, 'Отмена'))))
    )
}

//#########################



