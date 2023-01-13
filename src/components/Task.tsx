import React, { ChangeEvent, useCallback } from 'react'
import { UniversalEditableSpan } from './other/UniversalEditableSpan'
import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import { TaskStatus, TaskType } from '../api/api'

type TaskPropsType = {
    task: TaskType
    todolistID: string
    deleteTask(todolistID:string, taskID:string):void
    updateTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void
    updateTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void
}

export const Task = React.memo(function(props:TaskPropsType) {
    console.log('task')

    const onDeleteTask = useCallback(function(taskID:string):void {
        props.deleteTask(props.todolistID, taskID);
    }, [props.deleteTask, props.todolistID])
    const onUpdateTaskTitle = useCallback(function(taskID:string, newTaskTitle:string):void {
        props.updateTaskTitle(props.todolistID, taskID, newTaskTitle)
    }, [props.updateTaskTitle, props.todolistID])
    const onUpdateTaskStatus = useCallback(function(taskID:string, e:ChangeEvent<HTMLInputElement>):void {
        props.updateTaskStatus(props.todolistID, taskID, e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New);
    }, [props.updateTaskStatus, props.todolistID])

    const styleTask = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
    const styleDoneTask = {
        opacity: '0.5',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'line-through',
        color: 'darkorchid',
    }

    return (
        <div style={props.task.status === TaskStatus.Completed ? styleDoneTask : styleTask}>
            <Checkbox color="secondary" checked={props.task.status === TaskStatus.Completed} onChange={(e) => onUpdateTaskStatus(props.task.id, e)}/>
            <UniversalEditableSpan spanTitle={props.task.title} changeSpanTitle={(newSpanTitle: string) => {onUpdateTaskTitle(props.task.id, newSpanTitle)}}/>
            <IconButton aria-label="delete" size="small" color="secondary" onClick={() => onDeleteTask(props.task.id)}><Delete fontSize="small"/></IconButton>
        </div>
    )
})