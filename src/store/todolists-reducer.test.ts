import {
    todolistsReducer,
    deleteTodolistAC,
    createTodolistAC,
    updateTodolistTitleAC,
    updateTodolistFilterAC, TodolistType, TodolistFilterValuesType,
} from './todolists-reducer'
import { v1 } from 'uuid'

let todolistID1:string
let todolistID2:string
let startTodolists:Array<TodolistType>

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    startTodolists = [
        {id: todolistID1, title: 'What to learn', todolistFilter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', todolistFilter: 'all', addedDate: '', order: 0},
    ]
})

test('correct todolist should be removed', () => {

    const endTodolists = todolistsReducer(startTodolists, deleteTodolistAC(todolistID1))

    expect(endTodolists.length).toBe(1)
    expect(endTodolists[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    const titleOfNewTodolist = 'New Todolist'

    const endTodolists = todolistsReducer(startTodolists, createTodolistAC(titleOfNewTodolist))

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].title).toBe(titleOfNewTodolist)
    expect(endTodolists[0].todolistFilter).toBe('all')
})

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist Title'

    const endTodolists = todolistsReducer(startTodolists, updateTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endTodolists[0].title).toBe('What to learn')
    expect(endTodolists[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const newTodolistFilter:TodolistFilterValuesType = 'completed'

    const endState = todolistsReducer(startTodolists, updateTodolistFilterAC(todolistID2, newTodolistFilter))

    expect(endState[0].todolistFilter).toBe('all')
    expect(endState[1].todolistFilter).toBe(newTodolistFilter)
})

