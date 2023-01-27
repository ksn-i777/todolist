import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { todolistsReducer, TodolistActionsType } from './todolists-reducer'
import { tasksReducer, TasksActionsType } from './tasks-reducer'
import thunkMiddlewear, { ThunkDispatch } from 'redux-thunk';
import { appReducer, AppReducerActionsType } from './app-reducer';
import { authReducer, AuthReducerActionsType } from './auth-reducer';

const rootReduser = combineReducers({
    auth: authReducer,
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReduser, applyMiddleware(thunkMiddlewear))

export type AppStateType = ReturnType<typeof rootReduser>

export type AppActionsType = TodolistActionsType | TasksActionsType | AppReducerActionsType | AuthReducerActionsType

export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>

//export type AppDispatch = typeof store.dispatch // понадобится, когда будет тулкит