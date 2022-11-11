import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type UniversalAddItemFormPropsType = {
    callback(newInputText:string):void,
}

export function UniversalAddItemForm(props:UniversalAddItemFormPropsType) {

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
            setError('');
            setNewInputText(e.currentTarget.value);
        } else {
            setNewInputText('')
        }
    }

    function onKeyPress(e:KeyboardEvent<HTMLInputElement>):void {
        if (e.key === 'Enter' && newInputText.trim() !== '') {
            onAddItem()
        } else {
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
        marginBottom: '25px',
        marginRight: '10px'
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
                error={!!error}
                variant="outlined"
                size="small"
                style={inputStyle}
                label={error ? errorMessage : 'Enter your task'}
                value={newInputText}
                onChange={onChangeInput}
                onKeyPress={onKeyPress}/>
            {/*<button onClick={onAddItem}>+</button>*/}
            <Button style={buttonStyle} color='secondary' onClick={onAddItem}>+</Button>
        </div>
    )
}