import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button, TextField } from '@mui/material'

type AddItemFormPropsType = {
  what: string
  callback(newInputText: string): void
  disabled?: boolean
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

  const [newInputText, setNewInputText] = useState<string>('')
  const [error, setError] = useState<string>('')

  const errorMessage: string = 'Field is required'

  function onAddItem(): void {
    if (newInputText.trim() !== '') {
      props.callback(newInputText.trim())
      setNewInputText('')
    } else {
      setError(errorMessage)
    }
  }

  function onChangeInput(e: ChangeEvent<HTMLInputElement>): void {
    if (e.currentTarget.value.trim() !== '') { setNewInputText(e.currentTarget.value) }
    else { setNewInputText('') }
  }

  function onKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (error && e.key !== 'Enter') { setError('') }
    if (e.key === 'Enter' && newInputText.trim() !== '') { onAddItem() }
    if (e.key === 'Enter' && newInputText.trim() === '') { setError(errorMessage) }
  }

  const buttonStyle = {
    minWidth: '20px',
    maxWidth: '20px',
    border: '1px solid',
  }

  return (
    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 20px', gap: '10px' }}>
      <TextField
        disabled={props.disabled}
        error={!!error}
        variant="outlined"
        size="small"
        label={error ? errorMessage : props.what}
        value={newInputText}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <Button disabled={props.disabled} style={buttonStyle} color='secondary' onClick={onAddItem}>+</Button>
    </div>
  )
})