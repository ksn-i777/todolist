import React, {ChangeEvent, useCallback} from 'react';
import '../App.css';
import {UniversalEditableSpan} from './UniversalEditableSpan';
import {Delete} from '@mui/icons-material';
import {Checkbox, IconButton} from '@mui/material';
import {TaskType} from '../AppWithRedux';

type TaskPropsType = {
    task: TaskType
    todolistID: string
    removeTask(todolistID:string, taskID:string):void
    changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void
    changeTaskStatus(todolistID:string, taskID:string, taskStatus:boolean):void
}

export const Task = React.memo(function(props:TaskPropsType) {
    console.log('task')

    const onRemoveTask = useCallback(function(taskID:string):void {
        props.removeTask(props.todolistID, taskID);
    }, [props.removeTask, props.todolistID])
    const onChangeTaskTitle = useCallback(function(taskID:string, newTaskTitle:string):void {
        props.changeTaskTitle(props.todolistID, taskID, newTaskTitle)
    }, [props.changeTaskTitle, props.todolistID])
    const onChangeTaskStatus = useCallback(function(taskID:string, e:ChangeEvent<HTMLInputElement>):void {
        props.changeTaskStatus(props.todolistID, taskID, e.currentTarget.checked);
    }, [props.changeTaskStatus, props.todolistID])

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
        <div style={props.task.taskIsDoneStatus ? styleDoneTask : styleTask}>
            <div>
                <Checkbox color="secondary" checked={props.task.taskIsDoneStatus} onChange={(e) => onChangeTaskStatus(props.task.taskId, e)}/>
                <UniversalEditableSpan spanTitle={props.task.taskTitle} changeSpanTitle={(newSpanTitle: string) => {onChangeTaskTitle(props.task.taskId, newSpanTitle)}}/>
            </div>
            <IconButton aria-label="delete" size="small" color="secondary" onClick={() => onRemoveTask(props.task.taskId)}><Delete fontSize="small"/></IconButton>
        </div>
    )
})