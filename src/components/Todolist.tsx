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
    todolistID: string,
    title: string,
    tasks: Array<TaskType>,
    addTask: (newTitle: string, todolistID: string) => void,
    removeTask: (taskId: string, todolistID: string) => void,
    changeFilter: (value: FilterValuesType, todolistID: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void,
    filter: FilterValuesType,
    removeTodolist: (todolistID: string) => void,
};

export function Todolist(props: TodolistPropsType) {

    const [newTitle, setNewTitle] = useState('');

    const [error, setError] = useState('');
    const errorMessage = 'Field is required';

    function addTaskHandler() {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim(), props.todolistID);
            setNewTitle('');
        } else {setError(errorMessage)}
    }

    function changeFilterHandler(value: FilterValuesType, todolistID: string) {
        props.changeFilter(value, todolistID);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && newTitle.trim() !== '') {
            addTaskHandler();
        } else {setError(errorMessage)}
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value.trim() !== '') {
            setError('')
            setNewTitle(e.currentTarget.value);
        } else {
            setNewTitle('')
        }
    }

    /* const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId)
    } */

    function onRemoveTodolist () {
        props.removeTodolist(props.todolistID)
    }

    return (
        <div>
            <span className='h3'><b>{props.title}</b></span><Button name="x" callback={onRemoveTodolist}/>
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
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
                    }

                    function removeTaskHandler() {
                        props.removeTask(task.id, props.todolistID);
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
                    onClick={() => changeFilterHandler('all', props.todolistID)}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={() => changeFilterHandler('active', props.todolistID)}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={() => changeFilterHandler('completed', props.todolistID)}>Completed
                </button>
            </div>
        </div>
    )
}