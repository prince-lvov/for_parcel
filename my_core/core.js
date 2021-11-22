import { VDom } from "./VDom";
import { App } from "../components/ChatPageWithChat/ChatPageWithChat";
import { App_LoginPage } from "../components/LoginPage/LoginPage";
import { App_RegisterPage } from "../components/RegisterPage/RegisterPage";

let state = {
    timer: new Date(),
    chats: []
}
const host = 'https://ya-praktikum.tech/api/v2'

// fetch(`${host}/auth/signup`, {
//     method: 'POST',
//     credentials: 'include',
//     mode: 'cors',
//     headers: {
//         'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//         first_name: 'Марина',
//         second_name: 'Липина',
//         login: 'malvina',
//         email: 'malvi058@yandex.ru',
//         phone: '89270901106',
//         password: 'rnbrnbc4',
//     }),
// })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data)
//         return data
//     })
//     .then(data => {
//         fetch(`${host}/auth/user`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//         })
//         .then(r => r.json())
//         .then(data => {
//             console.log('user', data)
//         })
//     })


function signin () {
    return fetch(`${host}/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            login: 'malvina',
            password: 'rnbrnbc4',
        }),
    })
        .then(r => r.text())
        .then(text => {
            console.log(text)
            console.log('Authorised')
        })
}

function get_user_info () {
    return fetch(`${host}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(r => r.json())
        .then(data => {
            console.log('user', data)
        })
}

function get_chats () {
    return fetch(`${host}/chats`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
        .then(r => r.json())
        .then(text => {
            state = {
                ...state,
                chats: text
            }
            console.log(text)
            console.log(state)
            console.log('Get chats and refresh state')
            renderView(state)
        })
}

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



function renderView (state) {
    render(
        VDom.createElement(App_RegisterPage, {state}),
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


renderView(state)

//#########################

//signin().then(get_chats).then(logout)



//#########################