import React from 'react';

type TodolistPropsType = {
    title: string;  
    data: Array<ObjectType>;
}

type ObjectType = {
    id: number;
    title: string;
    isDone: boolean;
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/* <li><input type="checkbox" checked={props.data[0].isDone}/> <span>{props.data[0].title}</span></li>
                <li><input type="checkbox" checked={props.data[1].isDone}/> <span>{props.data[1].title}</span></li>
                <li><input type="checkbox" checked={props.data[2].isDone}/> <span>{props.data[2].title}</span></li> */}
                {props.data.map((el: ObjectType) => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}