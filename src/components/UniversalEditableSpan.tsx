import React, {ChangeEvent, useState} from 'react';

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

    return editMode
        ? <input
            type="text"
            value={props.title}
            onChange={onChangeSpanText}
            onBlur={onFinishEditMode}
            autoFocus
        />
        : <span onDoubleClick={onStartEditMode}>{props.title}</span>
}