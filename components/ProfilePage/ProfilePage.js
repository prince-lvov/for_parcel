import { VDom } from "../../my_core/VDom";
import Router, {RouterLink} from "../../my_core/router";
import { state } from '../../my_core/core'

const host = 'https://ya-praktikum.tech/api/v2'

async function save (e) {
    e.preventDefault()
    const first_name = (document.getElementsByName('first_name')[0]).value
    const second_name = (document.getElementsByName('second_name')[0]).value
    const login = (document.getElementsByName('login')[0]).value
    const email = (document.getElementsByName('email')[0]).value
    const phone = (document.getElementsByName('phone')[0]).value
    const display_name = (document.getElementsByName('display_name')[0]).value

    const saveResult = (await fetch(`${host}/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone
        }),
    }))

    if (saveResult.status !== 200) {
        const error = await saveResult.json()
        alert(error.reason)
        return
    }

    alert('Успешно сохранено!')

    state.user.first_name = first_name
    state.user.seconds_name = second_name
    state.user.display_name = display_name
    state.user.login = login
    state.user.email = email
    state.user.phone = phone
}

async function getData () {
    const userResult = await fetch(`${host}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })

    state.user = await userResult.json()

    Router.get().to('/settings')
}

export default function ProfilePage () {
    if (!state.user) getData()

    return VDom.createElement('div', { className: 'site-wrapper profile-view' },
        VDom.createElement('a', { className: 'back-link' },
            VDom.createElement('div', { className: 'arrow' },
                VDom.createElement('img', { src: require('../../images/back-arrow.svg'), alt: ''}))
        ),
        VDom.createElement('div', { className: 'center_class' },
            VDom.createElement('div', { className: 'big_avatar'}),
            VDom.createElement('div', { className: 'new_name' }, state.user?.first_name),
            VDom.createElement('div',{ className: 'profile_field' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Имя'),
                VDom.createElement('input', { className: 'field_data', name: 'first_name', value: state.user?.first_name})),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Фамилия'),
                VDom.createElement('input', { className: 'field_data', name: 'second_name', value: state.user?.second_name })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Отображаемое имя'),
                VDom.createElement('input', { className: 'field_data', name: 'display_name', value: state.user?.display_name })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Логин'),
                VDom.createElement('input', { className: 'field_data', name: 'login', value: state.user?.login })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Телефон'),
                VDom.createElement('input', { className: 'field_data', name: 'phone', value: state.user?.phone })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Почта'),
                VDom.createElement('input', { className: 'field_data', name: 'email', value: state.user?.email })),
            VDom.createElement('div',{ className: 'profile_field change_data_flex' },
                VDom.createElement('label', { className: 'change_data_field', onclick: save }, 'Изменить данные')),
            VDom.createElement('div',{ className: 'profile_field change_data_flex2' },
                VDom.createElement('label', { className: 'change_data_field' }, 'Изменить пароль')),
            VDom.createElement('button', { className: 'green_button_exit' }, 'Выйти')
        )
    )
}