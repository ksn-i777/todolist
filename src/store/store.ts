import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistsReducer, TodolistActionsType } from './todolists-reducer'
import { tasksReducer, TasksActionsType } from './tasks-reducer'
import thunkMiddlewear, { ThunkDispatch } from 'redux-thunk';

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReduser, applyMiddleware(thunkMiddlewear))

export type AppStateType = ReturnType<typeof rootReduser>

export type AppActionsType = TodolistActionsType | TasksActionsType

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>

//export type AppDispatch = typeof store.dispatch // понадобится, когда будет тулкит