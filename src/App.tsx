import React, { useState } from 'react';
import './App.css';
import {StatusType, Todolist} from './components/Todolist';
import {v1} from "uuid";

export function App() {

    const title="What to learn";

    const initialTasks = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ];
    let [tasks, setTasks] = useState(initialTasks);

    function removeTask (id: string) {
        setTasks(tasks.filter((el) => el.id !== id))
    }

    const [status, setStatus] = useState<StatusType>('all');
    let filteredTasks = tasks;
    if (status === 'active') {
        filteredTasks = tasks.filter((el) => !el.isDone)
    } else if (status === 'completed') {
        filteredTasks = tasks.filter((el) => el.isDone)
    }
    function filterTasks (value: StatusType) {
        setStatus(value)
    }

    function addTask (value: string) {
        const task = {
            id: v1(),
            title: value,
            isDone: false,
        };
        const tasksWithNewTask = [task, ...tasks];
        setTasks(tasksWithNewTask)
    }

    return (
        <div className="App">            
            <Todolist
                title={title}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}