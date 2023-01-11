import {applyMiddleware, combineReducers, createStore, AnyAction} from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'
import thunkMiddlewear, { ThunkDispatch } from 'redux-thunk';

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReduser, applyMiddleware(thunkMiddlewear))

export type RootStateType = ReturnType<typeof rootReduser>

export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>

//export type AppDispatch = typeof store.dispatch // понадобится, когда будет тулкит
