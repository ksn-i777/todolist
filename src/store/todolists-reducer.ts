import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI, TodolistTypeFromResponse } from '../api/api'
import { RequestStatusType, setAppErrorAC, setAppRequestStatusAC } from './app-reducer'
import { AppDispatchType } from './store'

/* ---------- REDUX TOOLKIT ---------- */

const initialState = [] as Array<TodolistType>

//slice
const slice = createSlice({
    name: "TODOS",
    initialState: initialState,
    reducers: {
        getTodolistsAC: (draftState, action: PayloadAction<{todolists:Array<TodolistTypeFromResponse>}>) => {
            return action.payload.todolists.map(tl => ({...tl, todolistFilter: 'all', entityStatus: 'idle'}))
        },
        createTodolistAC: (draftState, action: PayloadAction<{todolist:TodolistTypeFromResponse}>) => {
            draftState.unshift({...action.payload.todolist, todolistFilter: 'all', entityStatus: 'idle'})
        },
        deleteTodolistAC: (draftState, action: PayloadAction<{id: string}>) => {
            const index = draftState.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {draftState.splice(index, 1)}
        },
        updateTodolistTitleAC: (draftState, action: PayloadAction<{id:string, title:string}>) => {
            const index = draftState.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {draftState[index].title = action.payload.title}
        },
        updateTodolistFilterAC: (draftState, action: PayloadAction<{id:string, filter:TodolistFilterValuesType}>) => {
            const index = draftState.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {draftState[index].todolistFilter = action.payload.filter}
        },
        updateTodolistEntityStatusAC: (draftState, action: PayloadAction<{id:string, entityStatus:RequestStatusType}>) => {
            const index = draftState.findIndex(tl => tl.id === action.payload.id)
            if(index > -1) {draftState[index].entityStatus = action.payload.entityStatus}
        },
        logoutTodolistsClearAC: (draftState, action: PayloadAction) => {
            return []
        },
    }
})

// reducer
export const todolistsReducer = slice.reducer

// actions
export const {
    getTodolistsAC,
    createTodolistAC,
    deleteTodolistAC,
    updateTodolistTitleAC,
    updateTodolistFilterAC,
    updateTodolistEntityStatusAC,
    logoutTodolistsClearAC
} = slice.actions

//thunks
export const getTodolistsTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(getTodolistsAC({todolists: res.data}))
            dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
        })
}
export const createTodolistTC = (titleOfNewTodolist:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    todolistsAPI.createTodolist(titleOfNewTodolist)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTodolistAC({todolist: res.data.data.item}))
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
export const deleteTodolistTC = (todolistID:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    dispatch(updateTodolistEntityStatusTC(todolistID, 'loading'))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodolistAC({id: todolistID}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
        })
}
export const updateTodolistTitleTC = (todolistID:string, newTitle:string) => (dispatch: AppDispatchType) => {
    dispatch(setAppRequestStatusAC({requestStatus: 'loading'}))
    dispatch(updateTodolistEntityStatusTC(todolistID, 'loading'))
    todolistsAPI.updateTodolistTitle(todolistID, newTitle)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTodolistTitleAC({id: todolistID, title: newTitle}))
                dispatch(setAppRequestStatusAC({requestStatus: 'succeeded'}))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'succeeded'))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length > 0 ? res.data.messages[0] : 'some error'}))
                dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
                dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppRequestStatusAC({requestStatus: 'failed'}))
            dispatch(updateTodolistEntityStatusTC(todolistID, 'failed'))
        })
}
export const updateTodolistFilterTC = (todolistID:string, newTodolistFilter:TodolistFilterValuesType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistFilterAC({id: todolistID, filter: newTodolistFilter}))
}
export const updateTodolistEntityStatusTC = (id:string, entityStatus:RequestStatusType) => (dispatch: AppDispatchType) => {
    dispatch(updateTodolistEntityStatusAC({id: id, entityStatus: entityStatus}))
}
export const logoutTodolistsClearTC = () => (dispatch: AppDispatchType) => {
    dispatch(logoutTodolistsClearAC())
}

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