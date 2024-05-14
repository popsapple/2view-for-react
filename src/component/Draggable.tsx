export function Draggable(props: {
    children?: React.ReactElement,
    axis: 'x' | 'y' | 'xy',
    dragStart: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    dragStop: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    dragMove: (ev: React.PointerEvent<HTMLButtonElement>) => void,
    parentElement: React.ReactElement | HTMLElement | null
}) {
    const onStart = (ev: React.PointerEvent<HTMLButtonElement>) => {
        props.dragStart(ev);
    }
    const onMove = (ev: React.PointerEvent<HTMLButtonElement>) => {
        props.dragMove(ev);
    }
    const onStop = (ev: React.PointerEvent<HTMLButtonElement>) => {
        props.dragStop(ev);
    }
    return <>
        <button 
            onPointerDown={(ev) => onStart(ev)}
            onPointerMove={(ev) => onMove(ev)}
            onPointerUp={(ev) => onStop(ev)}
            onPointerCancel={(ev) => onStop(ev)}
        >
            {props.children}
        </button>
    </>
}