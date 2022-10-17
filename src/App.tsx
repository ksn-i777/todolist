import React, { useState } from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

export function App() {

    const title_1="What to learn";  
    const title_2="Songs";  

    const initialTasks_1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ];    
    const initialTasks_2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
    ];

    let [tasks_1, setTasks_1] = useState(initialTasks_1);
    let [tasks_2, setTasks_2] = useState(initialTasks_2);

    const removeTask_1 = (id: number) => {
        setTasks_1(tasks_1.filter((el) => el.id !== id))
    }; 
    const removeTask_2 = (id: number) => {
        setTasks_2(tasks_2.filter((el) => el.id !== id))
    }; 

    const [status_1, setStatus_1] = useState('all');
    const [status_2, setStatus_2] = useState('all');

    let filteredTasks_1 = tasks_1;
    let filteredTasks_2 = tasks_2;

    if (status_1 === 'active') {
        filteredTasks_1 = tasks_1.filter((el) => el.isDone === false)
    } else if (status_1 === 'completed') {
        filteredTasks_1 = tasks_1.filter((el) => el.isDone === true)
    };
    if (status_2 === 'active') {
        filteredTasks_2 = tasks_2.filter((el) => el.isDone === false)
    } else if (status_2 === 'completed') {
        filteredTasks_2 = tasks_2.filter((el) => el.isDone === true)
    };
    
    const filterTasks_1 = (value: string) => {
        setStatus_1(value)
    };
    const filterTasks_2 = (value: string) => {
        setStatus_2(value)
    };
           
    return (
        <div className="App">            
            <Todolist
                title={title_1}
                tasks={filteredTasks_1}
                removeTask={removeTask_1}
                filterTasks={filterTasks_1}
            />    
            <Todolist
                title={title_2}
                tasks={filteredTasks_2}
                removeTask={removeTask_2}
                filterTasks={filterTasks_2}
            />     
        </div>
    );
};
