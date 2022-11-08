import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type UniversalAddItemFormPropsType = {
    callback: (newInputText: string) => void,
}

export function UniversalAddItemForm(props: UniversalAddItemFormPropsType) {

    const [newInputText, setNewInputText] = useState('');
    const [error, setError] = useState('');

    const errorMessage = 'Field is required';

    function onAddItem() {
        if (newInputText.trim() !== '') {
            props.callback(newInputText.trim());
            setNewInputText('');
        } else {
            setError(errorMessage)
        }
    }

    function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value.trim() !== '') {
            setError('');
            setNewInputText(e.currentTarget.value);
        } else {
            setNewInputText('')
        }
    }

    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && newInputText.trim() !== '') {
            onAddItem()
        } else {
            setError(errorMessage)
        }
    }

    return (
        <div>
            <input
                value={newInputText}
                onChange={onChangeInput}
                onKeyPress={onKeyPress}
                className={error ? 'errorInput' : ''}
                placeholder={error ? errorMessage : ''}
            />
            <button onClick={onAddItem}>+</button>
        </div>
    )
}