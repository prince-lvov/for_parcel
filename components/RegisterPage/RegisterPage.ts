import { VDom } from "../../my_core/VDom";
import Router, {RouterLink} from "../../my_core/router";

const host = 'https://ya-praktikum.tech/api/v2'

async function register (e) {
    e.preventDefault()
    const first_nameInput = (document.getElementsByName('first_name')[0]) as HTMLInputElement
    const first_name = first_nameInput.value
    const second_nameInput = (document.getElementsByName('second_name')[0]) as HTMLInputElement
    const second_name = second_nameInput.value
    const loginInput = (document.getElementsByName('login')[0]) as HTMLInputElement
    const login = loginInput.value
    const emailInput = (document.getElementsByName('email')[0]) as HTMLInputElement
    const email = emailInput.value
    const phoneInput = (document.getElementsByName('phone')[0]) as HTMLInputElement
    const phone = phoneInput.value
    const password1Input = (document.getElementsByName('password1')[0]) as HTMLInputElement
    const password1 = password1Input.value
    const password2Input = (document.getElementsByName('password2')[0])as HTMLInputElement
    const password2 = password2Input.value

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

    alert('Регистрация успешна!')
    Router.get().to('/')
}

export default function RegisterPage () {
    return VDom.createElement('div', { className: 'site-wrapper hi-contrast-bg'},
        VDom.createElement('div', { className: 'modal' },
            VDom.createElement('img', { src: require('../../images/main-logo.svg'), alt: 'Messenger'}),
            VDom.createElement('h2', {}, 'Регистрация'),
            VDom.createElement(RegisterForm, {})
        )
    )
}

export function RegisterForm () {
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