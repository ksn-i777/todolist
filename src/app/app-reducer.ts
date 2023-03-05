import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "features/auth/auth-api"
import { loginTC, logoutTC } from "features/auth/auth-reducer"
import { createTaskTC, deleteTaskTC, getTasksTC, updateTaskStatusTC, updateTaskTitleTC } from "features/tasks/tasks-reducer"
import { createTodolistTC, deleteTodolistTC, getTodolistsTC, updateTodolistTitleTC } from "features/todolists/todolists-reducer"

/* ---------- REDUX TOOLKIT ---------- */

//async thunks
export const initializeAppTC = createAsyncThunk("APP/initializeApp", async (_, thunkAPI) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      return {initialized: true, isLogin: true, error: null, requestStatus: 'succeeded'}
    } else {
      return {initialized: true, isLogin: false, error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({initialized: true, error: error.message, requestStatus: 'failed'})
  } 
})

//slice
const slice = createSlice({
  name: "APP",
  initialState: {initialized: false, requestStatus: 'idle' as RequestStatusType, error: null as ErrorType},
  reducers: {
    setAppErrorAC: (draftState, action: PayloadAction<{error: ErrorType}>) => {
        draftState.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(initializeAppTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(initializeAppTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.initialized = action.payload.initialized
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(initializeAppTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.initialized = action.payload.initialized
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(loginTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(loginTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(loginTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(logoutTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(logoutTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(logoutTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(getTodolistsTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(getTodolistsTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(getTodolistsTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(createTodolistTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(createTodolistTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(createTodolistTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(deleteTodolistTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(deleteTodolistTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(deleteTodolistTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(updateTodolistTitleTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(updateTodolistTitleTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(getTasksTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(getTasksTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(getTasksTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(createTaskTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(createTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(createTaskTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(deleteTaskTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(deleteTaskTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(deleteTaskTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(updateTaskTitleTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(updateTaskTitleTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(updateTaskTitleTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })

    .addCase(updateTaskStatusTC.pending, (state) => {state.requestStatus = 'loading'})
    .addCase(updateTaskStatusTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
    .addCase(updateTaskStatusTC.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.error
        state.requestStatus = action.payload.requestStatus as RequestStatusType
      }
    })
  },
})

//reducer
export const appReducer = slice.reducer

//actions
export const {setAppErrorAC} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string



/* ---------- REDUX ---------- */
/* 
//constants
export const APP_SET_STATUS = 'APP/SET-STATUS'
export const APP_SET_ERROR = 'APP/SET-ERROR'
export const APP_SET_INITIALIZE = 'APP/SET-INITIALIZE'

const initialState = {
    initialized: false,
    requestStatus: 'idle' as RequestStatusType,
    error: null as ErrorType,
}

//reducer
export function appReducer(state:InitialStateType = initialState, action:AppReducerActionsType):InitialStateType {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, requestStatus: action.requestStatus}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        case APP_SET_INITIALIZE:
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

//actions
export const setAppRequestStatusAC = (requestStatus: RequestStatusType) => ({type: APP_SET_STATUS, requestStatus} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: APP_SET_ERROR, error} as const)
export const setAppInitializeAC = (initialized: boolean) => ({type: APP_SET_INITIALIZE, initialized} as const)

//thunks
export const initializeAppTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setLoginAC(true))
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
    .finally(() => {
        dispatch(setAppInitializeAC(true))
    })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string
export type InitialStateType = typeof initialState
export type SetAppRequestStatusType = ReturnType<typeof setAppRequestStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type setAppInitializeType = ReturnType<typeof setAppInitializeAC>
export type AppReducerActionsType = SetAppRequestStatusType | SetAppErrorType | setAppInitializeType
*/