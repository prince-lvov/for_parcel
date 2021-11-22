import { VDom } from "../../my_core/VDom";
export { App_RegisterPage }

//#########################

function App_RegisterPage () {
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
            VDom.createElement('label', { for: 'name' }, 'Имя и Фамилия'),
            VDom.createElement('input', { type: 'text', name: 'name', id: 'name', autofocus: 'true' })
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
            VDom.createElement('button', {}, 'Зарегистрироваться'),
            VDom.createElement('a', { id: 'button_to_login' }, 'Уже есть аккаунт?')
        )
    )
}

//############





