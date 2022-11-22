import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    titleOfNewTodolist: string
    todolistID: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string
    newTodolistTitle: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string
    newTodolistFilter: FilterValuesType
}
type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export function todolistsReducer(todolists:Array<TodolistType>, action:ActionsType):Array<TodolistType> {

    let copyTodolists:Array<TodolistType> = []

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            copyTodolists = todolists.filter(tl => tl.id !== action.todolistID)
            return copyTodolists
        case 'ADD-TODOLIST':
            const newTodolist:TodolistType = {id: action.todolistID, title: action.titleOfNewTodolist, filter: 'all'}
            copyTodolists = [newTodolist, ...todolists]
            return copyTodolists
        case 'CHANGE-TODOLIST-TITLE':
            copyTodolists = todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTodolistTitle} : tl)
            return copyTodolists
        case 'CHANGE-TODOLIST-FILTER':
            copyTodolists = todolists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.newTodolistFilter} : tl)
            return copyTodolists
        default:
            throw new Error("I don't understand this type")
    }
}

export function removeTodolistAC(todolistID: string):RemoveTodolistActionType {
    return {type: 'REMOVE-TODOLIST', todolistID: todolistID}
}
export function addTodolistAC(titleOfNewTodolist:string):AddTodolistActionType {
    return {type: 'ADD-TODOLIST', titleOfNewTodolist: titleOfNewTodolist, todolistID: v1()}
}
export function changeTodolistTitleAC(todolistID:string, newTodolistTitle:string):ChangeTodolistTitleActionType {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID: todolistID, newTodolistTitle: newTodolistTitle}
}
export function changeTodolistFilterAC(todolistID:string, newTodolistFilter:FilterValuesType):ChangeTodolistFilterActionType {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID: todolistID, newTodolistFilter: newTodolistFilter}
}