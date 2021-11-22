import { VDom } from "../../my_core/VDom";
export { App }

//#########################

function App ({state}) {
    return VDom.createElement('div', { className: 'site-wrapper main-view'},
        VDom.createElement(Sidebar, {chats: state.chats}),
        VDom.createElement(ChatPageWithChat)
    )
}

function Sidebar ({ chats }) {
    return VDom.createElement('aside', {},
        VDom.createElement(SidebarHeader),
        //VDom.createElement(SidebarSearchResults1),
        //VDom.createElement(SidebarSearchResults2),
        VDom.createElement(ChatListArea, { chats }),
        //VDom.createElement(ChatListItems)
    )
}

function SidebarHeader () {
    return VDom.createElement('header', {},
        VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger' }),
        VDom.createElement('a', { className: 'profile', id: 'button_profile' },
            'Профиль',
            VDom.createElement('img', { src: require('../../images/round-arrow.svg'), alt: '' })),
        VDom.createElement(SidebarSearch)
    )
}

function SidebarSearch () {
    return VDom.createElement('div', { className: 'search-line' },
        VDom.createElement('input', { type: 'search' }),
        VDom.createElement('div', { className: 'search-background' },
            VDom.createElement('img', { src: require('../../images/search.svg'), alt: '' }),
            VDom.createElement('span', {}, 'Поиск')),
        VDom.createElement('img', { className: 'search-icon', src: require('../../images/search.svg'), alt: '' })
    )
}

function SidebarSearchResults1 () {
    return VDom.createElement('div',{ className: 'search-results' })
}

function SidebarSearchResults2 () {
    return VDom.createElement('template', { className: 'search-results--template'},
        VDom.createElement('div', {className: 'search-result--wrapper' },
            VDom.createElement('div',{ className: 'search-results' },
                VDom.createElement('div',{ className: 'search-result--smile' }),
                VDom.createElement('div', { className: 'search-result--name' })),
            VDom.createElement('div', { className: 'search-result--separate-line' }))
    )
}

function ChatListArea ({ chats }) {
    return VDom.createElement('div', { className: 'chat-list' },
        chats.map((chat) => VDom.createElement(ChatListItems, { chat }))
    )
}

function ChatListItems ({ chat }) {
    return VDom.createElement('div', { className: 'chat-wrapper' },
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

function ChatPageWithChat () {
    return VDom.createElement('main', { className: 'centered' },
        VDom.createElement('img', { src: require('../../images/chat.svg') }),
        VDom.createElement('div', { className: 'info' }, 'Выберите чат, чтобы отправить сообщение')
        // VDom.createElement(ChatHeader),
        // VDom.createElement(MessagesBody),
        // VDom.createElement(InputArea),
        // VDom.createElement(MessagesArea),
        // VDom.createElement(ChatMessage),
        // VDom.createElement(Popup)
    )
}

// function ChatHeader () {
//     return VDom.createElement('div', { className: 'chat-messages--header' },
//         VDom.createElement('div', { className: 'smile' }),
//         VDom.createElement('div', { className: 'name' }, 'Игорь'),
//         VDom.createElement('div', { className: 'chat-menu' },
//             VDom.createElement('img', { src: require('../../images/chat-icons/chat-menu.svg'), alt: '' })
//         ),
//         VDom.createElement('ul', { className: 'submenu' },
//             VDom.createElement('li', { 'data-action': 'addUser' },
//                 VDom.createElement('img', { src: require('../../images/chat-icons/add-user.svg') }),
//                 VDom.createElement('span', { className: 'menu-action' }, 'Добавить пользователя')),
//             VDom.createElement('li', { 'data-action': 'removeUser' },
//                 VDom.createElement('img', { src: require('../../images/chat-icons/remove-user.svg') }),
//                 VDom.createElement('span', { className: 'menu-action' }, 'Удалить пользователя')),
//             VDom.createElement('li', { 'data-action': 'deleteChat' },
//                 VDom.createElement('img', { src: require('../../images/chat-icons/delete-chat.svg') }),
//                 VDom.createElement('span', { className: 'menu-action' }, 'Удалить чат'))
//         )
//     )
// }
//
// function MessagesBody () {
//     return VDom.createElement('div', { className: 'chat-messages--body' },
//         VDom.createElement('div', { className: 'chat-message.date-line' }, '17 Мая 2021')
//     )
// }
//
// function InputArea () {
//     return VDom.createElement('form', { className: 'chat-messages--input-area' },
//         VDom.createElement('div', { className: 'clip'},
//             VDom.createElement('button', { type: 'button' },
//                 VDom.createElement('img', { src: require('../../images/chat-icons/clip.svg'), alt: '' }))),
//         VDom.createElement('input', { type: 'text', placeholder: 'Сообщение', name: 'NewMessage' }),
//         VDom.createElement('div', { className: 'arrow' },
//             VDom.createElement('button', { type: 'submit' },
//                 VDom.createElement('img', { src: require('../../images/chat-icons/send-arrow.svg'), alt: '' }))),
//         VDom.createElement('ul', { className: 'submenu' },
//             VDom.createElement('li', {},
//                 VDom.createElement('img', { src: require('../../images/chat-icons/attach-photo-video.svg') }),
//                 VDom.createElement('span', {className: 'menu-action' }, 'Фото или видео')),
//             VDom.createElement('li', {},
//                 VDom.createElement('img', { src: require('../../images/chat-icons/attach-file.svg') }),
//                 VDom.createElement('span', {className: 'menu-action' }, 'Файл')),
//             VDom.createElement('li', {},
//                 VDom.createElement('img', { src: require('../../images/chat-icons/attach-location.svg') }),
//                 VDom.createElement('span', {className: 'menu-action' }, 'Локация'))
//         )
//     )
// }
//
// function MessagesArea () {
//     return VDom.createElement('div', { className: 'chat-messages--parent' })
// }
//
// function ChatMessage () {
//     return VDom.createElement('div', {},
//         VDom.createElement('div', { className: 'chat-message.image-message' },
//             VDom.createElement('div', { className: 'chat-message--image' },
//                 VDom.createElement('img', {src: '', alt: '' })),
//             VDom.createElement('div', { className: 'chat-message--time-and-status' },
//                 VDom.createElement('time', { className: 'chat-message--time' }))),
//         VDom.createElement('div', { className: 'chat-message.text-message' },
//             VDom.createElement('div', { className: 'chat-message--text' }),
//             VDom.createElement('div', { className: 'chat-message--time-and-status' },
//                 VDom.createElement('div', { className: 'chat-message--status' },
//                     VDom.createElement('img', { src: require('../../images/chat-icons/message-read.svg'), alt: '' })),
//                 VDom.createElement('time', { className: 'chat-message--time'})))
//     )
// }
//
// function Popup () {
//     return VDom.createElement('div', { className: 'chat-action-popup' },
//         VDom.createElement('div', { className: 'window modal' },
//             VDom.createElement('form', {},
//                 VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: '' }),
//                 VDom.createElement('h2', {}),
//                 VDom.createElement('div', { className: 'input-group' },
//                     VDom.createElement('label', {}, 'Логин'),
//                     VDom.createElement('input', { type: 'text' })),
//                 VDom.createElement('div', { className: 'error' }),
//                 VDom.createElement('div', { className: 'modal-bottom' },
//                     VDom.createElement('button', {}),
//                     VDom.createElement('div', { className: 'cancel' }, 'Отмена'))))
//     )
// }

//#########################



