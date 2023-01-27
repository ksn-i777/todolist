import { todolistsAPI, TodolistTypeFromResponse } from '../api/api'
import { RequestStatusType, setAppErrorAC, setAppRequestStatusAC } from './app-reducer'
import { AppDispatchType } from './store'

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