import {
    tasksReducer,
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
} from './tasks-reducer'
import {TasksType} from '../App';
import {removeTodolistAC} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
    const startObjTasks:TasksType = {
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTaskAC('todolistID2', '2')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks).toEqual({
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startObjTasks:TasksType = {
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('todolistID2', 'juce')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'].length).toBe(3)
    expect(endObjTasks['todolistID2'].length).toBe(4)
    expect(endObjTasks['todolistID2'][0].id).toBeDefined()
    expect(endObjTasks['todolistID2'][0].title).toBe('juce')
    expect(endObjTasks['todolistID2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startObjTasks:TasksType = {
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('todolistID2', '2', false)

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'][1].isDone).toBe(true)
    expect(endObjTasks['todolistID2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startObjTasks:TasksType = {
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = changeTaskTitleAC('todolistID2', '2', 'beer')

    const endObjTasks = tasksReducer(startObjTasks, action)

    expect(endObjTasks['todolistID1'][1].title).toBe('JS')
    expect(endObjTasks['todolistID2'][1].title).toBe('beer')
})

test('property with todolistId should be deleted', () => {
    const startObjTasks:TasksType = {
        'todolistID1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistID2')

    const endObjTasks = tasksReducer(startObjTasks, action)


    const keys = Object.keys(endObjTasks)

    expect(keys.length).toBe(1)
    expect(endObjTasks['todolistID2']).not.toBeDefined()
})
