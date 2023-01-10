import React, {useCallback, useEffect} from 'react'
import './App.css'
import { Todolist } from './components/Todolist'
import { UniversalAddItemForm } from './components/UniversalAddItemForm'
import { AppBarComponent } from './components/AppBarComponent'
import { Container, Grid, Paper } from '@mui/material';
import {
    createTodolistAC,
    deleteTodolistAC,
    updateTodolistTitleAC,
    updateTodolistFilterAC,
    TodolistType, TodolistFilterValuesType, getTodolistsTC, TodolistActionsType
} from './store/todolists-reducer'
import {createTaskAC, deleteTaskAC, updateTaskTitleAC, updateTaskStatusAC, TasksType} from './store/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import {AppDispatch, RootStateType} from './store/store'
import {TaskStatus, todolistsAPI} from './api/api';

export function AppWithRedux() {

    const dispatch = useDispatch<AppDispatch>()
    const todolists = useSelector<RootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const createTodolist = useCallback(function(titleOfNewTodolist:string):void {
        dispatch(createTodolistAC(titleOfNewTodolist))
    }, [dispatch])
    const deleteTodolist = useCallback(function(todolistID:string):void {
        dispatch(deleteTodolistAC(todolistID));
    }, [dispatch])
    const updateTodolistTitle = useCallback(function(todolistID:string, newTodolistTitle:string):void {
        dispatch(updateTodolistTitleAC(todolistID, newTodolistTitle))
    }, [dispatch])
    const updateTodolistFilter = useCallback(function(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatch(updateTodolistFilterAC(todolistID, newTodolistFilter));
    }, [dispatch])

    const createTask = useCallback(function(todolistID:string, titleOfNewTask:string):void {
        dispatch(createTaskAC(todolistID, titleOfNewTask));
    }, [dispatch])
    const deleteTask = useCallback(function(todolistID:string, taskID:string):void {
        dispatch(deleteTaskAC(todolistID, taskID));
    }, [dispatch])
    const updateTaskTitle = useCallback(function(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatch(updateTaskTitleAC(todolistID, taskID, newTaskTitle))
    }, [dispatch])
    const updateTaskStatus = useCallback(function (todolistID:string, taskID:string, taskStatus:TaskStatus):void {
        dispatch(updateTaskStatusAC(todolistID, taskID, taskStatus));
    }, [dispatch])

    return (
        <div className="App">
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <Grid container>
                    <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                        <Grid item>
                            <div>
                                <h3 style={{margin: '0 0 5px 0'}}>Add new todolist</h3>
                                <UniversalAddItemForm what={'todolist name'} callback={createTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {

                        let tasksForTodolist = tasks[tl.id];

                        return (
                            <Paper key={tl.id} style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        todolistFilter={tl.todolistFilter}
                                        tasks={tasksForTodolist}

                                        deleteTodolist={deleteTodolist}
                                        updateTodolistTitle={updateTodolistTitle}
                                        updateTodolistFilter={updateTodolistFilter}

                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTaskStatus={updateTaskStatus}
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