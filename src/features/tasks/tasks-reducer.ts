import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from 'app/store'
import { RequestStatusType } from 'app/app-reducer'
import { logoutTC } from 'features/auth/auth-reducer'
import { createTodolistTC, deleteTodolistAC, getTodolistsTC } from 'features/todolists/todolists-reducer'
import { tasksAPI, TaskStatus, TaskType } from './tasks-api'

/* ---------- REDUX TOOLKIT ---------- */

//async thunks
export const getTasksTC = createAsyncThunk("TASKS/getTasks", async (todolistID:string, thunkAPI) => {
  try {
    const res = await tasksAPI.getTasks(todolistID)
    if (!res.data.error) {
      return {todolistID, tasks: res.data.items, error: null, requestStatus: 'succeeded'}
    } else {
      return {error: res.data.error, requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})
export const createTaskTC = createAsyncThunk("TASKS/createTask", async (params: {todolistID:string, titleOfNewTask:string}, thunkAPI) => {
  try {
    const res = await tasksAPI.createTask(params.todolistID, params.titleOfNewTask)
    if (res.data.resultCode === 0) {
      return {todolistID: params.todolistID, task: res.data.data.item, error: null, requestStatus: 'succeeded'}
    } else {
      return {error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})
export const deleteTaskTC = createAsyncThunk("TASKS/deleteTask", async (params: {todolistID:string, taskID:string}, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateTaskEntityStatusAC({todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'loading'}))
    const res = await tasksAPI.deleteTask(params.todolistID, params.taskID)
    if (res.data.resultCode === 0) {
      return {todolistID: params.todolistID, taskID: params.taskID, error: null, entityStatus: 'succeeded', requestStatus: 'succeeded'}
    } else {
      return {todolistID: params.todolistID, taskID: params.taskID, error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', entityStatus: 'failed', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({todolistID: params.todolistID, taskID: params.taskID, error: error.message, entityStatus: 'failed', requestStatus: 'failed'})
  }   
})
export const updateTaskTitleTC = createAsyncThunk("TASKS/updateTaskTitle", async (params: {todolistID:string, taskID:string, taskTitle:string}, thunkAPI) => {
  let updatedTask:TaskType
  const allTasks = (thunkAPI.getState() as AppStateType).tasks
  const taskFromCurrentTodolist = allTasks[params.todolistID].find(t => t.id === params.taskID)
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
      todoListId: taskFromCurrentTodolist.todoListId,
      title: params.taskTitle
    }
  } else {return}
  try {
    thunkAPI.dispatch(updateTaskEntityStatusAC({todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'loading'}))
    const res = await tasksAPI.updateTask(params.todolistID, params.taskID, updatedTask)
    if (res.data.resultCode === 0) {
      return {todolistID: params.todolistID, taskID: params.taskID, taskTitle: params.taskTitle, entityStatus: 'succeeded', error: null, requestStatus: 'succeeded'}
    } else {
      return {todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'failed', error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'failed', error: error.message, requestStatus: 'failed'})
  } 
})
export const updateTaskStatusTC = createAsyncThunk("TASKS/updateTaskStatus", async (params: {todolistID:string, taskID:string, taskStatus:TaskStatus}, thunkAPI) => {
  let updatedTask:TaskType
  const allTasks = (thunkAPI.getState() as AppStateType).tasks
  const taskFromCurrentTodolist = allTasks[params.todolistID].find(t => t.id === params.taskID)
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
      title: taskFromCurrentTodolist.title,
      todoListId: taskFromCurrentTodolist.todoListId,
      status: params.taskStatus,
    }
  } else {return}
  try {
    thunkAPI.dispatch(updateTaskEntityStatusAC({todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'loading'}))
    const res = await tasksAPI.updateTask(params.todolistID, params.taskID, updatedTask)
    if (res.data.resultCode === 0) {
      return {todolistID: params.todolistID, taskID: params.taskID, taskStatus: params.taskStatus, entityStatus: 'succeeded', error: null, requestStatus: 'succeeded'}
    } else {
      return {todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'failed', error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({todolistID: params.todolistID, taskID: params.taskID, entityStatus: 'failed', error: error.message, requestStatus: 'failed'})
  } 
})

//slice
const slice = createSlice({
  name: "TASKS",
  initialState: {} as TasksType,
  reducers: {
    createTaskAC: (state, action: PayloadAction<{todolistID:string, task:TaskType}>) => {
      state[action.payload.todolistID].unshift({...action.payload.task, entityStatus: 'idle'})
    },
    deleteTaskAC: (state, action: PayloadAction<{todolistID:string, taskID:string}>) => {
      const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
      if(index > -1) {state[action.payload.todolistID].splice(index, 1)}
    },
    updateTaskTitleAC: (state, action: PayloadAction<{todolistID:string, taskID:string, taskTitle:string}>) => {
      const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
      if(index > -1) {state[action.payload.todolistID][index].title = action.payload.taskTitle}
    },
    updateTaskStatusAC: (state, action: PayloadAction<{todolistID:string, taskID:string, taskStatus:TaskStatus}>) => {
      const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
      if(index > -1) {state[action.payload.todolistID][index].status = action.payload.taskStatus}
    },
    updateTaskEntityStatusAC: (state, action: PayloadAction<{todolistID:string, taskID:string, entityStatus:RequestStatusType}>) => {
      const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
      if(index > -1) {state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus}
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(logoutTC.fulfilled, (state, action) => {
      if (action.payload.isLogin === false) {
        return {}
      }
    })
    .addCase(getTodolistsTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {state[tl.id] = []})
    })
    .addCase(createTodolistTC.fulfilled, (state, action) => {
      if (action.payload.todolist) {
        state[action.payload.todolist.id] = []
      }
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(getTasksTC.fulfilled, (state, action) => {
      if (action.payload.todolistID) {
        state[action.payload.todolistID] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
      }
    })
    .addCase(createTaskTC.fulfilled, (state, action) => {
      if (action.payload.todolistID) {
        state[action.payload.todolistID].unshift({...action.payload.task, entityStatus: 'idle'})
      }
    })
    .addCase(deleteTaskTC.fulfilled, (state, action) => {
      if (action.payload.error === null) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
          state[action.payload.todolistID].splice(index, 1)
        }
      }
      if (action.payload.error !== null) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
    .addCase(deleteTaskTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
    .addCase(updateTaskTitleTC.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.error === null) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].title = action.payload.taskTitle
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus
        }
      } 
      if (action.payload.error !== null) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
    .addCase(updateTaskTitleTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
    .addCase(updateTaskStatusTC.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.error === null) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index] =
          {...state[action.payload.todolistID][index],
          status: action.payload.taskStatus,
          entityStatus: action.payload.entityStatus}
        }
        if (action.payload.error !== null) {
          const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
          if(index > -1) {
            state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
          }
        }
      }
    })
    .addCase(updateTaskStatusTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
        if(index > -1) {
          state[action.payload.todolistID][index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
  }
})

//reducer
export const tasksReducer = slice.reducer

//actions
export const {createTaskAC, deleteTaskAC, updateTaskTitleAC, updateTaskStatusAC, updateTaskEntityStatusAC} = slice.actions

//types
export type DomainTaskType = TaskType & {entityStatus:RequestStatusType}
export type TasksType = {
  [key: string]: Array<DomainTaskType>
}
export type updateTaskStatusPayloadType = {
  todolistID: string
  taskID: string
  taskStatus?: TaskStatus
  entityStatus: RequestStatusType
  error: null | string
  requestStatus: RequestStatusType
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