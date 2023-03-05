import {tasksReducer, TasksType} from '../features/tasks/tasks-reducer';
import {createTodolistAC, todolistsReducer, TodolistType} from '../features/todolists/todolists-reducer';

test('ids should be equals', () => {
    const startObjTasks:TasksType = {}
    const startTodolists:Array<TodolistType> = []
    const newTodolist = {id: '111', title: 'New Todolist', todolistFilter: 'all', addedDate: '', order: 0}
    const action = createTodolistAC({todolist: newTodolist})
    const endObjTasks = tasksReducer(startObjTasks, action)
    const endTodolists = todolistsReducer(startTodolists, action)
    const keys = Object.keys(endObjTasks)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolists[0].id
    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})