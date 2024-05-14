import React from "react";
import { UserContext } from '@src/component/CommonContext';

export function useImportStyle(style: string, id: string) {
    const container = React.useContext(UserContext);
    React.useEffect(() => {
        const root = container as HTMLElement;
        let st = root.querySelector('#'+ id) as HTMLStyleElement;
        if(!st) st = document.createElement('style');
        st.setAttribute('type', 'text/css');
        st.innerHTML = style;
        st.id = id;
        root.append(st);
    }, [])
}