import React, { useState } from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};
export type TasksType = {
    [key: string]: Array<TaskType>,
};
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
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

    function addTask (newTaskText: string, todolistID: string) {
        const newTask = {id: v1(), title: newTaskText, isDone: false};
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }

    function removeTask (taskID: string, todolistID: string) {
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = todolistTasks.filter(task => task.id !== taskID);
        setTasks({...tasks});
    }

    function changeFilter (value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {todolist.filter = value}
        setTodolists([...todolists]);
    }

    function changeTaskStatus (taskID: string, isDone: boolean, todolistID: string) {
        let todolistTasks = tasks[todolistID];
        let task = todolistTasks.find(task => task.id === taskID);
        if (task) {task.isDone = isDone}
        setTasks({...tasks});
    }

    function removeTodolist (todolistID: string) {
        let todolistsAfterRemove = todolists.filter(tl => tl.id !== todolistID);
        setTodolists(todolistsAfterRemove);

        delete tasks[todolistID];
        setTasks({...tasks});
    }

    return (
        <div className="App">

            {todolists.map(tl => {

                let filteredTasksByFilter = tasks[tl.id];
                if (tl.filter === 'active') {
                    filteredTasksByFilter = tasks[tl.id].filter(task => !task.isDone);
                }
                if (tl.filter === 'completed') {
                    filteredTasksByFilter = tasks[tl.id].filter(task => task.isDone);
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={filteredTasksByFilter}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}            
        </div>
    );
}
export default App