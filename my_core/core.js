import { VDom } from "./VDom";


export const state = {
    timer: new Date(),
    chats: []
}

const host = 'https://ya-praktikum.tech/api/v2'

//Не работает
// function handleErrors(response) {
//     if (response.ok) {window.alert('Вы зарегистрированы')}
//     if (!response.ok) {
//         window.alert(response.status)
//         throw new Error(response.status)
//     }
//     return response;
// }

// export function register () {
//     const first_name = (document.getElementsByName('first_name')[0]).value
//     const second_name = (document.getElementsByName('second_name')[0]).value
//     const login = (document.getElementsByName('login')[0]).value
//     const email = (document.getElementsByName('email')[0]).value
//     const phone = (document.getElementsByName('phone')[0]).value
//     const password1 = (document.getElementsByName('password1')[0]).value
//     const password2 = (document.getElementsByName('password2')[0]).value
//
//     fetch(`${host}/auth/signup`, {
//         method: 'POST',
//         credentials: 'include',
//         mode: 'cors',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify({
//             first_name,
//             second_name,
//             login,
//             email,
//             phone,
//             password: password1
//             // first_name,
//             // second_name: 'Липина',
//             // login: 'malvina5',
//             // email: 'malvi0585@yandex.ru',
//             // phone: '89270901106',
//             // password: 'rnbrnbc4',
//         }),
//     })
//         .then(handleErrors)
//         .then(response => response.text())
//         .then(data => {
//             console.log(data)
//             //    return data
//         }).catch(error => console.log(error))
// }

// function signin () {
//     const login = (document.getElementsByName('login')[0]).value
//     const password = (document.getElementsByName('password')[0]).value
//     return fetch(`${host}/auth/signin`, {
//         method: 'POST',
//         credentials: 'include',
//         mode: 'cors',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify({
//             login,
//             password
//             // login: 'malvina',
//             // password: 'rnbrnbc4',
//         }),
//     })
//         .then(r => r.text())
//         .then(text => {
//             console.log(text)
//         })
// }
// export function create_chat () {
//     const title = (document.getElementsByName('title')[0]).value
//     return fetch(`${host}/chats`, {
//         method: 'POST',
//         credentials: 'include',
//         mode: 'cors',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify({
//             title
//         }),
//     })
//         .then(handleErrors)
//         .then(response => response.text())
//         .then(data => {
//             console.log(data)
//             //    return data
//         }).catch(error => console.log(error))
// }

// function get_user_info () {
//     return fetch(`${host}/auth/user`, {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'include',
//     })
//         .then(r => r.json())
//         .then(data => {
//             console.log('user', data)
//         })
// }
// function ok () {
//     signin().then(get_chats)
// }

// export function get_chats () {
//     return fetch(`${host}/chats`, {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'include',
//     })
//         .then(r => r.json())
//         .then(text => {
//             state = {
//                 ...state,
//                 chats: text
//             }
//             console.log(text)
//             renderView(state, App)
//         })
// }

function logout () {
    return fetch(`${host}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(r => r.text())
        .then(text => {
            console.log(text)
            console.log('Logout')
        })
}



export function renderView (state, page) {
    render(
        VDom.createElement(page, {state}),
        document.getElementById('root')
    )
}

function render (virtualDom, realDomRoot) {
    const evaluatedVirtualDom = evaluate(virtualDom)

    const virtualDomRoot = {
        type: realDomRoot.tagName.toLowerCase(),
        props: {
            id: realDomRoot.id,
            children: [
                evaluatedVirtualDom
            ]
        },
    }

    sync(virtualDomRoot, realDomRoot)
}

function evaluate (virtualNode) {
    if (typeof virtualNode !== 'object') {
        return virtualNode
    }

    if (typeof virtualNode.type === 'function') {
        return evaluate((virtualNode.type)(virtualNode.props))
    }

    const props = virtualNode.props || {}

    return {
        ...virtualNode,
        props: {
            ...props,
            children: Array.isArray(props.children) ? props.children.map(evaluate) : [evaluate(props.children)]
        }
    }
}

function sync (virtualNode, realNode) {
    // Sync element
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'children' && name === 'key') {
                return
            }
            if (realNode[name] !== value) {
                realNode[name] = value
            }
        })
    }
    if (virtualNode.key) {
        realNode.dataset.key = virtualNode.key
    }
    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = virtualNode
    }

    // Sync child nodes
    const virtualChildren = virtualNode.props ? virtualNode.props.children || [] : []
    const realChildren = realNode.childNodes

    for (let i = 0; i < virtualChildren.length || i < realChildren.length; i++) {
        const virtual = virtualChildren[i]
        const real = realChildren[i]

        // Remove
        if (virtual === undefined && real !== undefined) {
            realNode.remove(real)
        }

        // Update
        if (virtual !== undefined && real !== undefined && (virtual.type || '') === (real.TagName || '').toLowerCase()) {
            sync(virtual, real)
        }

        // Replace
        if (virtual !== undefined && real !== undefined && (virtual.type || '') !== (real.TagName || '').toLowerCase()) {
            const newReal = createRealNodeByVirtual(virtual)
            sync(virtual, newReal)
            realNode.replaceChild(newReal, real)
        }

        // Add
        if (virtual !== undefined && real === undefined) {
            const newReal = createRealNodeByVirtual(virtual)
            sync(virtual, newReal)
            realNode.appendChild(newReal)
        }
    }
}

function  createRealNodeByVirtual (virtual) {
    if (typeof virtual !== 'object') {
        return document.createTextNode('')
    }
    return document.createElement(virtual.type)
}



//#########################

//signin()



