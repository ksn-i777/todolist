import { authAPI, LoginType } from "../api/api"
import { setAppErrorAC, setAppRequestStatusAC } from "./app-reducer"
import { AppDispatchType } from "./store"
import { logoutTasksClearTC } from "./tasks-reducer"
import { logoutTodolistsClearTC } from "./todolists-reducer"

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