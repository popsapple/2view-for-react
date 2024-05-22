import React from 'react';
import styles from './AudioPlayer.scss?inline';
import { Draggable } from './Draggable';
import { useImportStyle } from '@src/util/style';
export function AudioPlayer(props: {url: string, timeupdate: (v: number) => void}) {
    const audio = React.useRef<HTMLAudioElement | null>(null);
    const bar = React.useRef<HTMLDivElement | null>(null);
    const [canDrag, setCanDrag] = React.useState<boolean>(false);
    const [isPlaing, setPlaing] = React.useState<boolean>(false);
    useImportStyle(styles, 'audioplayer');
    React.useEffect(() => {
        setCanDrag(true);
    }, [bar.current])

    React.useEffect(() => {
        if(audio.current) {
            audio.current.ontimeupdate = () => {
                props.timeupdate(audio.current ? audio.current?.currentTime : 0);
            }
        }
    }, [audio.current])

    React.useEffect(() => {
        if(isPlaing) {
            audio.current?.play();
        } else {
            audio.current?.pause();
        }
    }, [isPlaing])
    return <div className="box" >
        <audio ref={(e) => audio.current = e} src={props.url} controls={false} />
        {/*<button className="fa-solid fa-stop" onClick={() => audio.current?.pause()}></button>
        <button className="fa-solid fa-play" onClick={() => audio.current?.play()}></button>*/}
        <div className="progress" ref={(e) => bar.current = e}>
            <Draggable 
                axis='x'
                dragStart={(ev: React.PointerEvent<HTMLButtonElement>) => {
                    if(!canDrag) false;
                    //console.log(ev)
                }}
                dragMove={(ev: React.PointerEvent<HTMLButtonElement>) => {
                    if(!canDrag) false;
                    console.log(ev)
                }}
                dragStop={(ev: React.PointerEvent<HTMLButtonElement>) => {
                    //console.log(ev);
                    //setPlaing(true);
                }}
                parentElement={bar.current}
                range={{minx: 0, maxx: bar.current ? bar.current.offsetWidth - 5: 0, miny:0, maxy: 0}}
            />
        </div>
    </div>
}