export function ListBox(props: {list: Array<React.ReactElement>, classNm: string, id: string}) {
    return <ul className={props.classNm} id={props.id}>
        {props.list.map((i,idx) => <li key={props.id+'-'+idx}>{i}</li>)}
    </ul>
}