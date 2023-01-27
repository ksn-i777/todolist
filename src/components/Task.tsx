import React, { ChangeEvent, useCallback } from 'react'
import { UniversalEditableSpan } from './other/UniversalEditableSpan'
import { Delete } from '@mui/icons-material'
import { Checkbox, IconButton } from '@mui/material'
import { TaskStatus, TaskType } from '../api/api'
import { RequestStatusType } from '../store/app-reducer'

type TaskPropsType = {
    task: TaskType
    todolistID: string
    taskEntityStatus: RequestStatusType
    deleteTask(todolistID:string, taskID:string):void
    updateTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void
    updateTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void
}

export const Task = React.memo(function(props:TaskPropsType) {

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
            <Checkbox color="secondary" disabled={props.taskEntityStatus === 'loading'} checked={props.task.status === TaskStatus.Completed} onChange={(e) => onUpdateTaskStatus(props.task.id, e)}/>
            <UniversalEditableSpan disabled={props.taskEntityStatus === 'loading'} spanTitle={props.task.title} changeSpanTitle={(newSpanTitle: string) => {onUpdateTaskTitle(props.task.id, newSpanTitle)}}/>
            <IconButton disabled={props.taskEntityStatus === 'loading'} aria-label="delete" size="small" color="secondary" onClick={() => onDeleteTask(props.task.id)}><Delete fontSize="small"/></IconButton>
        </div>
    )
})