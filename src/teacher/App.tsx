
import { atomUserList } from '@src/store/users';
import './App.css'
import type SocketFactory from '@src/util/socket';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '@src/component/button';
import HeadLine from '@src/component/headerline';
import ContentsBox from '@src/component/contentsbox';

export enum PlayStep {
  Script = 'Script',
  Sentence = 'Sentence',
  PlayList = 'Playlist',
  Detail = 'Detail'
}

function App(props: {socket: SocketFactory | null}) {
  const [users, setUsers] = useRecoilState<{id: string}[]>(atomUserList);
  const [step, setStep] = useState<PlayStep>(PlayStep.Script);
  React.useEffect(() => {
    props.socket?.addListener({type: 'toTeacher', subtype: 'attendence', callback: (ev: MessageEvent<string>) => {
      const data = JSON.parse(ev.data + '') as unknown as {msg: {id: string}};
      if(users.filter(u => u.id === data.msg.id).length === 0) setUsers([...users,{id: data.msg.id}]);
    }});
  },[props.socket]);
  React.useEffect

  const slots:{[key: string]: React.ReactElement} = {};
  Object.entries(PlayStep).map((key) => {
    let item: React.ReactElement = <></>;
    switch (key[0]) {
      case "Script":
        item = <>{"문단보기"}</>;
        break;
      case "Sentence":
        item = <>{"문단보기"}</>;
        break;
      case "Playlist":
        item = <>{"문단보기"}</>;
        break;
      case "Detail":
        item = <>{"문단보기"}</>;
        break;
    }
    slots[key[0]] = item;
  });
  /*
  
  예시로, 문장들을 넣은 다음에,
  문장들 선택후 언스크램블 활동 이걸로 만들자
  */
  return (
    <main>
      <HeadLine className='navi' children={<Button size="xs" slots={slots} slot_key={step} />}  title='문장 맞춰보기' />
      <ContentsBox className='script' grid={'1fr'}> {/*'1fr 1fr'*/}
        <div>
          <ul>
            <li>문장1</li>
          </ul>
        </div>
      </ContentsBox>
    </main>
  )
}

export default App
