import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import mainCss from './index.css?inline';
import SocketFactory from '../util/socket.ts';
import { RecoilRoot } from 'recoil';


class WebComponentMain extends HTMLElement {
  private _container: HTMLDivElement;
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
    this._container = document.createElement('div');
    this._container.id = "main";
    const style = document.createElement('style');
    style.innerHTML = mainCss;
    root.appendChild(this._container);
    root.appendChild(style);
  }
  connectedCallback() {
    const uid = this.getAttribute('uid');
    if(!uid) return;
    this.$socket = new SocketFactory({name: uid});
    ReactDOM.createRoot(this._container).render(
      <React.StrictMode>
        <RecoilRoot>
          <App socket={this.$socket} />
        </RecoilRoot>
      </React.StrictMode>,
    );
    this.$socket.sendPad({type: 'toPad', msg: {text: 'somthing'}});
  }
}
window.customElements.define('main-teacher-component', WebComponentMain);