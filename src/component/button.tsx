import { useLikeSlot } from "@src/util/slot";
import React, { useEffect } from "react";
function Button(props: {size: 'xs' | 'md' | 'lg', slots: {[key: string]: React.ReactElement}, slot_key?: string}) {
    const [child, setChild] = useLikeSlot(props); //setChildren
    useEffect(() => {
        if(!props.slot_key) return;
        setChild(props.slot_key);
    },[props.slot_key])
    return (
        <button>{child}</button>
    )
  }
  
  export default Button;
  