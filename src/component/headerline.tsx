function HeadLine(props: {children: React.ReactNode, className: string, title: string}) {
    return <section className={`headline ${props.className}`}>
        {props.children}
        <h1>{props.title}</h1>
    </section>
}
export default HeadLine;