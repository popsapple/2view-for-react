import React from "react";
function ContentsBox(props: {children: React.ReactNode, className: string, grid: string}) {
    const styles = {'display':'grid', 'gridTemplateColumns': props.grid} as React.CSSProperties;
    return (
        <section className={`content-box ${props.className}`} style={styles}>{props.children}</section>
    )
  }
  
  export default ContentsBox;
  