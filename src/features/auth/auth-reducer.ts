import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initializeAppTC } from "app/app-reducer"
import { authAPI, LoginType } from "./auth-api"

/* ---------- REDUX TOOLKIT ---------- */

//async thunks
export const loginTC = createAsyncThunk("AUTH/login", async (data: LoginType, thunkAPI) => {
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      return {isLogin: true, error: null, requestStatus: 'succeeded'}
    } else {
      return {error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})

export const logoutTC = createAsyncThunk("AUTH/logout", async (_, thunkAPI) => {
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      return {isLogin: false, error: null, requestStatus: 'succeeded'}
    } else {
      return {isLogin: true, error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error', requestStatus: 'failed'}
    }
  } catch(error: any) {
    return thunkAPI.rejectWithValue({error: error.message, requestStatus: 'failed'})
  } 
})

//slice
const slice = createSlice({
  name: "AUTH",
  initialState: {isLogin: false},
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(initializeAppTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload.isLogin
      }
    })
    .addCase(loginTC.fulfilled, (state, action) => {
      if (action.payload.isLogin) {
        state.isLogin = action.payload.isLogin
      }
    })
    .addCase(logoutTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload.isLogin
      }
    })
  },
})

//reducer
export const authReducer = slice.reducer



/* ---------- REDUX ---------- */
/* 
//constants
export const LOGIN_SET_IS_LOGGED_IN = 'LOGIN/SET-IS-LOGGED-IN'

const initialState = {
  isLogin: false
}

//reducer
export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
  switch (action.type) {
    case LOGIN_SET_IS_LOGGED_IN:
      return {...state, isLogin: action.value}
    default:
      return state
  }
}

//actions
export const setLoginAC = (value: boolean) => ({type: LOGIN_SET_IS_LOGGED_IN, value} as const)

//thunks
export const loginTC = (data: LoginType) => (dispatch: AppDispatchType) => {
  dispatch(setAppRequestStatusAC('loading'))
  authAPI.login(data)
    .then(res => {
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
}
export const logoutTC = () => (dispatch: AppDispatchType) => {
  dispatch(setAppRequestStatusAC('loading'))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setLoginAC(false))
        dispatch(setAppRequestStatusAC('succeeded'))
        dispatch(logoutTodolistsClearTC())
        dispatch(logoutTasksClearTC())
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

//types
export type InitialStateType = typeof initialState
export type AuthReducerActionsType = ReturnType<typeof setLoginAC>
*/