import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';
import {FilterValuesType} from '../App';
import {Button} from './Button';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (newTitle: string) => void,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    changeTaskStatus: (taskId: string, isDone: boolean) => void,
    filter: FilterValuesType,
};

export function Todolist(props: TodolistPropsType) {

    const [newTitle, setNewTitle] = useState('');

    const [error, setError] = useState('');
    const errorMessage = 'Field is required';

    function addTaskHandler() {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim());
            setNewTitle('');
        } else {setError(errorMessage)}
    }

    function changeFilterHandler(value: FilterValuesType) {
        props.changeFilter(value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && newTitle.trim() !== '') {
            addTaskHandler();
        } else {setError(errorMessage)}
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value.trim() === '') {
            setError(errorMessage)
        } else {setError('')}
        setNewTitle(e.currentTarget.value);
    }

    /* const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    } */

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'errorInput' : ''}
                    placeholder={error ? errorMessage : ''}
                />
                <Button name="+" callback={addTaskHandler}/>
            </div>
            <ul>
                {props.tasks.map(task => {

                    function changeTaskStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }

                    function removeTaskHandler() {
                        props.removeTask(task.id);
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <span>{task.title}</span>
                            <Button name={'x'} callback={removeTaskHandler/* () => removeTaskHandler(task.id) */}/>
                        </li>
                    )})
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={() => changeFilterHandler('all')}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={() => changeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}