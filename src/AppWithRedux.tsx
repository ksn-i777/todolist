import React from 'react'
import './App.css'
import { Todolist } from './components/Todolist'
import { UniversalAddItemForm } from './components/UniversalAddItemForm'
import { AppBarComponent } from './components/AppBarComponent'
import { Container, Grid, Paper } from '@mui/material';
import { addTodolistAC, removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } from './store/todolists-reducer'
import { addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './store/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'

export type TodolistFilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    todolistId: string,
    todolistTitle: string,
    todolistFilter: TodolistFilterValuesType,
}

export type TaskType = {
    taskId: string,
    taskTitle: string,
    taskIsDoneStatus: boolean,
}
export type TasksType = {
    [key: string]: Array<TaskType>,
}

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

    function addTodolist(titleOfNewTodolist:string):void {
        const action = addTodolistAC(titleOfNewTodolist)
        dispatch(action)
    }
    function removeTodolist(todolistID:string):void {
        const action = removeTodolistAC(todolistID)
        dispatch(action);
    }
    function changeTodolistTitle(todolistID:string, newTodolistTitle:string):void {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }
    function changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatch(changeTodolistFilterAC(todolistID, newTodolistFilter));
    }

    function addTask(todolistID:string, titleOfNewTask:string):void {
        dispatch(addTaskAC(todolistID, titleOfNewTask));
    }
    function removeTask(todolistID:string, taskID:string):void {
        dispatch(removeTaskAC(todolistID, taskID));
    }
    function changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle))
    }
    function changeTaskStatus(todolistID:string, taskID:string, taskStatus:boolean):void {
        dispatch(changeTaskStatusAC(todolistID, taskID, taskStatus));
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

                        let filteredTasksByFilter = tasks[tl.todolistId];
                        if (tl.todolistFilter === 'active') {
                            filteredTasksByFilter = tasks[tl.todolistId].filter(task => !task.taskIsDoneStatus);
                        }
                        if (tl.todolistFilter === 'completed') {
                            filteredTasksByFilter = tasks[tl.todolistId].filter(task => task.taskIsDoneStatus);
                        }

                        return (
                            <Paper key={tl.todolistId} style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        todolistId={tl.todolistId}
                                        todolistTitle={tl.todolistTitle}
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