import {state} from "../../my_core/core";
import Router from "../../my_core/router";

const host = 'https://ya-praktikum.tech/api/v2'

export async function change_password (e) {
    e.preventDefault()
    const oldPassword = (document.getElementsByName('oldPassword')[0]).value
    const newPassword = (document.getElementsByName('newPassword')[0]).value
    const repeat_newPassword = (document.getElementsByName('repeat_newPassword')[0]).value


    const change_passwordResult = (await fetch(`${host}/user/password`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            oldPassword,
            newPassword,
        }),
    }))

    if (change_passwordResult.status !== 200) {
        const error = await change_passwordResult.json()
        alert(error.reason)
        return
    }

    alert('Успешно сохранено!')


}

// export async function getData () {
//     const userResult = await fetch(`${host}/auth/user`, {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'include',
//     })
//
//     state.user = await userResult.json()
//
//     Router.get().to('/settings')
// }
//
// export async function loadAvatar (e) {
//     let file = e.target.files[0]
//     let formData = new FormData()
//     formData.append('avatar', file)
//     const response = await fetch(host + '/user/profile/avatar', { method: 'PUT', mode: 'cors', credentials: 'include', body: formData })
//     const result = await response.json()
//     state.user.avatar = result.avatar
//     Router.get().to('/settings')
// }
//
// export async function logout () {
//     const logoutResult = (await fetch(`${host}/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'content-type': 'application/json',
//         },
//     }))
//
//     if (logoutResult.status !== 200) {
//         const error = await logoutResult.json()
//         alert(error.reason)
//         return
//     }
//
//     Router.get().to('/')
// }