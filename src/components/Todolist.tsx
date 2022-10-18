import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type StatusType = 'all' | 'active' | 'completed';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    filterTasks: (value: StatusType) => void,
    addTask: (value: string) => void,
};

export const Todolist = (props: TodolistPropsType) => {

    const [writeText, setWriteText] = useState('');

    function onChangeInput (e: ChangeEvent<HTMLInputElement>) {setWriteText(e.currentTarget.value)}
    function onKeyPressInput (e: KeyboardEvent<HTMLInputElement>) {
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(writeText)
            setWriteText('')
        }
    }
    function onClickPlus () {
        props.addTask(writeText)
        setWriteText('')
    }
    function filterAllTasks () {props.filterTasks('all')}
    function filterActiveTasks () {props.filterTasks('active')}
    function filterCompletedTasks () {props.filterTasks('completed')}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={writeText} onChange={onChangeInput} onKeyPress={onKeyPressInput}/>
                <button onClick={onClickPlus}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    function deleteTask () {
                        props.removeTask(el.id)
                    }

                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={deleteTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={filterAllTasks}>All</button>
                <button onClick={filterActiveTasks}>Active</button>
                <button onClick={filterCompletedTasks}>Completed</button>
            </div>
        </div>
    )
}

