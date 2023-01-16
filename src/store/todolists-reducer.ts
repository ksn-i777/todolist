import { todolistsAPI, TodolistTypeFromResponse } from '../api/api';
import { AppDispatchType } from './store';

// constants
export const GET_TODOLISTS = 'GET-TODOLISTS'
export const CREATE_TODOLIST = 'CREATE-TODOLIST'
export const DELETE_TODOLIST = 'DELETE-TODOLIST'
export const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE'
export const UPDATE_TODOLIST_FILTER = 'UPDATE-TODOLIST-FILTER'

// reducer
export function todolistsReducer(todolists:Array<TodolistType> = [], action:TodolistActionsType):Array<TodolistType> {
    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, todolistFilter: 'all'}))
        case CREATE_TODOLIST:
            return [{...action.todolist, todolistFilter: 'all'}, ...todolists]
        case DELETE_TODOLIST:
            return todolists.filter(tl => tl.id !== action.id)
        case UPDATE_TODOLIST_TITLE:
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case UPDATE_TODOLIST_FILTER:
            return todolists.map(tl => tl.id === action.id ? {...tl, todolistFilter: action.filter} : tl)
        default:
            return todolists
    }
}

// actions
export const getTodolistsAC = (todolists:Array<TodolistTypeFromResponse>) => ({type: GET_TODOLISTS, todolists} as const)
export const createTodolistAC = (todolist:TodolistTypeFromResponse) => ({type: CREATE_TODOLIST, todolist} as const)
export const deleteTodolistAC = (id: string) => ({type: DELETE_TODOLIST, id} as const)
export const updateTodolistTitleAC = (id:string, title:string) => ({type: UPDATE_TODOLIST_TITLE, id, title} as const)
export const updateTodolistFilterAC = (id:string, filter:TodolistFilterValuesType) => ({type: UPDATE_TODOLIST_FILTER, id, filter} as const)

//thunks
export const getTodolistsTC = () => (dispatch: AppDispatchType) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(getTodolistsAC(res.data))
    })
}
export const createTodolistTC = (titleOfNewTodolist:string) => (dispatch: AppDispatchType) => {
    todolistsAPI.createTodolist(titleOfNewTodolist).then(res => {
        dispatch(createTodolistAC(res.data.data.item))
    })
}
export const deleteTodolistTC = (todolistID:string) => (dispatch: AppDispatchType) => {
    todolistsAPI.deleteTodolist(todolistID).then(res => {
        dispatch(deleteTodolistAC(todolistID))
    })
}
export const updateTodolistTitleTC = (todolistID:string, newTitle:string) => (dispatch: AppDispatchType) => {
    todolistsAPI.updateTodolistTitle(todolistID, newTitle).then(res => {
        dispatch(updateTodolistTitleAC(todolistID, newTitle))
    })
}
export const updateTodolistFilterTC = (todolistID:string, newTodolistFilter:TodolistFilterValuesType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistFilterAC(todolistID, newTodolistFilter))
}

// types
export type TodolistType = TodolistTypeFromResponse & {todolistFilter: TodolistFilterValuesType}
export type TodolistFilterValuesType = 'all' | 'active' | 'completed';
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type TodolistActionsType =
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType
| ReturnType<typeof updateTodolistTitleAC>
| ReturnType<typeof updateTodolistFilterAC>