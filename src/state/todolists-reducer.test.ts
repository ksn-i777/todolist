import {
    todolistsReducer,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startTodolists:Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endTodolists = todolistsReducer(startTodolists, removeTodolistAC(todolistID1))

    expect(endTodolists.length).toBe(1)
    expect(endTodolists[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const titleOfNewTodolist = 'New Todolist'

    const startTodolists:Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endTodolists = todolistsReducer(startTodolists, addTodolistAC(titleOfNewTodolist))

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].title).toBe(titleOfNewTodolist)
    expect(endTodolists[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const newTodolistTitle = 'New Todolist Title'

    const startTodolists:Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endTodolists = todolistsReducer(startTodolists, changeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endTodolists[0].title).toBe('What to learn')
    expect(endTodolists[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const newTodolistFilter:FilterValuesType = 'completed'

    const startTodolists:Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startTodolists, changeTodolistFilterAC(todolistID2, newTodolistFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})

