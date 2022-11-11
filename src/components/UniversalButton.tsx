import React from 'react';

type UniversalButtonType = {
    name:string,
    className:string,
    onClick():void,
}

export function UniversalButton(props:UniversalButtonType) {
    return <button className={props.className} onClick={props.onClick}>{props.name}</button>
}