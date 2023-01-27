import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../components/Login'
import { AppBarComponent } from '../components/AppBarComponent'
import { ErrorSnackbar } from '../components/ErrorSnackBar'
import { TodolistList } from '../components/TodolistList'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, AppStateType } from '../store/store'
import { initializeAppTC } from '../store/app-reducer'
import { CircularProgress } from '@mui/material'

export function AppWithRedux() {

    const initialized = useSelector<AppStateType, boolean>(st => st.app.initialized)
    const dispatch = useDispatch<AppDispatchType>()
    
    useEffect(() => {
        dispatch(initializeAppTC())
    })

    if (!initialized) {
        return <div
            style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBarComponent/>
                <Routes>
                    <Route path='/' element={<TodolistList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<div style={{textAlign: 'center'}}><h1>404: PAGE NOT FOUND</h1></div>} />
                    <Route path='*' element={<Navigate to='/404'/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}