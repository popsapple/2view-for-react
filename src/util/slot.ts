import React from "react";

export const useLikeSlot:(props: {slots: {[key: string]: React.ReactElement}}) => [React.ReactElement, React.Dispatch<React.SetStateAction<string>>] = (props) => {
    const [slotKey, setSlotKey] = React.useState('default');
    const slotItem = props.slots[slotKey] as React.ReactElement;
    return [slotItem, setSlotKey];
}