import { state } from '../../my_core/core'
import Router from '../../my_core/router'
import WebSocket from '../../my_core/WebSocket'


const host = 'https://ya-praktikum.tech/api/v2'

export async function create_chat (e) {
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

export async function selectChat (chat) {
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

export async function sendMessage (e) {
    e.preventDefault()
    const message = (document.getElementsByName('message')[0]).value
    state.webSocket.send(message)
}

export async function getData () {
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