import {v1} from 'uuid';
import {TodolistFilterValuesType, TodolistType} from '../AppWithReducers';

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type AddTodolistActionType = {
    type: typeof ADD_TODOLIST
    todolistID: string
    titleOfNewTodolist: string
}
export type RemoveTodolistActionType = {
    type: typeof REMOVE_TODOLIST
    todolistID: string
}
type ChangeTodolistTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todolistID: string
    newTodolistTitle: string
}
type ChangeTodolistFilterActionType = {
    type: typeof CHANGE_TODOLIST_FILTER
    todolistID: string
    newTodolistFilter: TodolistFilterValuesType
}
type ActionsType = AddTodolistActionType
| RemoveTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType

export const todolistID1 = v1();
export const todolistID2 = v1();

const initializationState:Array<TodolistType> = [
    {todolistId: todolistID1, todolistTitle: 'What to learn', todolistFilter: 'all'},
]

export function todolistsReducer(todolists:Array<TodolistType> = initializationState, action:ActionsType):Array<TodolistType> {

    let copyTodolists:Array<TodolistType> = []

    switch (action.type) {
        case ADD_TODOLIST:
            const newTodolist:TodolistType = {todolistId: action.todolistID, todolistTitle: action.titleOfNewTodolist, todolistFilter: 'all'}
            copyTodolists = [newTodolist, ...todolists]
            return copyTodolists
        case REMOVE_TODOLIST:
            copyTodolists = todolists.filter(tl => tl.todolistId !== action.todolistID)
            return copyTodolists
        case CHANGE_TODOLIST_TITLE:
            copyTodolists = todolists.map(tl => tl.todolistId === action.todolistID ? {...tl, todolistTitle: action.newTodolistTitle} : tl)
            return copyTodolists
        case CHANGE_TODOLIST_FILTER:
            copyTodolists = todolists.map(tl => tl.todolistId === action.todolistID ? {...tl, todolistFilter: action.newTodolistFilter} : tl)
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