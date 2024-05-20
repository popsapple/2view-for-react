import { type SetterOrUpdater, useRecoilState, useRecoilValueLoadable } from "recoil";
import { selectorQueriedScriptInfo, sentenceType, atomSelectedScript } from "@src/store/script";
import { ListBox } from "@src/component/list";
import React from "react";
import { Loading } from "@src/component/Loading";
import styles from "./SentenceList.module.scss";
import { AudioPlayer } from "@src/component/AudioPlayer";
import Button from "@src/component/button";

function printList(script: sentenceType[], currentTime: number, selectedScripts: sentenceType[], setSelectedScripts: SetterOrUpdater<sentenceType[]>) {
    const list = script.map((srt) => {
        return (
        <div
            className={
            parseFloat(srt.start) * 1000 >= currentTime &&
            parseFloat(srt.end) * 1000 < currentTime
                ? "active"
                : ""
            }
        >
            <Button
                size="md"
                click={() => {
                    const temp = [...selectedScripts];
                    const fidx = temp.findIndex((i) => i.idx === srt.idx);
                    if (fidx !== -1) {
                    temp.splice(fidx, 1);
                    } else {
                    temp.push(srt);
                    }
                    setSelectedScripts(temp);
                }}
                slots={{'active' : <>'선택됨'</>, 'default' : <>'해제됨'</> }}
                slot_key={
                    selectedScripts.findIndex((i) => i.idx === srt.idx) !== -1 ? "active" : "default"
                }
                classNm={
                    selectedScripts.findIndex((i) => i.idx === srt.idx) !== -1  ? "ck active" : "ck default"
                }
            ></Button>
            <span className="ml-[0.5rem]">{srt.sentence}</span>
        </div>
        );
    })
    return [list];
}

export function SentenceList() {
  const script = useRecoilValueLoadable<{ url: string; scripts: sentenceType[] }>(
    selectorQueriedScriptInfo
  );
  const [currentTime, setCurrentTime] = React.useState(0);
  
  const [selectedScripts, setSelectedScripts] = useRecoilState<sentenceType[]>(atomSelectedScript);

  React.useEffect(() => {

  }, [])
  switch (script.state) {
    case 'hasValue': {
        const [list] = printList(script.contents.scripts, currentTime, selectedScripts, setSelectedScripts);
        return (
            <div className={styles.SentenceList}>
                <ListBox
                classNm="script-list"
                id="script-list"
                list={list}
                />
                <AudioPlayer url={script.contents.url} timeupdate={(v) => setCurrentTime(v)} />
            </div>
        );
    }
    case 'loading':
      return <Loading />;
    case 'hasError':
      throw new Error('load fail');
  }
}
