import '../../mockup/engtemp';
import './app.scss'
import { atomUserList } from '@src/store/users';
import type SocketFactory from '@src/util/socket';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Button from '@src/component/button';
import HeadLine from '@src/component/headerline';
import ContentsBox from '@src/component/contentsbox';
import { SentenceList } from '@src/common/SentenceList';
import { UserContext } from '@src/component/CommonContext';

export enum PlayStep {
  Script = 'Script',
  Sentence = 'Sentence',
  PlayList = 'Playlist',
  Detail = 'Detail'
}


function App(props: {socket: SocketFactory | null, container: HTMLDivElement}) {
  const [users, setUsers] = useRecoilState<{id: string}[]>(atomUserList);
  const [step, setStep] = useState<PlayStep>(PlayStep.Script);

  React.useEffect(() => {
    props.socket?.addListener({type: 'toTeacher', subtype: 'attendence', callback: (ev: MessageEvent<string>) => {
      const data = JSON.parse(ev.data + '') as unknown as {msg: {id: string}};
      if(users.filter(u => u.id === data.msg.id).length === 0) setUsers([...users,{id: data.msg.id}]);
    }});
  },[props.socket]);

  const slots:{[key: string]: React.ReactElement} = {};
  Object.entries(PlayStep).map((key) => {
    let item: React.ReactElement = <></>;
    switch (key[0]) {
      case "Script":
        item = <>{"상세보기"}</>;
        break;
      case "Sentence":
        item = <>{"제출내역보기"}</>;
        break;
      case "Playlist":
        item = <>{"제출내역상세보기"}</>;
        break;
      case "Detail":
        item = <>{"제출내역보기"}</>;
        break;
    }
    slots[key[0]] = item;
  });

  /*
  
  예시로, 문장들을 넣은 다음에,
  문장들 선택후 언스크램블 활동 이걸로 만들자
  */
  return (
    <UserContext.Provider value={props.container}>
      <main className="w-[96%] m-auto v-line bg-white rounded-md shadow-md p-[1rem]">
        <HeadLine
          className="navi w-[100%] text-left text-lg"
          children={
            <Button 
              size="xs" 
              slots={slots} 
              slot_key={step} 
              click={() => {
                switch (step) {
                  case PlayStep.Script:
                    setStep(PlayStep.Sentence);
                    break;
                  case PlayStep.Sentence:
                    setStep(PlayStep.PlayList);
                    break;
                  case PlayStep.PlayList:
                    setStep(PlayStep.Detail);
                    break;
                  case PlayStep.Detail:
                    setStep(PlayStep.PlayList);
                    break;
                }
              }} 
              classNm="bg-indigo-500 text-white text-xs rounded-md px-[0.5rem] py-[0.1rem] mr-[1rem] h-[2rem]"
            />
          }
          title="문장 맞춰보기"
        />
        <ContentsBox className="script" grid={"1fr"}>
          <SentenceList />
        </ContentsBox>
    </main>
      </UserContext.Provider>
  );
}

export default App
