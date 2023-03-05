import React, { useEffect } from 'react'
import s from './App.module.css'
import { useSelector } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { AppBarComponent, ErrorSnackbar } from 'common/components'
import * as appSelectors from 'app/selectors'
import { useCustomAppDispatch } from 'app/store'
import { initializeAppTC } from 'app/app-reducer'
import { Auth } from 'features/auth/Auth'
import { ReduxTodolistList } from 'features/todolists/ReduxTodolistList'

export function AppRedux() {

  const dispatch = useCustomAppDispatch()
  const initialized = useSelector(appSelectors.initialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  })

  if (!initialized) {
    return <div
      style={{ position: 'fixed', top: '40%', textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </div>
  }

  return (
    <HashRouter>
      <div className={s.app}>
        <ErrorSnackbar />
        <AppBarComponent />
        <Routes>
          <Route path='/' element={<ReduxTodolistList />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/404' element={<div style={{ textAlign: 'center' }}><h1>404: PAGE NOT FOUND</h1></div>} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </div>
    </HashRouter>
  )
}