
import { atomUserList } from '@src/store/users';
import './App.css'
import type SocketFactory from '@src/util/socket';
import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

function App(props: {socket: SocketFactory | null}) {
  const [users, setUsers] = useRecoilState<{id: string}[]>(atomUserList);
 
  React.useEffect(() => {
    props.socket?.addListener({type: 'toTeacher', subtype: 'test', callback: (ev: MessageEvent<string>) => {
        const data = JSON.parse(ev.data + '') as unknown as {msg: {text: string}};
    }});
    props.socket?.addListener({type: 'toTeacher', subtype: 'attendence', callback: (ev: MessageEvent<string>) => {
      const data = JSON.parse(ev.data + '') as unknown as {msg: {id: string}};
      if(users.filter(u => u.id === data.msg.id).length === 0) setUsers([...users,{id: data.msg.id}]);
    }});
  },[props.socket]);

  return (
      <div>
        <ul>
          {users.map((user) => {
            return <li>{user.id}</li>
          })}
        </ul>
    </div>
  )
}

export default App
