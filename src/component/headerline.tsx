function HeadLine(props: {children: React.ReactNode, className: string, title: string}) {
    return <section className={`${props.className} height-[1.5rem] mr-[1rem] mb-[1rem]`}>
        {props.children}
        <h1 className="inline font-bold">{props.title}</h1>
    </section>
}
export default HeadLine;