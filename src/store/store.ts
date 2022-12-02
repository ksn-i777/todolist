import { combineReducers, createStore } from 'redux'
import { todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

const rootReduser = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type RootStateType = ReturnType<typeof rootReduser>

export const store = createStore(rootReduser)