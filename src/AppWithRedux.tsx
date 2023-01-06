import React, {useCallback} from 'react'
import './App.css'
import { Todolist } from './components/Todolist'
import { UniversalAddItemForm } from './components/UniversalAddItemForm'
import { AppBarComponent } from './components/AppBarComponent'
import { Container, Grid, Paper } from '@mui/material';
import {
    addTodolistAC,
    removeTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    TodolistType, TodolistFilterValuesType
} from './store/todolists-reducer'
import {addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC, TasksType} from './store/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store/store'
import {TaskStatus} from './api/api';

export function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<RootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

    const addTodolist = useCallback(function(titleOfNewTodolist:string):void {
        dispatch(addTodolistAC(titleOfNewTodolist))
    }, [dispatch])
    const removeTodolist = useCallback(function(todolistID:string):void {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch])
    const changeTodolistTitle = useCallback(function(todolistID:string, newTodolistTitle:string):void {
        dispatch(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }, [dispatch])
    const changeTodolistFilter = useCallback(function(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatch(changeTodolistFilterAC(todolistID, newTodolistFilter));
    }, [dispatch])

    const addTask = useCallback(function(todolistID:string, titleOfNewTask:string):void {
        dispatch(addTaskAC(todolistID, titleOfNewTask));
    }, [dispatch])
    const removeTask = useCallback(function(todolistID:string, taskID:string):void {
        dispatch(removeTaskAC(todolistID, taskID));
    }, [dispatch])
    const changeTaskTitle = useCallback(function(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTaskTitle))
    }, [dispatch])
    const changeTaskStatus = useCallback(function (todolistID:string, taskID:string, taskStatus:TaskStatus):void {
        dispatch(changeTaskStatusAC(todolistID, taskID, taskStatus));
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
                                <UniversalAddItemForm what={'todolist name'} callback={addTodolist}/>
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