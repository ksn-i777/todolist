import { tasksAPI, TaskStatus, TaskType } from '../api/api'
import { AppStateType, AppDispatchType } from './store'
import { RequestStatusType, setAppErrorAC, setAppRequestStatusAC } from './app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodolistsAC, createTodolistAC, deleteTodolistAC } from './todolists-reducer'

/* ---------- REDUX TOOLKIT ---------- */

const initialState = {} as TasksType

//slice
const slice = createSlice({
    name: "TASKS",
    initialState: initialState,
    reducers: {
        getTasksAC: (draftState, action: PayloadAction<{todolistID:string, tasks: Array<TaskType>}>) => {
            draftState[action.payload.todolistID] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
        },
        createTaskAC: (draftState, action: PayloadAction<{todolistID:string, task:TaskType}>) => {
            draftState[action.payload.todolistID].unshift({...action.payload.task, entityStatus: 'idle'})
        },
        deleteTaskAC: (draftState, action: PayloadAction<{todolistID:string, taskID:string}>) => {
            const index = draftState[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            if(index > -1) {draftState[action.payload.todolistID].splice(index, 1)}
        },
        updateTaskTitleAC: (draftState, action: PayloadAction<{todolistID:string, taskID:string, taskTitle:string}>) => {
            const index = draftState[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            if(index > -1) {draftState[action.payload.todolistID][index].title = action.payload.taskTitle}
        },
        updateTaskStatusAC: (draftState, action: PayloadAction<{todolistID:string, taskID:string, taskStatus:TaskStatus}>) => {
            const index = draftState[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            if(index > -1) {draftState[action.payload.todolistID][index].status = action.payload.taskStatus}
        },
        updateTaskEntityStatusAC: (draftState, action: PayloadAction<{todolistID:string, taskID:string, entityStatus:RequestStatusType}>) => {
            const index = draftState[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            if(index > -1) {draftState[action.payload.todolistID][index].entityStatus = action.payload.entityStatus}
        },
        logoutTasksClearAC: (draftState, action: PayloadAction) => {
            return {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {state[tl.id] = []})
        });
        builder.addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
    }
})

//reducer
export const tasksReducer = slice.reducer

//actions
export const {
    getTasksAC,
    createTaskAC,
    deleteTaskAC,
    updateTaskTitleAC,
    updateTaskStatusAC,
    updateTaskEntityStatusAC,
    logoutTasksClearAC
} = slice.actions

//thunks
export const getTasksTC = (todolistID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    tasksAPI.getTasks(todolistID)
        .then(res => {
            if(!res.data.error) {
                dispatch(getTasksAC({todolistID: todolistID, tasks: res.data.items}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: res.data.error}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
        })
}
export const createTaskTC = (todolistID:string, titleOfNewTask:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    tasksAPI.createTask(todolistID, titleOfNewTask)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC({todolistID: todolistID, task: res.data.data.item}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
        })
}
export const deleteTaskTC = (todolistID:string, taskID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTaskAC({todolistID: todolistID, taskID: taskID}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
        })
}
export const updateTaskTitleTC = (todolistID:string, taskID:string, taskTitle:string) =>
(dispatch: AppDispatchType, getState: () => AppStateType) => {
    let updatedTask:TaskType
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        updatedTask = {
            addedDate: taskFromCurrentTodolist.addedDate,
            completed: taskFromCurrentTodolist.completed,
            deadline: taskFromCurrentTodolist.deadline,
            description: taskFromCurrentTodolist.description,
            id: taskFromCurrentTodolist.id,
            order: taskFromCurrentTodolist.order,
            priority: taskFromCurrentTodolist.priority,
            startDate: taskFromCurrentTodolist.startDate,
            status: taskFromCurrentTodolist.status,
            title: taskTitle,
            todoListId: taskFromCurrentTodolist.todoListId
        }
    } else {return}
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.updateTask(todolistID, taskID, updatedTask)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTaskTitleAC({todolistID: todolistID, taskID: taskID, taskTitle: taskTitle}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'succeeded'))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            dispatch(updateTaskEntityStatusAC({todolistID: todolistID, taskID: taskID, entityStatus: 'failed'}))
        })
}
export const updateTaskStatusTC = (todolistID:string, taskID:string, taskStatus:TaskStatus) =>
(dispatch: AppDispatchType, getState: () => AppStateType) => {
    let updatedTask:TaskType
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        updatedTask = {
            addedDate: taskFromCurrentTodolist.addedDate,
            completed: taskFromCurrentTodolist.completed,
            deadline: taskFromCurrentTodolist.deadline,
            description: taskFromCurrentTodolist.description,
            id: taskFromCurrentTodolist.id,
            order: taskFromCurrentTodolist.order,
            priority: taskFromCurrentTodolist.priority,
            startDate: taskFromCurrentTodolist.startDate,
            status: taskStatus,
            title: taskFromCurrentTodolist.title,
            todoListId: taskFromCurrentTodolist.todoListId
        }
    } else {return}
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.updateTask(todolistID, taskID, updatedTask)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTaskStatusAC({todolistID: todolistID, taskID: taskID, taskStatus: taskStatus}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'succeeded'))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
        })
}
export const updateTaskEntityStatusTC = (todolistID:string, taskID:string, entityStatus:RequestStatusType) => (dispatch: AppDispatchType) => {
    dispatch(updateTaskEntityStatusAC({todolistID: todolistID, taskID: taskID, entityStatus: entityStatus}))
}
export const logoutTasksClearTC = () => (dispatch: AppDispatchType) => {
    dispatch(logoutTasksClearAC())
}

