import { v1 } from 'uuid';
import { todolistsAPI, TodolistTypeFromResponse } from '../api/api';
import { AppDispatch } from './store';

export const GET_TODOLISTS = 'GET-TODOLISTS'
export const CREATE_TODOLIST = 'CREATE-TODOLIST'
export const DELETE_TODOLIST = 'DELETE-TODOLIST'
export const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE'
export const UPDATE_TODOLIST_FILTER = 'UPDATE-TODOLIST-FILTER'

export type TodolistFilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = TodolistTypeFromResponse & {
    todolistFilter: TodolistFilterValuesType,
};

export type GetTodolistsActionType = {
    type: typeof GET_TODOLISTS
    todolists: Array<TodolistTypeFromResponse>
}

export type CreateTodolistActionType = {
    type: typeof CREATE_TODOLIST
    todolist: TodolistTypeFromResponse
}
export type DeleteTodolistActionType = {
    type: typeof DELETE_TODOLIST
    todolistID: string
}
export type UpdateTodolistTitleActionType = {
    type: typeof UPDATE_TODOLIST_TITLE
    todolistID: string
    newTodolistTitle: string
}
export type UpdateTodolistFilterActionType = {
    type: typeof UPDATE_TODOLIST_FILTER
    todolistID: string
    newTodolistFilter: TodolistFilterValuesType
}

export type TodolistActionsType = GetTodolistsActionType
                        | CreateTodolistActionType
                        | DeleteTodolistActionType
                        | UpdateTodolistTitleActionType
                        | UpdateTodolistFilterActionType

export const todolistID1 = v1();
export const todolistID2 = v1();

export function todolistsReducer(todolists:Array<TodolistType> = [], action:TodolistActionsType):Array<TodolistType> {

    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, todolistFilter: 'all'}))
        case CREATE_TODOLIST:
            const newTodolist:TodolistType = {...action.todolist, todolistFilter: 'all'}
            return [newTodolist, ...todolists]
        case DELETE_TODOLIST:
            return todolists.filter(tl => tl.id !== action.todolistID)
        case UPDATE_TODOLIST_TITLE:
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTodolistTitle} : tl)
        case UPDATE_TODOLIST_FILTER:
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, todolistFilter: action.newTodolistFilter} : tl)
        default:
            return todolists
    }
}

export function getTodolistsAC(todolists:Array<TodolistTypeFromResponse>):GetTodolistsActionType {
    return {type: GET_TODOLISTS, todolists}
}
export function createTodolistAC(todolist:TodolistTypeFromResponse):CreateTodolistActionType {
    return {type: CREATE_TODOLIST, todolist}
}
export function deleteTodolistAC(todolistID: string):DeleteTodolistActionType {
    return {type: DELETE_TODOLIST, todolistID}
}
export function updateTodolistTitleAC(todolistID:string, newTodolistTitle:string):UpdateTodolistTitleActionType {
    return {type: UPDATE_TODOLIST_TITLE, todolistID, newTodolistTitle}
}
export function updateTodolistFilterAC(todolistID:string, newTodolistFilter:TodolistFilterValuesType):UpdateTodolistFilterActionType {
    return {type: UPDATE_TODOLIST_FILTER, todolistID, newTodolistFilter}
}

export const getTodolistsTC = () => (dispatch: AppDispatch) => {
    todolistsAPI.getTodolists().then((res) => {
        dispatch(getTodolistsAC(res.data))
    })
}
export const createTodolistTC = (titleOfNewTodolist:string) => (dispatch: AppDispatch) => {
    todolistsAPI.createTodolist(titleOfNewTodolist).then(res => {
        dispatch(createTodolistAC(res.data.data.item))
    })
}
export const deleteTodolistTC = (todolistID:string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTodolist(todolistID).then(res => {
        dispatch(deleteTodolistAC(todolistID))
    })
}
export const updateTodolistTitleTC = (todolistID:string, newTitle:string) => (dispatch: AppDispatch) => {
    todolistsAPI.updateTodolistTitle(todolistID, newTitle).then(res => {
        dispatch(updateTodolistTitleAC(todolistID, newTitle))
    })
}
export const updateTodolistFilterTC = (todolistID:string, newTodolistFilter:TodolistFilterValuesType) => (dispatch: AppDispatch) => {
    dispatch(updateTodolistFilterAC(todolistID, newTodolistFilter))
}