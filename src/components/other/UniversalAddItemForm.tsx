import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import { BorderColor } from '@mui/icons-material';

type UniversalAddItemFormPropsType = {
    what:string
    callback(newInputText:string):void
    disabled?:boolean
}

export const UniversalAddItemForm = React.memo(function(props:UniversalAddItemFormPropsType) {
    console.log('addForm')

    const [newInputText, setNewInputText] = useState<string>('');
    const [error, setError] = useState<string>('');

    const errorMessage:string = 'Field is required';

    function onAddItem():void {
        if (newInputText.trim() !== '') {
            props.callback(newInputText.trim());
            setNewInputText('');
        } else {
            setError(errorMessage)
        }
    }

    function onChangeInput(e:ChangeEvent<HTMLInputElement>):void {
        if (e.currentTarget.value.trim() !== '') {
            setNewInputText(e.currentTarget.value);
        } else {
            setNewInputText('')
        }
    }

    function onKeyPress(e:KeyboardEvent<HTMLInputElement>):void {
        if (error && e.key !== 'Enter') {setError('')}
        if (e.key === 'Enter' && newInputText.trim() !== '') {
            onAddItem()
        }
        if (e.key === 'Enter' && newInputText.trim() === '') {
            setError(errorMessage)
        }
    }

    const buttonStyle = {
        minWidth: '40px',
        maxWidth: '40px',
        minHeight: '40px',
        maxHeight: '40px',
        border: '1px solid',
    }
    const inputStyle = {
        marginRight: '10px',
    }

    return (
        <div>
            {/*<input
                value={newInputText}
                onChange={onChangeInput}
                onKeyPress={onKeyPress}
                className={error ? 'errorInput' : ''}
                placeholder={error ? errorMessage : ''}
            />*/}
            <TextField
                disabled={props.disabled}
                error={!!error}
                variant="outlined"
                size="small"
                style={inputStyle}
                label={error ? errorMessage : `Enter your ${props.what}`}
                value={newInputText}
                onChange={onChangeInput}
                onKeyPress={onKeyPress}/>
            {/*<button onClick={onAddItem}>+</button>*/}
            <Button disabled={props.disabled} style={buttonStyle} color='secondary' onClick={onAddItem}>+</Button>
        </div>
    )
})