import React from 'react';
import style from './AudioPlayer.module.scss';
import Draggable from 'react-draggable'; // The default
export function AudioPlayer(props: {url: string, timeupdate: (v: number) => void}) {
    const audio = React.useRef<HTMLAudioElement | null>(null);
    const bar = React.useRef<HTMLDivElement | null>(null);
    const [canDrag, setCanDrag] = React.useState<boolean>(false);
    const [isPlaing, setPlaing] = React.useState<boolean>(false);
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
    return <div className={style.Audio}>
        <audio ref={(e) => audio.current = e} src={props.url} controls={false} />
        <button onClick={() => audio.current?.pause()}></button>
        <button onClick={() => audio.current?.play()}></button>
        <div className={'progress'} ref={(e) => bar.current = e}>
            
        </div>
    </div>
}
/**
 * {canDrag && bar.current ? <Draggable
                axis='x'
                bounds='parent'
                defaultPosition={{x:0, y: 10}}
                offsetParent={bar.current}
                position={isPlaing ? {x: 0, y: 10} : undefined}
                onStart={() => {
                    setPlaing(false);
                }}
                onDrag={(e, data) => {
                    if(!bar.current) return;
                    const rate = (data.x / bar.current?.offsetWidth);
                    if(!audio.current) return;
                    audio.current.currentTime = audio.current.duration * rate;
                }}
                onStop={() => {
                    setPlaing(true);
                }}
            /> : ''}
 */