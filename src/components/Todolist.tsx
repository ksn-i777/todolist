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

    removeTodolist(todolistID:string):void,
    changeTodolistTitle(todolistID:string, newTodolistTitle:string):void,
    changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void,

    addTask(todolistID:string, titleOfNewTask:string):void,
    removeTask(todolistID:string, taskID:string):void,
    changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void,
    changeTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void,
};

export const Todolist = React.memo(function(props:TodolistPropsType) {
    console.log('todolist')

    const onRemoveTodolist = useCallback(function():void {
        props.removeTodolist(props.todolistId);
    }, [props.removeTodolist, props.todolistId])
    const onChangeTodolistTitle = useCallback(function(newTodolistTitle:string):void {
        props.changeTodolistTitle(props.todolistId, newTodolistTitle)
    }, [props.changeTodolistTitle, props.todolistId])
    const onChangeTodolistFilter = useCallback(function(newTodolistFilter:TodolistFilterValuesType):void {
        props.changeTodolistFilter(props.todolistId, newTodolistFilter);
    }, [props.changeTodolistFilter, props.todolistId])

    const onAddTask = useCallback(function(titleOfNewTask:string):void {
        props.addTask(props.todolistId, titleOfNewTask)
    }, [props.addTask, props.todolistId])

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
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
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