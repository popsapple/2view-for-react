import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import mainCss from './index.css?inline';
import SocketFactory from '../util/socket.ts';
import { v4 as uuidv4 } from "uuid";
import { RecoilRoot } from 'recoil';

const userid = uuidv4();

class WebComponentMain extends HTMLElement {
  private _container: HTMLDivElement;
  public _socket: SocketFactory | null = null;
  private _userid: string = '';
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
    if(import.meta.env.DEV) this._userid = userid;
    this._container = document.createElement('div');
    this._container.id = "main";
    const style = document.createElement('style');
    style.innerHTML = mainCss;
    root.appendChild(this._container);
    root.appendChild(style);
  }
  connectedCallback() {
    ReactDOM.createRoot(this._container).render(
      <React.StrictMode>
        <RecoilRoot>
          <App socket={this.$socket} />
        </RecoilRoot>
      </React.StrictMode>,
    );
    const uid = this.getAttribute('uid');
    if(!uid) return;
    this.$socket = new SocketFactory({name: uid});
    this.$socket.sendTeacher({type:'toTeacher', msg: {subtype: 'attendence', id: this._userid}});
    alert('???? '+this._userid)
  }
}
window.customElements.define('main-student-component', WebComponentMain);