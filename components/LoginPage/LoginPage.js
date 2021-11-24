import { VDom } from "../../my_core/VDom"
import Router, { RouterLink } from "../../my_core/router"
import { state } from "../../my_core/core"

const host = 'https://ya-praktikum.tech/api/v2'

async function login (e) {
    e.preventDefault()
    const login = (document.getElementsByName('login')[0]).value
    const password = (document.getElementsByName('password')[0]).value
    
    const loginResult = (await fetch(`${host}/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    }))

    if (loginResult.status !== 200) {
        const error = await loginResult.json()
        alert(error.reason)
        return
    }

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

export default function LoginPage () {
    return VDom.createElement('div', { className: 'site-wrapper hi-contrast-bg'},
        VDom.createElement('div', { className: 'modal' },
            VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger'}),
            VDom.createElement('h2', {}, 'Авторизация'),
            VDom.createElement(LoginForm)
        )
    )
}

function LoginForm () {
    return VDom.createElement('form', { className: 'login' },
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'login' }, 'Логин'),
            VDom.createElement('input', { type: 'text', name: 'login', id: 'login', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'password' }, 'Пароль'),
            VDom.createElement('input', { type: 'password', name: 'password', id: 'password'})
        ),
        VDom.createElement('div', { className: 'error' }),
        VDom.createElement('div', { className: 'modal-bottom'},
            VDom.createElement('button', { onclick: login }, 'Войти'),
            VDom.createElement(RouterLink, { text: 'Зарегистрироваться', url: '/sign-up' })
        )
    )
}