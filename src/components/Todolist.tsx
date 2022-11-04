import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';
import {FilterValuesType, TaskType} from '../App';
import {Button} from './Button';

type TodolistPropsType = {
    todolistID: string,
    title: string,
    tasks: Array<TaskType>,
    filter: FilterValuesType,
    addTask: (newTaskText: string, todolistID: string) => void,
    removeTask: (taskID: string, todolistID: string) => void,
    changeFilter: (value: FilterValuesType, todolistID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void,
    removeTodolist: (todolistID: string) => void,
};

export function Todolist(props: TodolistPropsType) {

    const [newTaskText, setNewTaskText] = useState('');
    const [error, setError] = useState('');

    const errorMessage = 'Field is required';

    function onAddTask() {
        if (newTaskText.trim() !== '') {
            props.addTask(newTaskText.trim(), props.todolistID);
            setNewTaskText('');
        } else {setError(errorMessage)}
    }

    function onRemoveTask(taskID: string) {
        props.removeTask(taskID, props.todolistID);
    }

    function onChangeFilter(value: FilterValuesType, todolistID: string) {
        props.changeFilter(value, todolistID);
    }

    function onChangeTaskStatus(e: ChangeEvent<HTMLInputElement>, taskID: string) {
        props.changeTaskStatus(taskID, e.currentTarget.checked, props.todolistID);
    }

    function onRemoveTodolist() {
        props.removeTodolist(props.todolistID);
    }



    function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value.trim() !== '') {
            setError('');
            setNewTaskText(e.currentTarget.value);
        } else {setNewTaskText('')}
    }

    function onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && newTaskText.trim() !== '') {onAddTask()}
        else {setError(errorMessage)}
    }

    return (
        <div>
            <span className='h3'><b>{props.title}</b></span><Button name="x" callback={onRemoveTodolist}/>
            <div>
                <input
                    value={newTaskText}
                    onChange={onChangeInput}
                    onKeyPress={onKeyPress}
                    className={error ? 'errorInput' : ''}
                    placeholder={error ? errorMessage : ''}
                />
                <Button name="+" callback={onAddTask}/>
            </div>
            <ul>
                {props.tasks.map(task => {

                    /*function onRemoveTask() {
                        props.removeTask(task.id, props.todolistID);
                    }*/
                    /*function onChangeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID);
                    }*/

                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => onChangeTaskStatus(e, task.id)/*onChangeTaskStatus*/}
                            />
                            <span>{task.title}</span>
                            <Button name={'x'} callback={() => onRemoveTask(task.id)/*onRemoveTask*/}/>
                        </li>
                    )})
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={() => onChangeFilter('all', props.todolistID)}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={() => onChangeFilter('active', props.todolistID)}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={() => onChangeFilter('completed', props.todolistID)}>Completed
                </button>
            </div>
        </div>
    )
}