import React, { useState } from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:
        [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]:
        [
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "Bred", isDone: true },
            { id: v1(), title: "Pasta", isDone: false },
            { id: v1(), title: "Pencil", isDone: true },
        ],
    });

    function addTask (newTitle: string, todolistID: string) {
        const newTask = {
            id: v1(),
            title: newTitle,
            isDone: false,
        };
        let needTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...needTasks]
        setTasks({...tasks});
    }

    function removeTask (taskId: string, todolistID: string) {
        let needTasks = tasks[todolistID]
        let filteredTasksById = needTasks.filter(task => task.id !== taskId);
        tasks[todolistID] = filteredTasksById
        setTasks({...tasks});
    }

    function changeFilter (value: FilterValuesType, todolistID: string) {
        let findedTodolist = todolists.find(tl => tl.id === todolistID)
        if (findedTodolist) {
            findedTodolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus (taskId: string, isDone: boolean, todolistID: string) {
        let needTasks = tasks[todolistID]
        let foundTask = needTasks.find(task => task.id === taskId)
        if (foundTask) {
            foundTask.isDone = isDone
            setTasks({...tasks})
        }
        
    }

    function removeTodolist (todolistID: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistID)
        setTodolists(filteredTodolists)

        delete tasks[todolistID]
        setTasks({...tasks})

    }

    return (
        <div className="App">

            {todolists.map(tl => {

                let filteredTasksByFilter = tasks[tl.id];
                if (tl.filter === 'active') {
                    filteredTasksByFilter = tasks[tl.id].filter(task => !task.isDone);
                } else if (tl.filter === 'completed') {
                    filteredTasksByFilter = tasks[tl.id].filter(task => task.isDone);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={filteredTasksByFilter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}            
        </div>
    );
}
export default App