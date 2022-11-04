import React from 'react';

type ButtonType = {
    name: string,
    className: string,
    callback: () => void,
}

export function Button(props: ButtonType) {
    return <button className={props.className} onClick={props.callback}>{props.name}</button>
}