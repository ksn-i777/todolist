import React, { useCallback, useEffect } from 'react'
import { Todolist } from '../components/Todolist'
import { AppBarComponent } from '../components/other/AppBarComponent'
import { AddTodolist } from '../components/other/AddTodolist'
import { Container, Grid, Paper } from '@mui/material'
import {
    getTodolistsTC,
    createTodolistTC,
    deleteTodolistTC,
    updateTodolistTitleTC,
    updateTodolistFilterTC,
    TodolistType,
    TodolistFilterValuesType
} from '../store/todolists-reducer'
import { createTaskTC, deleteTaskTC, updateTaskTitleTC, updateTaskStatusTC, TasksType } from '../store/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType, AppDispatchType } from '../store/store'
import { TaskStatus } from '../api/api'
import { ErrorSnackbar } from '../components/other/ErrorSnackBar'

export function AppWithRedux() {

    const dispatch = useDispatch<AppDispatchType>()
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const createTodolist = useCallback(function(titleOfNewTodolist:string):void {
        dispatch(createTodolistTC(titleOfNewTodolist))
    }, [dispatch])
    const deleteTodolist = useCallback(function(todolistID:string):void {
        dispatch(deleteTodolistTC(todolistID));
    }, [dispatch])
    const updateTodolistTitle = useCallback(function(todolistID:string, newTodolistTitle:string):void {
        dispatch(updateTodolistTitleTC(todolistID, newTodolistTitle))
    }, [dispatch])
    const updateTodolistFilter = useCallback(function(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatch(updateTodolistFilterTC(todolistID, newTodolistFilter));
    }, [dispatch])

    const createTask = useCallback(function(todolistID:string, titleOfNewTask:string):void {
        dispatch(createTaskTC(todolistID, titleOfNewTask));
    }, [dispatch])
    const deleteTask = useCallback(function(todolistID:string, taskID:string):void {
        dispatch(deleteTaskTC(todolistID, taskID))
    }, [dispatch])
    const updateTaskTitle = useCallback(function(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatch(updateTaskTitleTC(todolistID, taskID, newTaskTitle))
    }, [dispatch])
    const updateTaskStatus = useCallback(function (todolistID:string, taskID:string, taskStatus:TaskStatus):void {
        dispatch(updateTaskStatusTC(todolistID, taskID, taskStatus));
    }, [dispatch])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <AddTodolist createTodolist={createTodolist}/>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];
                        return (
                            <Paper key={tl.id} style={{padding: '10px'}} elevation={3}>
                                <Grid item style={{position: 'relative', paddingBottom: '30px', height: '100%'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        todolistFilter={tl.todolistFilter}
                                        todolistEntityStatus={tl.entityStatus}
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

