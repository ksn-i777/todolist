import React, {useCallback} from 'react';
import '../App.css';
import {UniversalAddItemForm} from './UniversalAddItemForm';
import {UniversalEditableSpan} from './UniversalEditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, IconButton} from '@mui/material';
import {Task} from './Task';
import {TodolistFilterValuesType} from '../store/todolists-reducer';
import {TaskStatus, TaskType} from '../api/api';

type TodolistPropsType = {
    todolistId:string,
    todolistTitle:string,
    todolistFilter:TodolistFilterValuesType,
    tasks:Array<TaskType>,

    deleteTodolist(todolistID:string):void,
    updateTodolistTitle(todolistID:string, newTodolistTitle:string):void,
    updateTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void,

    createTask(todolistID:string, titleOfNewTask:string):void,
    deleteTask(todolistID:string, taskID:string):void,
    updateTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void,
    updateTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void,
};

export const Todolist = React.memo(function(props:TodolistPropsType) {
    console.log('todolist')

    const onRemoveTodolist = useCallback(function():void {
        props.deleteTodolist(props.todolistId);
    }, [props.deleteTodolist, props.todolistId])
    const onChangeTodolistTitle = useCallback(function(newTodolistTitle:string):void {
        props.updateTodolistTitle(props.todolistId, newTodolistTitle)
    }, [props.updateTodolistTitle, props.todolistId])
    const onChangeTodolistFilter = useCallback(function(newTodolistFilter:TodolistFilterValuesType):void {
        props.updateTodolistFilter(props.todolistId, newTodolistFilter);
    }, [props.updateTodolistFilter, props.todolistId])

    const onAddTask = useCallback(function(titleOfNewTask:string):void {
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

    return (
        <div>
            <h3 style={{display: 'inline'}}><UniversalEditableSpan spanTitle={props.todolistTitle} changeSpanTitle={onChangeTodolistTitle}/></h3>
            <IconButton aria-label="delete" size="small" color="secondary" onClick={onRemoveTodolist}><Delete fontSize="small"/></IconButton>
            <UniversalAddItemForm what={'task'} callback={onAddTask}/>
            <div>
                {filteredTasksByFilter.map(task =>
                    <Task
                        key={task.id}
                        todolistID={props.todolistId}
                        task={task}
                        removeTask={props.deleteTask}
                        changeTaskTitle={props.updateTaskTitle}
                        changeTaskStatus={props.updateTaskStatus}
                    />
                )}
            </div>
            <div style={{display: 'flex', gap: '5px'}}>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onChangeTodolistFilter('all')}>All
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onChangeTodolistFilter('active')}>Active
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onChangeTodolistFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    )
})