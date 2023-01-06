import {v1} from 'uuid';
import {TodolistTypeFromResponse} from '../api/api';

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type TodolistFilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = TodolistTypeFromResponse & {
    todolistFilter: TodolistFilterValuesType,
};

export type AddTodolistActionType = {
    type: typeof ADD_TODOLIST
    todolistID: string
    titleOfNewTodolist: string
}
export type RemoveTodolistActionType = {
    type: typeof REMOVE_TODOLIST
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todolistID: string
    newTodolistTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: typeof CHANGE_TODOLIST_FILTER
    todolistID: string
    newTodolistFilter: TodolistFilterValuesType
}
type TodolistActionsType = AddTodolistActionType
| RemoveTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType

export const todolistID1 = v1();
export const todolistID2 = v1();

const initializationState:Array<TodolistType> = [
    {id: todolistID1, title: 'What to learn', todolistFilter: 'all', addedDate: '', order: 0}
]

export function todolistsReducer(todolists:Array<TodolistType> = initializationState, action:TodolistActionsType):Array<TodolistType> {

    let copyTodolists:Array<TodolistType> = []

    switch (action.type) {
        case ADD_TODOLIST:
            const newTodolist:TodolistType = {id: action.todolistID, title: action.titleOfNewTodolist, todolistFilter: 'all', addedDate: '', order: 0}
            copyTodolists = [newTodolist, ...todolists]
            return copyTodolists
        case REMOVE_TODOLIST:
            copyTodolists = todolists.filter(tl => tl.id !== action.todolistID)
            return copyTodolists
        case CHANGE_TODOLIST_TITLE:
            copyTodolists = todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTodolistTitle} : tl)
            return copyTodolists
        case CHANGE_TODOLIST_FILTER:
            copyTodolists = todolists.map(tl => tl.id === action.todolistID ? {...tl, todolistFilter: action.newTodolistFilter} : tl)
            return copyTodolists
        default:
            return todolists
    }
}

export function addTodolistAC(titleOfNewTodolist:string):AddTodolistActionType {
    return {type: ADD_TODOLIST, todolistID: v1(), titleOfNewTodolist}
}
export function removeTodolistAC(todolistID: string):RemoveTodolistActionType {
    return {type: REMOVE_TODOLIST, todolistID}
}
export function changeTodolistTitleAC(todolistID:string, newTodolistTitle:string):ChangeTodolistTitleActionType {
    return {type: CHANGE_TODOLIST_TITLE, todolistID, newTodolistTitle}
}
export function changeTodolistFilterAC(todolistID:string, newTodolistFilter:TodolistFilterValuesType):ChangeTodolistFilterActionType {
    return {type: CHANGE_TODOLIST_FILTER, todolistID, newTodolistFilter}
}