//constants
export const APP_SET_STATUS = 'APP/SET-STATUS'
export const APP_SET_ERROR = 'APP/SET-ERROR'

const initialState = {
    requestStatus: 'idle' as RequestStatusType,
    error: null as ErrorType
}

//reducer
export function appReducer(state:InitialStateType = initialState, action:AppReducerActionsType):InitialStateType {
    switch (action.type) {
        case APP_SET_STATUS:
            return {...state, requestStatus: action.requestStatus}
        case APP_SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppRequestStatusAC = (requestStatus: RequestStatusType) => ({type: APP_SET_STATUS, requestStatus} as const)
export const setAppErrorAC = (error: ErrorType) => ({type: APP_SET_ERROR, error} as const)


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = null | string
export type InitialStateType = typeof initialState
export type SetAppRequestStatusType = ReturnType<typeof setAppRequestStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type AppReducerActionsType = SetAppRequestStatusType | SetAppErrorType