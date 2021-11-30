import { VDom } from "../../my_core/VDom";
import { state } from '../../my_core/core'
import { getData, loadAvatar } from "../ProfilePage/ProfilePageApi";


export default function ChangePasswordPage () {

    const avatar = [
        VDom.createElement('input', { type: 'file', onchange: loadAvatar })
    ]

    if (state.user.avatar) avatar.unshift(
        VDom.createElement('img', { src: 'https://ya-praktikum.tech/api/v2/resources' + state.user.avatar })
    )

    return VDom.createElement('div', { className: 'site-wrapper profile-view' },
        VDom.createElement('a', { className: 'back-link' },
            VDom.createElement('div', { className: 'arrow' },
                VDom.createElement('img', { src: require('../../images/back-arrow.svg'), alt: ''}))
        ),
        VDom.createElement('div', { className: 'center_class' },
            VDom.createElement('div', { className: state.user.avatar ? 'big_avatar with_avatar' : 'big_avatar' }, avatar),
            VDom.createElement('div', { className: 'new_name' }, state.user?.first_name),
            VDom.createElement('div',{ className: 'profile_field' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Старый пароль'),
                VDom.createElement('input', { className: 'field_data', name: 'oldPassword', value: state.user?.first_name})),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Новый пароль'),
                VDom.createElement('input', { className: 'field_data', name: 'newPassword', value: state.user?.second_name })),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Повторите новый пароль'),
                VDom.createElement('input', { className: 'field_data', name: 'repeat_newPassword', value: state.user?.display_name })),
            VDom.createElement('button',{ className: 'green_button_exit', onclick : change_password }, 'Сохранить' ),
        )
    )
}