import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import {RootStateType} from '../../store/store';
import {tasksReducer} from '../../store/tasks-reducer';
import {todolistsReducer} from '../../store/todolists-reducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {todolistId: 'todolistId1', todolistTitle: 'What to learn', todolistFilter: 'all'},
        {todolistId: 'todolistId2', todolistTitle: 'What to buy', todolistFilter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {taskId: v1(), taskTitle: 'HTML&CSS', taskIsDoneStatus: true},
            {taskId: v1(), taskTitle: 'JS', taskIsDoneStatus: true}
        ],
        ['todolistId2']: [
            {taskId: v1(), taskTitle: 'Milk', taskIsDoneStatus: true},
            {taskId: v1(), taskTitle: 'React Book', taskIsDoneStatus: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>
