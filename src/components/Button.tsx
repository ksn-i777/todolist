import React from 'react';

type ButtonType = {
    name: string,
    callback: () => void,
}

export function Button(props: ButtonType) {
    return <button onClick={props.callback}>{props.name}</button>
}