import { VDom } from "../../my_core/VDom";
// import Router, {RouterLink} from "../../my_core/router";
// import { register } from "../../my_core/core";
//
// export { App_RegisterPage }

//#########################

export function App_ProfilePage () {
    return VDom.createElement('div', { className: 'site-wrapper profile-view' },
        VDom.createElement('a', { className: 'back-link' },
            VDom.createElement('div', { className: 'arrow' },
                VDom.createElement('img', { src: require('../../images/back-arrow.svg'), alt: ''}))
        ),
        VDom.createElement('div', { className: 'center_class' },
            VDom.createElement('div', { className: 'big_avatar'}),
            VDom.createElement('div', { className: 'new_name' }, 'Иван'),
            VDom.createElement('div',{ className: 'profile_field' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Имя'),
                VDom.createElement('input', { className: 'field_data' }, 'Иван')),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Фамилия'),
                VDom.createElement('input', { className: 'field_data' }, 'Кузнецов')),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Логин'),
                VDom.createElement('input', { className: 'field_data' }, 'ivanushka')),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Телефон'),
                VDom.createElement('input', { className: 'field_data' }, '+7 (888) 00 00 000')),
            VDom.createElement('div',{ className: 'profile_field top_margin' },
                VDom.createElement('label', { className: 'field_assignment' }, 'Почта'),
                VDom.createElement('input', { className: 'field_data' }, 'ivanyshka@yandex.ru')),
            VDom.createElement('div',{ className: 'profile_field change_data_flex' },
                VDom.createElement('label', { className: 'change_data_field' }, 'Изменить данные')),
            VDom.createElement('div',{ className: 'profile_field change_data_flex2' },
                VDom.createElement('label', { className: 'change_data_field' }, 'Изменить пароль')),
            VDom.createElement('button', { className: 'green_button_exit' }, 'Выйти')
        )
    )
}
//############





