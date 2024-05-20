import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import mainCss from './app.scss?inline';
import containerCss from './index.css?inline';
import './index.css';
import SocketFactory from '../util/socket.ts';
import { v4 as uuidv4 } from 'uuid';
import { RecoilRoot } from 'recoil';
import { UserContext } from '@src/component/CommonContext';

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

    // 웹 컴포넌트 바깥.
    const out = document.createElement('style');
    out.innerHTML = containerCss;
    document.head.appendChild(out);
  }
  connectedCallback() {
    ReactDOM.createRoot(this._container).render(
      <React.StrictMode>
        <RecoilRoot>
          <UserContext.Provider value={this._container}>
            <App socket={this.$socket} />
          </UserContext.Provider>
        </RecoilRoot>
      </React.StrictMode>,
    );
    const uid = this.getAttribute('uid');
    if(!uid) return;
    this.$socket = new SocketFactory({name: uid});
    this.$socket.sendTeacher({type:'toTeacher', msg: {subtype: 'attendence', id: this._userid}});
  }
}
setTimeout(() => {
  if(!window.customElements.get('main-student-component')) window.customElements.define('main-student-component', WebComponentMain);
},0)