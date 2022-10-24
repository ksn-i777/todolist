import React, { useState } from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export function App() {

    const title="What to learn";

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function addTask (newTitle: string) {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false,
        };
        setTasks([newTask, ...tasks]);
    };

    function removeTask (taskId: string) {
        let filteredTasksById = tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasksById);
    };

    const [filter, setFilter] = useState<FilterValuesType>('all');

    let filteredTasksByFilter = tasks;
    if (filter === 'active') {
        filteredTasksByFilter = tasks.filter(task => !task.isDone);
    } else if (filter === 'completed') {
        filteredTasksByFilter = tasks.filter(task => task.isDone);
    };

    function changeFilter (value: FilterValuesType) {
        setFilter(value);
    };

    return (
        <div className="App">            
            <Todolist
                title={title}
                tasks={filteredTasksByFilter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}