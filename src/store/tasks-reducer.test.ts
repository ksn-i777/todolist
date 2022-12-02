import {
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
} from './tasks-reducer'
import {TasksType} from '../App';
import {removeTodolistAC} from './todolists-reducer';

let startObjTasks:TasksType

beforeEach(() => {
    startObjTasks = {
        'todolistID1': [
            {taskId: '1', taskTitle: 'CSS', taskIsDoneStatus: false},
            {taskId: '2', taskTitle: 'JS', taskIsDoneStatus: true},
            {taskId: '3', taskTitle: 'React', taskIsDoneStatus: false}
        ],
        'todolistID2': [
            {taskId: '1', taskTitle: 'bread', taskIsDoneStatus: false},
            {taskId: '2', taskTitle: 'milk', taskIsDoneStatus: true},
            {taskId: '3', taskTitle: 'tea', taskIsDoneStatus: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistID2', '2')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks).toEqual({
        'todolistID1': [
            {taskId: '1', taskTitle: 'CSS', taskIsDoneStatus: false},
            {taskId: '2', taskTitle: 'JS', taskIsDoneStatus: true},
            {taskId: '3', taskTitle: 'React', taskIsDoneStatus: false}
        ],
        'todolistID2': [
            {taskId: '1', taskTitle: 'bread', taskIsDoneStatus: false},
            {taskId: '3', taskTitle: 'tea', taskIsDoneStatus: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('todolistID2', 'juce')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'].length).toBe(3)
    expect(endObjTasks['todolistID2'].length).toBe(4)
    expect(endObjTasks['todolistID2'][0].taskId).toBeDefined()
    expect(endObjTasks['todolistID2'][0].taskTitle).toBe('juce')
    expect(endObjTasks['todolistID2'][0].taskIsDoneStatus).toBe(false)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistID2', '2', false)

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'][1].taskIsDoneStatus).toBe(true)
    expect(endObjTasks['todolistID2'][1].taskIsDoneStatus).toBe(false)
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('todolistID2', '2', 'beer')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'][1].taskTitle).toBe('JS')
    expect(endObjTasks['todolistID2'][1].taskTitle).toBe('beer')
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistID2')

    const endObjTasks = tasksReducer(startObjTasks, action)

    const keys = Object.keys(endObjTasks)

    expect(keys.length).toBe(1)
    expect(endObjTasks['todolistID2']).not.toBeDefined()
})
