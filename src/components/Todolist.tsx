import React from 'react';

type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
};

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    filterTasks: (value: 'all' | 'active' | 'completed') => void,
};

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {props.removeTask(el.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.filterTasks('all')}}>All</button>
                <button onClick={() => {props.filterTasks('active')}}>Active</button>
                <button onClick={() => {props.filterTasks('completed')}}>Completed</button>
            </div>
        </div>
    )
}

