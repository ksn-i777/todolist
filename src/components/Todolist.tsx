import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UniversalAddItemForm } from './other/UniversalAddItemForm'
import { UniversalEditableSpan } from './other/UniversalEditableSpan'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { Task } from './Task'
import { TodolistFilterValuesType } from '../store/todolists-reducer'
import { TaskStatus } from '../api/api'
import { AppDispatchType } from '../store/store'
import { DomainTaskType, getTasksTC } from '../store/tasks-reducer'
import { RequestStatusType } from '../store/app-reducer'

type TodolistPropsType = {
    todolistId:string
    todolistTitle:string
    todolistFilter:TodolistFilterValuesType
    todolistEntityStatus:RequestStatusType
    tasks:Array<DomainTaskType>

    deleteTodolist(todolistID:string):void,
    updateTodolistTitle(todolistID:string, newTodolistTitle:string):void
    updateTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void

    createTask(todolistID:string, titleOfNewTask:string):void
    deleteTask(todolistID:string, taskID:string):void
    updateTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void
    updateTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void
};

export const Todolist = React.memo(function(props:TodolistPropsType) {

    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [dispatch, props.todolistId])

    const deleteTodolist = useCallback(function():void {
        props.deleteTodolist(props.todolistId);
    }, [props.deleteTodolist, props.todolistId])
    const updateTodolistTitle = useCallback(function(newTodolistTitle:string):void {
        props.updateTodolistTitle(props.todolistId, newTodolistTitle)
    }, [props.updateTodolistTitle, props.todolistId])
    const updateTodolistFilter = useCallback(function(newTodolistFilter:TodolistFilterValuesType):void {
        props.updateTodolistFilter(props.todolistId, newTodolistFilter);
    }, [props.updateTodolistFilter, props.todolistId])

    const createTask = useCallback(function(titleOfNewTask:string):void {
        props.createTask(props.todolistId, titleOfNewTask)
    }, [props.createTask, props.todolistId])

    let filteredTasksByFilter = props.tasks

    if (props.todolistFilter === 'active') {
        filteredTasksByFilter = props.tasks.filter(task => task.status === TaskStatus.New);
    }
    if (props.todolistFilter === 'completed') {
        filteredTasksByFilter = props.tasks.filter(task => task.status === TaskStatus.Completed);
    }

    const styleButton = {
        minWidth: '40px',
        maxWidth: '120px',
        minHeight: '25px',
        maxHeight: '25px',
        border: '1px solid',
        marginTop: '25px'
    }
    const styleActiveButton = {
        minWidth: '40px',
        maxWidth: '120px',
        minHeight: '25px',
        maxHeight: '25px',
        border: '1px solid darkorchid',
        marginTop: '25px',
        color: 'white',
        backgroundColor: 'darkorchid',
    }

    return (
        <div>
            <h3 style={{display: 'inline'}}><UniversalEditableSpan disabled={props.todolistEntityStatus === 'loading'} spanTitle={props.todolistTitle} changeSpanTitle={updateTodolistTitle}/></h3>
            <IconButton disabled={props.todolistEntityStatus === 'loading'} aria-label="delete" size="small" color="secondary" onClick={deleteTodolist}><Delete fontSize="small"/></IconButton>
            <UniversalAddItemForm what={'task'} disabled={props.todolistEntityStatus === 'loading'} callback={createTask}/>
            <div>
                {filteredTasksByFilter.map(task =>
                    <Task
                        key={task.id}
                        todolistID={props.todolistId}
                        task={task}
                        taskEntityStatus={task.entityStatus}
                        deleteTask={props.deleteTask}
                        updateTaskTitle={props.updateTaskTitle}
                        updateTaskStatus={props.updateTaskStatus}
                    />
                )}
            </div>
            <div style={{display: 'flex', gap: '5px', position: 'absolute', bottom: '0'}}>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={props.todolistFilter === 'all' ? styleActiveButton : styleButton}
                    onClick={() => updateTodolistFilter('all')}>All
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={props.todolistFilter === 'active' ? styleActiveButton : styleButton}
                    onClick={() => updateTodolistFilter('active')}>Active
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={props.todolistFilter === 'completed' ? styleActiveButton : styleButton}
                    onClick={() => updateTodolistFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    )
})