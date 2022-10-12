import React, { useState } from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {

    const title1="What to learn";
    const title2="Songs";

    const initialTasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ];
    const initialTasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
    ];

    let [tasks1, useTasks1] = useState(initialTasks1);
    let [tasks2, useTasks2] = useState(initialTasks2);
    let [status1, useStatus1] = useState("all");
    let [status2, useStatus2] = useState("all");

    let tasksWithStatus1 = tasks1;
    let tasksWithStatus2 = tasks2;

    if (status1 === "active") {
        tasksWithStatus1 = tasks1.filter(el => el.isDone == false)
    } else if (status1 === "completed") {
        tasksWithStatus1 = tasks1.filter(el => el.isDone == true)
    }
    if (status2 === "active") {
        tasksWithStatus2 = tasks2.filter(el => el.isDone == false)
    } else if (status2 === "completed") {
        tasksWithStatus2 = tasks2.filter(el => el.isDone == true)
    }

    let useRemoveTasks1 = (id: number) => {
        let filteredTasksById1 = tasks1.filter(el => el.id !== id);
        useTasks1(filteredTasksById1);
    };
    let useRemoveTasks2 = (id: number) => {
        let filteredTasksById2 = tasks2.filter(el => el.id !== id);
        useTasks2(filteredTasksById2);
    };
    let useFilterTasks1 = (value: string) => {
        useStatus1(value);
    };
    let useFilterTasks2 = (value: string) => {
        useStatus2(value);
    };

    
    return (
        <div className="App">            
            <Todolist title={title1} tasks={tasksWithStatus1} removeTasks={useRemoveTasks1} filterTasks={useFilterTasks1}/>
            <Todolist title={title2} tasks={tasksWithStatus2} removeTasks={useRemoveTasks2} filterTasks={useFilterTasks2}/>
        </div>
    );
}

export default App;
