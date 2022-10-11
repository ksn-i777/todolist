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

    let useRemoveTasks1 = (id: number) => {
        let filteredTasks1 = tasks1.filter(el => el.id !== id);
        useTasks1(filteredTasks1);
    };
    let useRemoveTasks2 = (id: number) => {
        let filteredTasks2 = tasks2.filter(el => el.id !== id);
        useTasks2(filteredTasks2);
    };


    
    return (
        <div className="App">            
            <Todolist title={title1} tasks={tasks1} removeTasks={useRemoveTasks1} />
            <Todolist title={title2} tasks={tasks2} removeTasks={useRemoveTasks2} />
        </div>
    );
}

export default App;
