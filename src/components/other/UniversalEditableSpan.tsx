import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';

type UniversalEditableSpanPropsType = {
    spanTitle:string,
    changeSpanTitle(newSpanTitle:string):void,
}

export const UniversalEditableSpan = React.memo(function(props:UniversalEditableSpanPropsType) {
    console.log('editableSpan')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.spanTitle)

    function onOpenEditMode():void {
        setEditMode(true)
    }
    function onCloseEditMode():void {
        setEditMode(false)
        props.changeSpanTitle(title)
    }
    function onChangeSpanTitle(e:ChangeEvent<HTMLInputElement>):void {
        setTitle(e.currentTarget.value)
    }
    function onKeyDownSpanTitle(e:KeyboardEvent<HTMLDivElement>):void {
        if (e.code === 'Enter') {
            setEditMode(false)
            props.changeSpanTitle(title)
        }
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
                value={props.spanTitle}
                onChange={onChangeSpanTitle}
                onBlur={onCloseEditMode}
                autoFocus/>*/
            <TextField
                variant="standard"
                size="small"
                style={inputStyle}
                value={title}
                onChange={onChangeSpanTitle}
                onBlur={onCloseEditMode}
                onKeyDown={onKeyDownSpanTitle}
                autoFocus/>
        : <span onDoubleClick={onOpenEditMode}>{props.spanTitle}</span>
})