import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddlewear, { ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

const rootReduser = combineReducers({
    auth: authReducer,
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})

/* ---------- REDUX TOOLKIT ---------- */

export const store = configureStore({
    reducer: rootReduser,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddlewear)
})
export type AppStateType = ReturnType<typeof rootReduser>
export type AppDispatchType = typeof store.dispatch

/* ---------- REDUX ---------- */

//export const store = legacy_createStore(rootReduser, applyMiddleware(thunkMiddlewear))
//export type AppStateType = ReturnType<typeof rootReduser>
//export type AppActionsType = TodolistActionsType | TasksActionsType | AppReducerActionsType | AuthReducerActionsType
//export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>