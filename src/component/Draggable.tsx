import React from "react";

export function Draggable(props: {
    children?: React.ReactElement,
    axis: 'x' | 'y' | 'xy',
    dragStart: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    dragStop: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    dragMove: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    parentElement: React.ReactElement | HTMLElement | null,
    range?: {minx: number, miny: number,maxx: number, maxy: number}
}) {
    const btn = React.useRef<null | HTMLButtonElement>(null);
    const startPoint = React.useRef<{x: number, y: number}>({x:0,y:0});
    const movePoint = React.useRef<{x: number, y: number}>({x:0,y:0});
    const btnPoint = React.useRef<{x: number, y: number}>({x:0,y:0});
    const isPress = React.useRef<boolean>(false);
    const onStart = (ev: React.PointerEvent<HTMLButtonElement>) => {
        if(isPress.current === true || btn.current === null) return;
        isPress.current = true;
        props.dragStart(ev);
        if(!btn.current.style.left) btn.current.style.left = '0px';
        if(!btn.current.style.top) btn.current.style.top = '0px';
        btnPoint.current = {x: parseInt(btn.current.style.left.replace('px','')), y: parseInt(btn.current.style.top.replace('px',''))};
        startPoint.current = {x: ev.clientX, y: ev.clientY};
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onStop);
    }
    const onMove = (ev: PointerEvent) => {
        props.dragMove(ev as unknown as React.PointerEvent<HTMLButtonElement>);
        movePoint.current = {x: ev.clientX, y: ev.clientY};
        if(btn.current) {
            let x = (btnPoint.current.x + (movePoint.current.x - startPoint.current.x));
            let y = (btnPoint.current.y + (movePoint.current.y - startPoint.current.y));
            if(props.range) {
                if(props.range.minx > x) x = props.range.minx;
                if(props.range.maxx < x) x = props.range.maxx;
                if(props.range.miny > y) y = props.range.miny;
                if(props.range.maxy < y) y = props.range.maxy;
            }
            if(props.axis.includes('x')) btn.current.style.left = x + 'px';
            if(props.axis.includes('y')) btn.current.style.top = y + 'px';
        }
    }
    const onStop = (ev: PointerEvent) => {
        if(btn.current === null) return;
        isPress.current = false;
        props.dragStop(ev as unknown as React.PointerEvent<HTMLButtonElement>);
        const rect =  btn.current.getBoundingClientRect();
        btnPoint.current = {x: rect.left, y: rect.top};
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onStop);
    }
    return <>
        <button 
            ref={(e) => btn.current = e}
            onPointerDown={(ev) => onStart(ev)}
            onPointerUp={(ev) => onStop(ev as unknown as PointerEvent)}
            onPointerCancel={(ev) => onStop(ev as unknown as PointerEvent)}
        >
            {props.children}
        </button>
    </>
}