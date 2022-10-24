import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
};

export function Todolist (props: TodolistPropsType) {

    const [newTitle, setNewTitle] = useState('');
    
    function addTaskHandler () {
        props.addTask(newTitle);
        setNewTitle('');
    };

    function onKeyPressHandler (e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    };

    function onChangeHandler (e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.currentTarget.value);
    };

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    };
    
    function changeFilterHandler (value: FilterValuesType) {
        props.changeFilter(value);
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button name='+' callback={addTaskHandler}/>
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}