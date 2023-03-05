import React, { useCallback, useEffect } from 'react'
import s from './ReduxTodolistList.module.css'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useCustomAppDispatch } from 'app/store'
import { AddItemForm } from 'common/components/AddItemForm'
import * as authSelectors from 'features/auth/selectors'
import * as todolistsSelectors from './selectors'
import { ReduxTodolist } from './ReduxTodolist'
import { createTodolistTC, getTodolistsTC } from './todolists-reducer'

export function ReduxTodolistList() {

  const dispatch = useCustomAppDispatch()
  const isLogin = useSelector(authSelectors.isLogin)
  const todolists = useSelector(todolistsSelectors.todolists)

  useEffect(() => {
    if (!isLogin) { return }
    dispatch(getTodolistsTC())
  }, [dispatch, isLogin])

  const createTodolist = useCallback(function (titleOfNewTodolist: string): void {
    dispatch(createTodolistTC(titleOfNewTodolist))
  }, [dispatch])

  if (!isLogin) {
    return <Navigate to='/login' />
  }

  return (
    <div className={s.container}>
      <div className={s.paper}>
        <span><b>Add new todolist</b></span>
        <AddItemForm what={'todolist name'} callback={createTodolist} />
      </div>
      <div className={s.todosContainer}>
        {todolists.map(tl => <ReduxTodolist key={tl.id} todolist={tl} />)}
      </div>
    </div>
  )
}