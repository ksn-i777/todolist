import React, {ChangeEvent} from 'react';
import '../App.css';
import {FilterValuesType, TaskType} from '../App';
import {UniversalAddItemForm} from './UniversalAddItemForm';
import {UniversalEditableSpan} from './UniversalEditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from '@mui/material';

type TodolistPropsType = {
    todolistID:string,
    title:string,
    tasks:Array<TaskType>,
    filter:FilterValuesType,
    addTask(newTaskText:string, todolistID:string):void,
    removeTask(taskID:string, todolistID:string):void,
    changeFilter(value:FilterValuesType, todolistID:string):void,
    changeTaskStatus(taskID:string, isDone:boolean, todolistID:string):void,
    removeTodolist(todolistID:string):void,
    changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void,
    changeTodolistTitle(newTodolistTitle:string, todolistID:string):void,
};

export function Todolist(props:TodolistPropsType) {

    function onRemoveTask(taskID:string):void {
        props.removeTask(taskID, props.todolistID);
    }

    function onChangeFilter(value:FilterValuesType):void {
        props.changeFilter(value, props.todolistID);
    }

    function onChangeTaskStatus(e:ChangeEvent<HTMLInputElement>, taskID:string):void {
        props.changeTaskStatus(taskID, e.currentTarget.checked, props.todolistID);
    }

    function onRemoveTodolist():void {
        props.removeTodolist(props.todolistID);
    }

    function onAddTask(newInputText:string):void {
        props.addTask(newInputText, props.todolistID)
    }

    function onChangeTaskTitle(newTaskTitle:string, taskID:string):void {
        props.changeTaskTitle(props.todolistID, taskID, newTaskTitle)
    }

    function onChangeTodolistTitle(newTodolistTitle:string):void {
        props.changeTodolistTitle(newTodolistTitle, props.todolistID)
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
            <h3 style={{display: 'inline'}}><UniversalEditableSpan title={props.title} changeSpanTitle={onChangeTodolistTitle}/></h3>
            {/*<UniversalButton name="x" className={''} onClick={onRemoveTodolist}/>*/}
            <IconButton aria-label="delete" size="small" color="secondary" onClick={onRemoveTodolist}><Delete fontSize="small"/></IconButton>
            <UniversalAddItemForm callback={onAddTask}/>
            <div>
                {props.tasks.map(task => {

                    /*function onRemoveTask() {
                        props.removeTask(task.id, props.todolistID);
                    }*/
                    /*function onChangeTaskStatus(e: ChangeEvent<HTMLInputElement>) {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID);
                    }*/
                    /*function onChangeTaskTitle(newTaskTitle: string) {
                        props.changeTaskTitle(props.todolistID, task.id, newTaskTitle)
                    }*/

                    return (
                        <div key={task.id} style={task.isDone ? styleDoneTask : styleTask}>
                            <div>
                                {/*<input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(e) => onChangeTaskStatus(e, task.id)/*onChangeTaskStatus*!/
                                />*/}
                                <Checkbox color="secondary" checked={task.isDone} onChange={(e) => onChangeTaskStatus(e, task.id)}/>
                                <UniversalEditableSpan title={task.title} changeSpanTitle={(newTaskTitle: string) => {onChangeTaskTitle(newTaskTitle, task.id)}/*onChangeTaskTitle*/}/>
                            </div>
                            {/*<UniversalButton name={'x'} className={''} onClick={() => onRemoveTask(task.id)/*onRemoveTask*!//>*/}
                            <IconButton aria-label="delete" size="small" color="secondary" onClick={() => onRemoveTask(task.id)}><Delete fontSize="small"/></IconButton>
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
                    onClick={() => onChangeFilter('all')}>All
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onChangeFilter('active')}>Active
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={styleButton}
                    onClick={() => onChangeFilter('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}