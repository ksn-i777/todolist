import React, { ChangeEvent, FC, useCallback } from 'react'
import s from './ReduxTask.module.css'
import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { EditableSpan } from 'common/components/EditableSpan'
import { useCustomAppDispatch } from 'app/store'
import { deleteTaskTC, DomainTaskType, updateTaskStatusTC, updateTaskTitleTC } from './tasks-reducer'
import { TaskStatus } from './tasks-api'

type TaskPropsType = {
  todolistID: string
  task: DomainTaskType
}

export const ReduxTask: FC<TaskPropsType> = React.memo(({ todolistID, task }) => {

  const dispatch = useCustomAppDispatch()

  const updateTaskStatus = useCallback((taskID: string, e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTaskStatusTC({ todolistID, taskID, taskStatus: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }));
  }, [dispatch, todolistID])

  const updateTaskTitle = useCallback((taskID: string, newTaskTitle: string) => {
    dispatch(updateTaskTitleTC({ todolistID, taskID, taskTitle: newTaskTitle }))
  }, [dispatch, todolistID])

  const deleteTask = useCallback((taskID: string) => {
    dispatch(deleteTaskTC({ todolistID, taskID }))
  }, [dispatch, todolistID])

  return (
    <div className={task.status === TaskStatus.Completed ? s.doneTaskContainer : s.taskContainer}>
      <input
        type={'checkbox'}
        className={s.checkbox}
        disabled={task.entityStatus === 'loading'}
        checked={task.status === TaskStatus.Completed}
        onChange={(e) => updateTaskStatus(task.id, e)}
      />
      <EditableSpan
        disabled={task.entityStatus === 'loading'}
        spanTitle={task.title}
        changeSpanTitle={(newSpanTitle: string) => { updateTaskTitle(task.id, newSpanTitle) }}
      />
      <IconButton
        aria-label="delete"
        size="small"
        color="secondary"
        disabled={task.entityStatus === 'loading'}
        onClick={() => deleteTask(task.id)}
      >
        <Delete fontSize="small" />
      </IconButton>
    </div>
  )
})