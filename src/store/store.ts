import {applyMiddleware, combineReducers, createStore} from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'
import thunkMiddlewear from 'redux-thunk';

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReduser, applyMiddleware(thunkMiddlewear))

export type RootStateType = ReturnType<typeof rootReduser>
export type AppDispatch = typeof store.dispatch

