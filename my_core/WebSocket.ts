// import Store from "../modules/store";
// import constants from "../constants";

const rootUrl = 'wss://ya-praktikum.tech/ws/chats/:userId/:chatId/:token';

class WebSocketService {
    socket: WebSocket;
    store: Store;

    constructor(userId: number, chatId: number, token: string) {
        const url = this.prepareUrl(userId, chatId, token);
        this.socket = new WebSocket(url);
        this.store = new Store();
        this.init();
    }

    prepareUrl(userId: number, chatId: number, token: string) {
        return rootUrl
            .replace(':userId', userId.toString())
            .replace(':chatId', chatId.toString())
            .replace(':token', token)
    }

    init() {
        this.socket.addEventListener('open',
            () => {
                console.log('Соединение установлено');
            });

        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
                alert('Ошибка соединения')
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            // todo
            // const {} = event.data;
            // this.store.update({}, constants.routes.messages);
        });

        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
            alert('Ошибка соединения');
        });

    }

    send(message: string) {
        const processedMessage = JSON.stringify({
            content: message,
            type: 'message',
        });
        this.socket.send(processedMessage);
    }
}

export default WebSocketService;