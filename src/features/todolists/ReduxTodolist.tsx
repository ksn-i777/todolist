import React, { FC, useCallback, useEffect } from 'react'
import s from './ReduxTodolist.module.css'
import { useSelector } from 'react-redux'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { AddItemForm } from 'common/components/AddItemForm'
import { EditableSpan } from 'common/components/EditableSpan'
import { useCustomAppDispatch } from 'app/store'
import { deleteTodolistTC, TodolistFilterValuesType, TodolistType, updateTodolistFilterAC, updateTodolistTitleTC } from 'features/todolists/todolists-reducer'
import { ReduxTask } from 'features/tasks/ReduxTask'
import { createTaskTC, getTasksTC } from 'features/tasks/tasks-reducer'
import * as taskSelectors from 'features/tasks/selectors'
import { TaskStatus } from 'features/tasks/tasks-api'

type TodolistPropsType = {
  todolist: TodolistType
}

export const ReduxTodolist: FC<TodolistPropsType> = React.memo(({ todolist }) => {

  const dispatch = useCustomAppDispatch()
  const tasks = (useSelector(taskSelectors.tasks))[todolist.id]

  useEffect(() => {
    dispatch(getTasksTC(todolist.id))
  }, [dispatch, todolist.id])

  const deleteTodolist = useCallback(() => {
    dispatch(deleteTodolistTC(todolist.id))
  }, [dispatch, todolist.id])

  const updateTodolistTitle = useCallback((newTodolistTitle: string) => {
    dispatch(updateTodolistTitleTC({ todolistID: todolist.id, newTitle: newTodolistTitle }))
  }, [dispatch, todolist.id])

  const updateTodolistFilter = useCallback((newTodolistFilter: TodolistFilterValuesType) => {
    dispatch(updateTodolistFilterAC({ id: todolist.id, filter: newTodolistFilter }))
  }, [dispatch, todolist.id])

  const createTask = useCallback((titleOfNewTask: string) => {
    dispatch(createTaskTC({ todolistID: todolist.id, titleOfNewTask: titleOfNewTask }));
  }, [dispatch, todolist.id])

  let filteredTasksByFilter = tasks

  if (todolist.todolistFilter === 'active') {
    filteredTasksByFilter = tasks.filter(task => task.status === TaskStatus.New);
  }
  if (todolist.todolistFilter === 'completed') {
    filteredTasksByFilter = tasks.filter(task => task.status === TaskStatus.Completed);
  }

  const styleButton = {
    maxHeight: '25px',
    minWidth: '0',
    border: '1px solid',
    margin: '0',
    fontSize: '14px',
  }
  const styleActiveButton = {
    maxHeight: '25px',
    minWidth: '0',
    border: '1px solid darkorchid',
    margin: '0',
    fontSize: '14px',
    color: 'white',
    backgroundColor: 'darkorchid',
  }

  return (
    <div className={s.todolistContainer}>
      <div className={s.paper}>
        <div className={s.title}>
          <b>
            <EditableSpan
              disabled={todolist.entityStatus === 'loading'}
              spanTitle={todolist.title}
              changeSpanTitle={updateTodolistTitle}
            />
          </b>
          <IconButton
            disabled={todolist.entityStatus === 'loading'}
            aria-label="delete"
            size="small"
            color="secondary"
            onClick={deleteTodolist}><Delete fontSize="small" />
          </IconButton>
        </div>

        <AddItemForm what={'task title'} disabled={todolist.entityStatus === 'loading'} callback={createTask} />

        {tasks.length === 0
          ? <div className={s.warning}>Todolist is empty. Please add task</div>
          :
          <>
            {filteredTasksByFilter.length === 0
              ? <div className={s.warning}>No {todolist.todolistFilter} tasks</div>
              : filteredTasksByFilter.map(task => <ReduxTask key={task.id} todolistID={todolist.id} task={task} />)
            }

            <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="secondary"
                style={todolist.todolistFilter === 'all' ? styleActiveButton : styleButton}
                onClick={() => updateTodolistFilter('all')}
              >All</Button>

              <Button
                variant="outlined"
                color="secondary"
                style={todolist.todolistFilter === 'active' ? styleActiveButton : styleButton}
                onClick={() => updateTodolistFilter('active')}
              >Active</Button>

              <Button
                variant="outlined"
                color="secondary"
                style={todolist.todolistFilter === 'completed' ? styleActiveButton : styleButton}
                onClick={() => updateTodolistFilter('completed')}
              >Completed</Button>
            </div>
          </>
        }
      </div>
    </div>
  )
})