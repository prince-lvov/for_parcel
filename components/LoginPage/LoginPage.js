import { VDom } from "../../my_core/VDom";
export { App_LoginPage }
import { RouterLink } from "../../my_core/router";

//#########################

function App_LoginPage () {
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
            VDom.createElement(RouterLink, { text: 'Войти', url: '/messenger' }),
            VDom.createElement(RouterLink, { text: 'Зарегистрироваться', url: '/sign-up' })
        )
    )
}

//############





