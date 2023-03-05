import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatusType } from 'app/app-reducer'
import { logoutTC } from 'features/auth/auth-reducer'
import { todolistsAPI, TodolistTypeFromResponse } from './todolists-api'

/* ---------- REDUX TOOLKIT ---------- */

//async thunks
export const getTodolistsTC = createAsyncThunk("TODOS/getTodolists", async (_, thunkAPI) => {
  try {
    const res = await todolistsAPI.getTodolists()
    return {todolists: res.data, requestStatus: 'succeeded'}
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})

export const createTodolistTC = createAsyncThunk("TODOS/createTodolist", async (titleOfNewTodolist:string, thunkAPI) => {
  try {
    const res = await todolistsAPI.createTodolist(titleOfNewTodolist)
    if (res.data.resultCode === 0) {
      return {todolist: res.data.data.item, error: null, requestStatus: 'succeeded'}
    } else {
      return {error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})

export const deleteTodolistTC = createAsyncThunk("TODOS/deleteTodolist", async (todolistID:string, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateTodolistEntityStatusAC({id: todolistID, entityStatus: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistID)
    if (res.data.resultCode === 0) {
      return {todolistID, error: null, entityStatus: 'succeeded', requestStatus: 'succeeded', }
    } else {
      return {todolistID, error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', entityStatus: 'failed', requestStatus: 'failed', }
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({todolistID, error: error.message, entityStatus: 'failed', requestStatus: 'failed'})
  } 
})

export const updateTodolistTitleTC = createAsyncThunk("TODOS/updateTodolistTitle", async (params: {todolistID:string, newTitle:string}, thunkAPI) => {
  try {
    thunkAPI.dispatch(updateTodolistEntityStatusAC({id: params.todolistID, entityStatus: 'loading'}))
    const res = await todolistsAPI.updateTodolistTitle(params.todolistID, params.newTitle)
    if (res.data.resultCode === 0) {
      return {todolistID: params.todolistID, title: params.newTitle, error: null, entityStatus: 'succeeded', requestStatus: 'succeeded', }
    } else {
      return {todolistID: params.todolistID, error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', entityStatus: 'failed', requestStatus: 'failed', }
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({todolistID: params.todolistID, error: error.message, entityStatus: 'failed', requestStatus: 'failed'})
  } 
})

//slice
const slice = createSlice({
  name: "TODOS",
  initialState: [] as Array<TodolistType>,
  reducers: {
    createTodolistAC: (state, action: PayloadAction<{todolist:TodolistTypeFromResponse}>) => {
      state.unshift({...action.payload.todolist, todolistFilter: 'all', entityStatus: 'idle'})
    },
    deleteTodolistAC: (state, action: PayloadAction<{id: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if(index > -1) {state.splice(index, 1)}
    },
    updateTodolistTitleAC: (state, action: PayloadAction<{id:string, title:string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if(index > -1) {state[index].title = action.payload.title}
    },
    updateTodolistFilterAC: (state, action: PayloadAction<{id:string, filter:TodolistFilterValuesType}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if(index > -1) {state[index].todolistFilter = action.payload.filter}
    },
    updateTodolistEntityStatusAC: (state, action: PayloadAction<{id:string, entityStatus:RequestStatusType}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if(index > -1) {state[index].entityStatus = action.payload.entityStatus}
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(logoutTC.fulfilled, (state, action) => {
      if (action.payload.isLogin === false) {
        return []
      }
    })
    .addCase(getTodolistsTC.fulfilled, (state, action) => {
      if (action.payload.todolists) {
        return action.payload.todolists.map(tl => ({...tl, todolistFilter: 'all', entityStatus: 'idle'}))
      }
    })
    .addCase(createTodolistTC.fulfilled, (state, action) => {
      if (action.payload.todolist) {
        state.unshift({...action.payload.todolist, todolistFilter: 'all', entityStatus: 'idle'})
      }
    })
    .addCase(deleteTodolistTC.fulfilled, (state, action) => {
      if (action.payload.todolistID) {
        const index = state.findIndex(tl => tl.id === action.payload.todolistID)
        if(index > -1) {
          state[index].entityStatus = action.payload.entityStatus as RequestStatusType
          state.splice(index, 1)
        }
      }
    })
    .addCase(deleteTodolistTC.rejected, (state, action: PayloadAction<any>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID)
        if(index > -1) {
          state[index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
    })
    .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
      if (action.payload.title) {
        const index = state.findIndex(tl => tl.id === action.payload.todolistID)
        if(index > -1) {
          state[index].entityStatus = action.payload.entityStatus as RequestStatusType
          state[index].title = action.payload.title
        }
      } else {
        const index = state.findIndex(tl => tl.id === action.payload.todolistID)
        if(index > -1) {
          state[index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
      }
    })
    .addCase(updateTodolistTitleTC.rejected, (state, action: PayloadAction<any>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistID)
        if(index > -1) {
          state[index].entityStatus = action.payload.entityStatus as RequestStatusType
        }
    })
  }
})

// reducer
export const todolistsReducer = slice.reducer

// actions
export const {
  createTodolistAC, deleteTodolistAC, updateTodolistTitleAC, updateTodolistFilterAC, updateTodolistEntityStatusAC,
} = slice.actions

// types
export type TodolistType = TodolistTypeFromResponse & {todolistFilter: TodolistFilterValuesType, entityStatus: RequestStatusType}
export type TodolistFilterValuesType = 'all' | 'active' | 'completed'



/* ---------- REDUX ---------- */
/* 
// constants
export const GET_TODOLISTS = 'GET_TODOLISTS'
export const CREATE_TODOLIST = 'CREATE_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'
export const UPDATE_TODOLIST_TITLE = 'UPDATE_TODOLIST_TITLE'
export const UPDATE_TODOLIST_FILTER = 'UPDATE_TODOLIST_FILTER'
export const UPDATE_TODOLIST_ENTITY_STATUS = 'UPDATE_TODOLIST_ENTITY_STATUS'
export const LOGOUT_TODOLISTS_CLEAR = 'LOGOUT_TODOLISTS_CLEAR'

// reducer
export function todolistsReducer(todolists:Array<TodolistType> = [], action:TodolistActionsType):Array<TodolistType> {
    switch (action.type) {
        case GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, todolistFilter: 'all', entityStatus: 'idle'}))
        case CREATE_TODOLIST:
            return [{...action.todolist, todolistFilter: 'all', entityStatus: 'idle'}, ...todolists]
        case DELETE_TODOLIST:
            return todolists.filter(tl => tl.id !== action.id)
        case UPDATE_TODOLIST_TITLE:
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case UPDATE_TODOLIST_FILTER:
            return todolists.map(tl => tl.id === action.id ? {...tl, todolistFilter: action.filter} : tl)
        case UPDATE_TODOLIST_ENTITY_STATUS:
            return todolists.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case LOGOUT_TODOLISTS_CLEAR:
            return []
        default:
            return todolists
    }
}

// actions
export const getTodolistsAC = (todolists:Array<TodolistTypeFromResponse>) => ({type: GET_TODOLISTS, todolists} as const)
export const createTodolistAC = (todolist:TodolistTypeFromResponse) => ({type: CREATE_TODOLIST, todolist} as const)
export const deleteTodolistAC = (id: string) => ({type: DELETE_TODOLIST, id} as const)
export const updateTodolistTitleAC = (id:string, title:string) => ({type: UPDATE_TODOLIST_TITLE, id, title} as const)
export const updateTodolistFilterAC = (id:string, filter:TodolistFilterValuesType) => ({type: UPDATE_TODOLIST_FILTER, id, filter} as const)
export const updateTodolistEntityStatusAC = (id:string, entityStatus:RequestStatusType) => ({type: UPDATE_TODOLIST_ENTITY_STATUS, id, entityStatus} as const)
export const logoutTodolistsClearAC = () => ({type: LOGOUT_TODOLISTS_CLEAR} as const)

//thunks
export const getTodolistsTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC(res.data))
            dispatch(setAppRequestStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
        })
}
export const createTodolistTC = (titleOfNewTodolist:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    todolistsAPI.createTodolist(titleOfNewTodolist)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodolistAC(res.data.data.item))
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
export const deleteTodolistTC = (todolistID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTodolistEntityStatusTC(todolistID, 'loading'))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistID))
                dispatch(setAppRequestStatusAC('succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
        })
}
export const updateTodolistTitleTC = (todolistID:string, newTitle:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTodolistEntityStatusTC(todolistID, 'loading'))
    todolistsAPI.updateTodolistTitle(todolistID, newTitle)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTodolistTitleAC(todolistID, newTitle))
                dispatch(setAppRequestStatusAC('succeeded'))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
        })
}
export const updateTodolistFilterTC = (todolistID:string, newTodolistFilter:TodolistFilterValuesType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistFilterAC(todolistID, newTodolistFilter))
}
export const updateTodolistEntityStatusTC = (id:string, entityStatus:RequestStatusType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistEntityStatusAC(id, entityStatus))
}
export const logoutTodolistsClearTC = () => (dispatch: AppDispatchType) => {
    dispatch(logoutTodolistsClearAC())
}

// types
export type TodolistType = TodolistTypeFromResponse & {todolistFilter: TodolistFilterValuesType, entityStatus: RequestStatusType}
export type TodolistFilterValuesType = 'all' | 'active' | 'completed';
export type GetTodolistsActionType = ReturnType<typeof getTodolistsAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type TodolistActionsType =
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType
| ReturnType<typeof updateTodolistTitleAC>
| ReturnType<typeof updateTodolistFilterAC>
| ReturnType<typeof updateTodolistEntityStatusAC>
| ReturnType<typeof logoutTodolistsClearAC>
*/