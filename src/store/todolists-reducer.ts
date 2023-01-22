import { todolistsAPI, TodolistTypeFromResponse } from '../api/api'
import { RequestStatusType, setAppErrorAC, setAppRequestStatusAC } from './app-reducer'
import { AppDispatchType } from './store'

// constants
export const GET_TODOLISTS = 'GET-TODOLISTS'
export const CREATE_TODOLIST = 'CREATE-TODOLIST'
export const DELETE_TODOLIST = 'DELETE-TODOLIST'
export const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE'
export const UPDATE_TODOLIST_FILTER = 'UPDATE-TODOLIST-FILTER'
export const UPDATE_TODOLIST_ENTITY_STATUS = 'UPDATE-TODOLIST-ENTITY-STATUS'

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
    dispatch(updateTodolistEntityStatusAC(todolistID, 'loading'))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistID))
                dispatch(setAppRequestStatusAC('succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTodolistEntityStatusAC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTodolistEntityStatusAC(todolistID, 'failed'))
        })
}

export const updateTodolistTitleTC = (todolistID:string, newTitle:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC('loading'))
    dispatch(updateTodolistEntityStatusAC(todolistID, 'loading'))
    todolistsAPI.updateTodolistTitle(todolistID, newTitle)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTodolistTitleAC(todolistID, newTitle))
                dispatch(setAppRequestStatusAC('succeeded'))
                dispatch(updateTodolistEntityStatusAC(todolistID, 'succeeded'))
            } else {
                dispatch(res.data.messages.length > 0 ? setAppErrorAC(res.data.messages[0]) : setAppErrorAC('some error'))
                dispatch(setAppRequestStatusAC('failed'))
                dispatch(updateTodolistEntityStatusAC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC('failed'))
            dispatch(updateTodolistEntityStatusAC(todolistID, 'failed'))
        })
}

export const updateTodolistFilterTC = (todolistID:string, newTodolistFilter:TodolistFilterValuesType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistFilterAC(todolistID, newTodolistFilter))
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