import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type UniversalEditableSpanPropsType = {
    title: string,
    changeSpanTitle: (newSpanTitle: string) => void
}

export function UniversalEditableSpan(props: UniversalEditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)

    function onStartEditMode() {
        setEditMode(true)
    }
    function onFinishEditMode() {
        setEditMode(false)
    }
    function onChangeSpanText(e: ChangeEvent<HTMLInputElement>) {
        props.changeSpanTitle(e.currentTarget.value)
    }

    const inputStyle = {
        minWidth: '150px',
        maxWidth: '150px',
        minHeight: '20px',
        maxHeight: '20px',
    }

    return editMode
        ? /*<input
                type="text"
                value={props.title}
                onChange={onChangeSpanText}
                onBlur={onFinishEditMode}
                autoFocus/>*/
            <TextField
                variant="standard"
                size="small"
                style={inputStyle}
                value={props.title}
                onChange={onChangeSpanText}
                onBlur={onFinishEditMode}
                autoFocus/>
        : <span onDoubleClick={onStartEditMode}>{props.title}</span>
}