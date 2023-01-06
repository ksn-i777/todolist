import {tasksReducer, TasksType} from './tasks-reducer';
import {addTodolistAC, todolistsReducer, TodolistType} from './todolists-reducer';

test('ids should be equals', () => {
    const startObjTasks:TasksType = {}
    const startTodolists:Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endObjTasks = tasksReducer(startObjTasks, action)
    const endTodolists = todolistsReducer(startTodolists, action)

    const keys = Object.keys(endObjTasks)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolists[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})
