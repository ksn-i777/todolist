import {createTaskAC, updateTaskStatusAC, updateTaskTitleAC, deleteTaskAC, tasksReducer, TasksType,} from '../store/tasks-reducer'
import {deleteTodolistAC} from '../store/todolists-reducer';
import {TaskPriority, TaskStatus} from '../api/api';

let startObjTasks:TasksType

beforeEach(() => {
    startObjTasks = {
        'todolistID1': [
            {id: '1', title: 'CSS', status: TaskStatus.New, completed: false, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatus.New, completed: false, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ],
        'todolistID2': [
            {id: '1', title: 'bread', status: TaskStatus.New, completed: false, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '2', title: 'milk', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatus.New, completed: false, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAC('todolistID2', '2')
    const endObjTasks = tasksReducer(startObjTasks, action)
    expect(endObjTasks).toEqual({
        'todolistID1': [
            {id: '1', title: 'CSS', status: TaskStatus.New, completed: false, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '2', title: 'JS', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '3', title: 'React', status: TaskStatus.New, completed: false, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ],
        'todolistID2': [
            {id: '1', title: 'bread', status: TaskStatus.New, completed: false, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: '3', title: 'tea', status: TaskStatus.New, completed: false, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const task = {id: '4', title: 'juce', status: TaskStatus.New, completed: true, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''}
    const action = createTaskAC('todolistID2', task)
    const endObjTasks = tasksReducer(startObjTasks, action)
    expect(endObjTasks['todolistID1'].length).toBe(3)
    expect(endObjTasks['todolistID2'].length).toBe(4)
    expect(endObjTasks['todolistID2'][0].id).toBeDefined()
    expect(endObjTasks['todolistID2'][0].title).toBe('juce')
    expect(endObjTasks['todolistID2'][0].status).toBe(TaskStatus.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskStatusAC('todolistID2', '2', TaskStatus.New)
    const endObjTasks = tasksReducer(startObjTasks, action)
    expect(endObjTasks['todolistID1'][1].status).toBe(TaskStatus.Completed)
    expect(endObjTasks['todolistID2'][1].status).toBe(TaskStatus.New)
})

test('title of specified task should be changed', () => {
    const action = updateTaskTitleAC('todolistID2', '2', 'beer')
    const endObjTasks = tasksReducer(startObjTasks, action)
    expect(endObjTasks['todolistID1'][1].title).toBe('JS')
    expect(endObjTasks['todolistID2'][1].title).toBe('beer')
})

test('property with todolistId should be deleted', () => {
    const action = deleteTodolistAC('todolistID2')
    const endObjTasks = tasksReducer(startObjTasks, action)
    const keys = Object.keys(endObjTasks)
    expect(keys.length).toBe(1)
    expect(endObjTasks['todolistID2']).not.toBeDefined()
})