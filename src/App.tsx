import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {

    const title1="What to learn 1";
    const title2="What to learn 2";

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]

    return (
        <div className="App">            
            <Todolist title={title1} data={tasks1}/>
            <Todolist title={title2} data={tasks2}/>
        </div>
    );
}

export default App;
