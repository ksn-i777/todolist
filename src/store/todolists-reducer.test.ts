import {
    todolistsReducer,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} from './todolists-reducer'
import { v1 } from 'uuid'
import {TodolistFilterValuesType, TodolistType} from '../App';

let todolistID1:string
let todolistID2:string
let startTodolists:Array<TodolistType>

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    startTodolists = [
        {todolistId: todolistID1, todolistTitle: 'What to learn', todolistFilter: 'all'},
        {todolistId: todolistID2, todolistTitle: 'What to buy', todolistFilter: 'all'},
    ]
})

test('correct todolist should be removed', () => {

    const endTodolists = todolistsReducer(startTodolists, removeTodolistAC(todolistID1))

    expect(endTodolists.length).toBe(1)
    expect(endTodolists[0].todolistId).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    const titleOfNewTodolist = 'New Todolist'

    const endTodolists = todolistsReducer(startTodolists, addTodolistAC(titleOfNewTodolist))

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].todolistTitle).toBe(titleOfNewTodolist)
    expect(endTodolists[0].todolistFilter).toBe('all')
})

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todolist Title'

    const endTodolists = todolistsReducer(startTodolists, changeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endTodolists[0].todolistTitle).toBe('What to learn')
    expect(endTodolists[1].todolistTitle).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const newTodolistFilter:TodolistFilterValuesType = 'completed'

    const endState = todolistsReducer(startTodolists, changeTodolistFilterAC(todolistID2, newTodolistFilter))

    expect(endState[0].todolistFilter).toBe('all')
    expect(endState[1].todolistFilter).toBe(newTodolistFilter)
})

