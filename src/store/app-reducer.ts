import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../api/api"
import { setLoginAC } from "./auth-reducer"
import { AppDispatchType } from "./store"

/* ---------- REDUX TOOLKIT ---------- */

const initialState = {
    initialized: false,
    requestStatus: 'idle' as RequestStatusType,
    error: null as ErrorType,
}

//slice
const slice = createSlice({
    name: "APP",
    initialState: initialState,
    reducers: {
        setAppRequestStatusAC: (draftState, action: PayloadAction<{requestStatus: RequestStatusType}>) => {
            draftState.requestStatus = action.payload.requestStatus
        },
        setAppErrorAC: (draftState, action: PayloadAction<{error: ErrorType}>) => {
            draftState.error = action.payload.error
        },
        setAppInitializeAC: (draftState, action: PayloadAction<{initialized: boolean}>) => {
            draftState.initialized = action.payload.initialized
        },
    }
})

//reducer
export const appReducer = slice.reducer

//actions
export const {setAppRequestStatusAC, setAppErrorAC, setAppInitializeAC} = slice.actions

//thunks
export const initializeAppTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setLoginAC({isLogin: true}))
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
    .finally(() => {
        dispatch(setAppInitializeAC({initialized :true}))
    })
}

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