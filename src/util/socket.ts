class SocketFactory {
    private is_dev: boolean = true;
    private channal!: BroadcastChannel;
    private listeners: {type: string, subtype: string, callback: (ev: MessageEvent<string>) => void}[] = [];
    constructor(props: {name: string}) {
        //super();
        this.is_dev = import.meta.env.DEV;
        if(this.is_dev) {
            this.channal = new BroadcastChannel('2view-devtest-'+ props.name);
            this.channal.onmessage = (event) => {
                const data = JSON.parse(event.data + '');
                this.listeners.map((ls) => {
                    if(data.type === ls.type && data.msg.subtype === ls.subtype) {
                        ls.callback(event);
                    }
                });
            }
        }
    }
    addListener(ls: {type: string, subtype: string, callback: (ev: MessageEvent<string>) => void}) {
        this.listeners.push(ls);
    }
    sendTeacher(msg: {type: 'toTeacher', msg?: object}) {
        if(typeof msg !== 'object') {
            throw Error('msg는 object여야합니다. 전달할때 JSON.stringfy를 따로 해 줍니다.');
            return;
        }
        if(this.is_dev) {
            this.channal.postMessage(JSON.stringify(msg));
        }
    }
    sendPad(msg: {type: 'toPad', msg?: object}) {
        if(typeof msg !== 'object') {
            throw Error('msg는 object여야합니다. 전달할때 JSON.stringfy를 따로 해 줍니다.');
            return;
        }
        if(this.is_dev) {
            this.channal.postMessage(JSON.stringify(msg));
        }
    }
}

export default SocketFactory;