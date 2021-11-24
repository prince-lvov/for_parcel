import { VDom } from "../../my_core/VDom";
import Router, {RouterLink} from "../../my_core/router";
import { register } from "../../my_core/core";

const host = 'https://ya-praktikum.tech/api/v2'

async function register (e) {
    e.preventDefault()
    const first_name = (document.getElementsByName('first_name')[0]).value
    const second_name = (document.getElementsByName('second_name')[0]).value
    const login = (document.getElementsByName('login')[0]).value
    const email = (document.getElementsByName('email')[0]).value
    const phone = (document.getElementsByName('phone')[0]).value
    const password1 = (document.getElementsByName('password1')[0]).value
    const password2 = (document.getElementsByName('password2')[0]).value

    const registerResult = (await fetch(`${host}/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            second_name,
            login,
            email,
            phone,
            password: password1
        }),
    }))

    if (registerResult.status !== 200) {
        const error = await registerResult.json()
        alert(error.reason)
        return
    }
}

export default function RegisterPage () {
    return VDom.createElement('div', { className: 'site-wrapper hi-contrast-bg'},
        VDom.createElement('div', { className: 'modal' },
            VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger'}),
            VDom.createElement('h2', {}, 'Регистрация'),
            VDom.createElement(RegisterForm)
        )
    )
}

function RegisterForm () {
    return VDom.createElement('form', { className: 'register' },
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'name' }, 'Имя'),
            VDom.createElement('input', { type: 'text', name: 'first_name', id: 'first_name', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'name' }, 'Фамилия'),
            VDom.createElement('input', { type: 'text', name: 'second_name', id: 'second_name', autofocus: 'true' })
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'login' }, 'Логин'),
            VDom.createElement('input', { type: 'text', name: 'login', id: 'login'})
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'email' }, 'E-mail'),
            VDom.createElement('input', { type: 'text', name: 'email', id: 'email'})
        ),
        VDom.createElement('div', { className: 'input-group' },
            VDom.createElement('label', { for: 'phone' }, 'Телефон'),
            VDom.createElement('input', { type: 'tel', name: 'phone', id: 'phone'})
        ),
        VDom.createElement('div', { className: 'two-columns' },
            VDom.createElement('div', { className: 'input-group' },
                VDom.createElement('label', { for: 'password1' }, 'Пароль'),
                VDom.createElement('input', { type: 'password', name: 'password1', id: 'password1'})
            ),
            VDom.createElement('div', { className: 'input-group' },
                VDom.createElement('label', { for: 'password2' }, 'Пароль'),
                VDom.createElement('input', { type: 'password', name: 'password2', id: 'password2'})
            ),
            VDom.createElement('div', { className: 'error' })
        ),
        VDom.createElement('div', { className: 'modal-bottom'},
            VDom.createElement('button', { onclick: register }, 'Зарегистрироваться'),
            VDom.createElement(RouterLink, { text: 'Уже есть аккаунт?', url: '/' })
        )
    )
}