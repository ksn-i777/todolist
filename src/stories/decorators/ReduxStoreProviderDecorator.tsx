import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { v1 } from 'uuid'
import {AppStateType} from '../../store/store';
import {tasksReducer} from '../../store/tasks-reducer';
import {todolistsReducer} from '../../store/todolists-reducer';
import {TaskPriority, TaskStatus} from '../../api/api';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', todolistFilter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', todolistFilter: 'all', addedDate: '', order: 0},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'JS', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID1', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'React Book', status: TaskStatus.Completed, completed: true, todoListId: 'todolistID2', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>
