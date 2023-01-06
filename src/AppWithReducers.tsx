import React, { useReducer } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';
import { UniversalAddItemForm } from './components/UniversalAddItemForm';
import { AppBarComponent } from './components/AppBarComponent';
import { Container, Grid, Paper } from '@mui/material';
import {
    todolistsReducer,
    addTodolistAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    TodolistFilterValuesType
} from './store/todolists-reducer';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './store/tasks-reducer';
import {TaskPriority, TaskStatus} from './api/api';

export function AppWithReducers() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', todolistFilter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', todolistFilter: 'all', addedDate: '', order: 0},
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]:
            [
                {id: v1(), title: 'HTML&CSS', status: TaskStatus.Completed, completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'JS', status: TaskStatus.Completed, completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'ReactJS', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Rest API', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'GraphQL', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            ],
        [todolistID2]:
            [
                {id: v1(), title: 'Book', status: TaskStatus.Completed, completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Milk', status: TaskStatus.New, completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Bred', status: TaskStatus.Completed, completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Pasta', status: TaskStatus.New, completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Pencil', status: TaskStatus.Completed, completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            ],
    });

    function addTodolist(titleOfNewTodolist:string):void {
        dispatchToTodolists(addTodolistAC(titleOfNewTodolist))
        dispatchToTasks(addTodolistAC(titleOfNewTodolist))
    }
    function removeTodolist(todolistID:string):void {
        dispatchToTodolists(removeTodolistAC(todolistID));
        dispatchToTasks(removeTodolistAC(todolistID));
    }
    function changeTodolistTitle(todolistID:string, newTodolistTitle:string):void {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }
    function changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, newTodolistFilter));
    }

    function addTask(todolistID:string, titleOfNewTask:string):void {
        dispatchToTasks(addTaskAC(todolistID, titleOfNewTask));
    }
    function removeTask(todolistID:string, taskID:string):void {
        dispatchToTasks(removeTaskAC(todolistID, taskID));
    }
    function changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, newTaskTitle))
    }
    function changeTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, taskStatus));
    }

    return (
        <div className="App">
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <Grid container>
                    <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                        <Grid item>
                            <div>
                                <h3 style={{margin: '0 0 5px 0'}}>Add new todolist</h3>
                                <UniversalAddItemForm what={'todolist name'} callback={addTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {

                        let filteredTasksByFilter = tasks[tl.id];
                        if (tl.todolistFilter === 'active') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.New);
                        }
                        if (tl.todolistFilter === 'completed') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.Completed);
                        }

                        return (
                            <Paper key={tl.id} style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        todolistFilter={tl.todolistFilter}
                                        tasks={filteredTasksByFilter}

                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTodolistFilter={changeTodolistFilter}

                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                </Grid>
                            </Paper>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}