//types
export type DomainTaskType = TaskType & {entityStatus:RequestStatusType}
export type TasksType = {
    [key: string]: Array<DomainTaskType>
}



/* ---------- REDUX ---------- */
/* 
//constants
export const GET_TASKS = 'GET_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE'
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'
export const UPDATE_TASK_ENTITY_STATUS = 'UPDATE_TASK_ENTITY_STATUS'
export const LOGOUT_TASKS_CLEAR = 'LOGOUT_TASKS_CLEAR'

//reducer
export function tasksReducer(objTasks:TasksType = {}, action:TasksActionsType):TasksType {
    switch (action.type) {
        case GET_TASKS:
            return {...objTasks, [action.todolistID]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case CREATE_TASK:
            return {...objTasks, [action.todolistID]: [{...action.task, entityStatus: 'idle'}, ...objTasks[action.todolistID]]}
        case DELETE_TASK:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case UPDATE_TASK_TITLE:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID  ? {...t, title: action.taskTitle} : t)}
        case UPDATE_TASK_STATUS:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.taskStatus} : t)}
        case UPDATE_TASK_ENTITY_STATUS:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, entityStatus: action.entityStatus} : t)}
        case CREATE_TODOLIST:
            return {...objTasks, [action.todolist.id]: []}
        case GET_TODOLISTS:
            let copyObjTasks:TasksType = {...objTasks}
            action.todolists.forEach(tl => {copyObjTasks[tl.id] = []})
            return copyObjTasks
        case DELETE_TODOLIST:
            let copyObjTasks2 = {...objTasks}
            delete copyObjTasks2[action.id]
            return copyObjTasks2
        case LOGOUT_TASKS_CLEAR:
            return {}
        default:
            return objTasks
    }
}

//actions
export const getTasksAC = (todolistID:string, tasks: Array<TaskType>) => ({type: GET_TASKS, todolistID, tasks} as const)
export const createTaskAC = (todolistID:string, task:TaskType) => ({type: CREATE_TASK, todolistID, task} as const)
export const deleteTaskAC = (todolistID:string, taskID:string) => ({type: DELETE_TASK, todolistID, taskID} as const)
export const updateTaskTitleAC = (todolistID:string, taskID:string, taskTitle:string) => ({type: UPDATE_TASK_TITLE, todolistID, taskID, taskTitle} as const)
export const updateTaskStatusAC = (todolistID:string, taskID:string, taskStatus:TaskStatus) => ({type: UPDATE_TASK_STATUS, todolistID, taskID, taskStatus} as const)
export const updateTaskEntityStatusAC = (todolistID:string, taskID:string, entityStatus:RequestStatusType) => ({type: UPDATE_TASK_ENTITY_STATUS, todolistID, taskID, entityStatus} as const)
export const logoutTasksClearAC = () => ({type: LOGOUT_TASKS_CLEAR} as const)

//thunks
export const getTasksTC = (todolistID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    tasksAPI.getTasks(todolistID)
        .then(res => {
            if(!res.data.error) {
                dispatch(getTasksAC(todolistID, res.data.items))
                dispatch(setAppRequestStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.error))
                dispatch(setAppRequestStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
        })
}
export const createTaskTC = (todolistID:string, titleOfNewTask:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    tasksAPI.createTask(todolistID, titleOfNewTask)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC(todolistID, res.data.data.item))
                dispatch(setAppRequestStatusAC('succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
        })
}
export const deleteTaskTC = (todolistID:string, taskID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.deleteTask(todolistID, taskID)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistID, taskID))
                dispatch(setAppRequestStatusAC('succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
        })
}
export const updateTaskTitleTC = (todolistID:string, taskID:string, taskTitle:string) =>
(dispatch: AppDispatchType, getState: () => AppStateType) => {
    let updatedTask:TaskType
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        updatedTask = {
            addedDate: taskFromCurrentTodolist.addedDate,
            completed: taskFromCurrentTodolist.completed,
            deadline: taskFromCurrentTodolist.deadline,
            description: taskFromCurrentTodolist.description,
            id: taskFromCurrentTodolist.id,
            order: taskFromCurrentTodolist.order,
            priority: taskFromCurrentTodolist.priority,
            startDate: taskFromCurrentTodolist.startDate,
            status: taskFromCurrentTodolist.status,
            title: taskTitle,
            todoListId: taskFromCurrentTodolist.todoListId
        }
    } else {return}
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.updateTask(todolistID, taskID, updatedTask)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTaskTitleAC(todolistID, taskID, taskTitle))
                dispatch(setAppRequestStatusAC('succeeded'))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTaskEntityStatusAC(todolistID, taskID, 'failed'))
        })
}
export const updateTaskStatusTC = (todolistID:string, taskID:string, taskStatus:TaskStatus) =>
(dispatch: AppDispatchType, getState: () => AppStateType) => {
    let updatedTask:TaskType
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        updatedTask = {
            addedDate: taskFromCurrentTodolist.addedDate,
            completed: taskFromCurrentTodolist.completed,
            deadline: taskFromCurrentTodolist.deadline,
            description: taskFromCurrentTodolist.description,
            id: taskFromCurrentTodolist.id,
            order: taskFromCurrentTodolist.order,
            priority: taskFromCurrentTodolist.priority,
            startDate: taskFromCurrentTodolist.startDate,
            status: taskStatus,
            title: taskFromCurrentTodolist.title,
            todoListId: taskFromCurrentTodolist.todoListId
        }
    } else {return}
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'loading'))
    tasksAPI.updateTask(todolistID, taskID, updatedTask)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTaskStatusAC(todolistID, taskID, taskStatus))
                dispatch(setAppRequestStatusAC('succeeded'))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTaskEntityStatusTC(todolistID, taskID, 'failed'))
        })
}
export const updateTaskEntityStatusTC = (todolistID:string, taskID:string, entityStatus:RequestStatusType) => (dispatch: AppDispatchType) => {
    dispatch(updateTaskEntityStatusAC(todolistID, taskID, entityStatus))
}
export const logoutTasksClearTC = () => (dispatch: AppDispatchType) => {
    dispatch(logoutTasksClearAC())
}

//types
export type DomainTaskType = TaskType & {entityStatus:RequestStatusType}
export type TasksType = {
    [key: string]: Array<DomainTaskType>
}
export type TasksActionsType =
| ReturnType<typeof getTasksAC>
| ReturnType<typeof createTaskAC>
| ReturnType<typeof deleteTaskAC>
| ReturnType<typeof updateTaskTitleAC>
| ReturnType<typeof updateTaskStatusAC>
| ReturnType<typeof updateTaskEntityStatusAC>
| ReturnType<typeof logoutTasksClearAC>
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType
*/