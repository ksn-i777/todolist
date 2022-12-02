import React, {ChangeEvent} from 'react';
import '../App.css';
import {TodolistFilterValuesType, TaskType} from '../AppWithReducers';
import {UniversalAddItemForm} from './UniversalAddItemForm';
import {UniversalEditableSpan} from './UniversalEditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from '@mui/material';

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
    changeTaskStatus(todolistID:string, taskID:string, taskStatus:boolean):void,
};

export function Todolist(props:TodolistPropsType) {

    function onRemoveTodolist():void {
        props.removeTodolist(props.todolistId);
    }
    function onChangeTodolistTitle(newTodolistTitle:string):void {
        props.changeTodolistTitle(props.todolistId, newTodolistTitle)
    }
    function onchangeTodolistFilter(newTodolistFilter:TodolistFilterValuesType):void {
        props.changeTodolistFilter(props.todolistId, newTodolistFilter);
    }

    function onAddTask(titleOfNewTask:string):void {
        props.addTask(props.todolistId, titleOfNewTask)
    }
    function onRemoveTask(taskID:string):void {
        props.removeTask(props.todolistId, taskID);
    }
    function onChangeTaskTitle(taskID:string, newTaskTitle:string):void {
        props.changeTaskTitle(props.todolistId, taskID, newTaskTitle)
    }
    function onChangeTaskStatus(taskID:string, e:ChangeEvent<HTMLInputElement>):void {
        props.changeTaskStatus(props.todolistId, taskID, e.currentTarget.checked);
    }

    const styleButton = {
        minWidth: '40px',
        maxWidth: '120px',
        minHeight: '25px',
        maxHeight: '25px',
        border: '1px solid',
        marginTop: '25px'
    }
    const styleTask = {
        display: 'flex',
        justifyContent: 'space-between',
    }
    const styleDoneTask = {
        opacity: '0.5',
        display: 'flex',
        justifyContent: 'space-between',
        textDecoration: 'line-through',
        color: 'darkorchid',
    }

    return (
        <div>
            <h3 style={{display: 'inline'}}><UniversalEditableSpan spanTitle={props.todolistTitle} changeSpanTitle={onChangeTodolistTitle}/></h3>
            {/*<UniversalButton name="x" className={''} onClick={onRemoveTodolist}/>*/}
            <IconButton aria-label="delete" size="small" color="secondary" onClick={onRemoveTodolist}><Delete fontSize="small"/></IconButton>
            <UniversalAddItemForm what={'task'} callback={onAddTask}/>
            <div>
                {props.tasks.map(task => {

                    /* function onRemoveTask() {
                        props.removeTask(task.taskId, props.todolistId);
                    } */
                    /* function onChangeTaskTitle(newTaskTitle: string) {
                        props.changeTaskTitle(props.todolistId, task.taskId, newTaskTitle)
                    } */
                    /* function onChangeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(props.todolistId, task.taskId, e.currentTarget.checked);
                    } */
                    

                    return (
                        <div key={task.taskId} style={task.taskIsDoneStatus ? styleDoneTask : styleTask}>
                            <div>
                                {/* <input
                                    type="checkbox"
                                    checked={task.taskIsDoneStatus}
                                    onChange={(e) => onChangeTaskStatus(task.taskId, e)
                                /> */}
                                <Checkbox color="secondary" checked={task.taskIsDoneStatus} onChange={(e) => onChangeTaskStatus(task.taskId, e)}/>
                                <UniversalEditableSpan spanTitle={task.taskTitle} changeSpanTitle={(newSpanTitle: string) => {onChangeTaskTitle(task.taskId, newSpanTitle)}}/>
                            </div>
                            {/*<UniversalButton name={'x'} className={''} onClick={() => onRemoveTask(task.id)/*onRemoveTask*!//>*/}
                            <IconButton aria-label="delete" size="small" color="secondary" onClick={() => onRemoveTask(task.taskId)}><Delete fontSize="small"/></IconButton>
                        </div>
                    )})
                }
            </div>
            <div style={{display: 'flex', gap: '5px'}}>
                {/*<UniversalButton name={'All'} className={props.filter === 'all' ? 'activeFilter' : ''} onClick={() => onChangeFilter('all')}/>
                <UniversalButton name={'Active'} className={props.filter === 'active' ? 'activeFilter' : ''} onClick={() => onChangeFilter('active')}/>
                <UniversalButton name={'Completed'} className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={() => onChangeFilter('completed')}/>*/}
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onchangeTodolistFilter('all')}>All
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onchangeTodolistFilter('active')}>Active
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onchangeTodolistFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}