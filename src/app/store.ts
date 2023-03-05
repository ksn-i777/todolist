import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import thunkMiddlewear from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'app/app-reducer'
import { authReducer } from 'features/auth/auth-reducer'
import { todolistsReducer } from 'features/todolists/todolists-reducer'
import { tasksReducer } from 'features/tasks/tasks-reducer'

const rootReduser = combineReducers({
  app: appReducer,
  auth: authReducer,
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
export const useCustomAppDispatch = useDispatch<AppDispatchType>

//@ts-ignore
window.store = store

/* ---------- REDUX ---------- */

//export const store = legacy_createStore(rootReduser, applyMiddleware(thunkMiddlewear))
//export type AppStateType = ReturnType<typeof rootReduser>
//export type AppActionsType = TodolistActionsType | TasksActionsType | AppReducerActionsType | AuthReducerActionsType
//export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>