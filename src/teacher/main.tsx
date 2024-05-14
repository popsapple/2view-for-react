import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import mainCss from './index.css?inline';
import SocketFactory from '../util/socket.ts';
import { RecoilRoot } from 'recoil';

let container: HTMLDivElement;
class WebComponentMain extends HTMLElement {
  private _socket: SocketFactory | null = null;
  public $user_list: {id: string}[] = [];
  get $socket(): SocketFactory | null {
    return this._socket;
  }
  set $socket(s: SocketFactory) {
    if(this._socket !== null) {
      new Error('소켓 재정의 불가');
    }else {
      this._socket = s;
    }
  }
  constructor() {
    super();
    const root = this.attachShadow({mode: 'open'});
    container = document.createElement('div');
    container.id = "main";
    const style = document.createElement('style');
    style.innerHTML = mainCss;
    root.appendChild(container);
    root.appendChild(style);
  }
  connectedCallback() {
    alert('?')
    const uid = this.getAttribute('uid');
    if(!uid) return;
    this.$socket = new SocketFactory({name: uid});
    ReactDOM.createRoot(container as HTMLElement).render(
      <React.StrictMode>
        <RecoilRoot>
          <App socket={this.$socket} container={container} />
        </RecoilRoot>
      </React.StrictMode>,
    );
    this.$socket.sendPad({type: 'toPad', msg: {text: 'somthing'}});
  }
}
setTimeout(() => {
  if(!window.customElements.get('main-teacher-component')) window.customElements.define('main-teacher-component', WebComponentMain);
},0)