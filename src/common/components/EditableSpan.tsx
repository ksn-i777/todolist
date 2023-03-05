import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
  spanTitle: string
  changeSpanTitle(newSpanTitle: string): void
  disabled?: boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.spanTitle)

  function onOpenEditMode(): void {
    !props.disabled && setEditMode(true)
    return
  }
  function onCloseEditMode(): void {
    setEditMode(false)
    props.changeSpanTitle(title)
  }
  function onChangeSpanTitle(e: ChangeEvent<HTMLInputElement>): void {
    setTitle(e.currentTarget.value)
  }
  function onKeyDownSpanTitle(e: KeyboardEvent<HTMLDivElement>): void {
    if (e.code === 'Enter') {
      setEditMode(false)
      props.changeSpanTitle(title)
    }
  }

  return editMode
    ?
    <TextField
      variant="standard"
      size="small"
      style={{ width: '100%' }}
      value={title}
      onChange={onChangeSpanTitle}
      onBlur={onCloseEditMode}
      onKeyDown={onKeyDownSpanTitle}
      autoFocus
    />
    :
    <span style={{ width: '100%', wordBreak: 'break-word' }} onDoubleClick={onOpenEditMode}>{props.spanTitle}</span>
})