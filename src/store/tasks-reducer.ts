import { GetTodolistsActionType, CreateTodolistActionType, DeleteTodolistActionType, GET_TODOLISTS, CREATE_TODOLIST, DELETE_TODOLIST } from './todolists-reducer';
import { tasksAPI, TaskStatus, TaskType } from '../api/api';
import { AppDispatch, RootStateType } from './store';

//constants
export const CREATE_TASK = 'CREATE-TASK'
export const DELETE_TASK = 'DELETE-TASK'
export const UPDATE_TASK_TITLE = 'UPDATE-TASK-TITLE'
export const UPDATE_TASK_STATUS = 'UPDATE-TASK-STATUS'
export const GET_TASKS = 'GET-TASKS'

//reducer
export function tasksReducer(objTasks:TasksType = {}, action:TasksActionsType):TasksType {
    switch (action.type) {
        case GET_TASKS:
            return {...objTasks, [action.todolistID]: action.tasks}
        case CREATE_TASK:
            return {...objTasks, [action.todolistID]: [action.task, ...objTasks[action.todolistID]]}
        case DELETE_TASK:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case UPDATE_TASK_TITLE:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID  ? {...t, title: action.taskTitle} : t)}
        case UPDATE_TASK_STATUS:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.taskStatus} : t)}
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

//thunks
export const getTasksTC = (todolistID:string) => (dispatch: AppDispatch) => {
    tasksAPI.getTasks(todolistID).then(res => {
        dispatch(getTasksAC(todolistID, res.data.items))
    })
}
export const createTaskTC = (todolistID:string, titleOfNewTask:string) => (dispatch: AppDispatch) => {
    tasksAPI.createTask(todolistID, titleOfNewTask).then(res => {
        dispatch(createTaskAC(todolistID, res.data.data.item))
    })
}
export const deleteTaskTC = (todolistID:string, taskID:string) => (dispatch: AppDispatch) => {
    tasksAPI.deleteTask(todolistID, taskID).then(res => {
        dispatch(deleteTaskAC(todolistID, taskID))
    })
}
export const updateTaskTitleTC = (todolistID:string, taskID:string, taskTitle:string) =>
(dispatch: AppDispatch, getState: () => RootStateType) => {
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        const updatedTask:TaskType = {
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
        tasksAPI.updateTask(todolistID, taskID, updatedTask).then(res => {
            dispatch(updateTaskTitleAC(todolistID, taskID, taskTitle))
        })
    }
}
export const updateTaskStatusTC = (todolistID:string, taskID:string, taskStatus:TaskStatus) =>
(dispatch: AppDispatch, getState: () => RootStateType) => {
    const allTasks = getState().tasks
    const taskFromCurrentTodolist = allTasks[todolistID].find(t => t.id === taskID)
    if (taskFromCurrentTodolist) {
        const updatedTask:TaskType = {
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
        tasksAPI.updateTask(todolistID, taskID, updatedTask).then(res => {
            dispatch(updateTaskStatusAC(todolistID, taskID, taskStatus))
        })
    }
}

//types
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TasksActionsType =
| ReturnType<typeof getTasksAC>
| ReturnType<typeof createTaskAC>
| ReturnType<typeof deleteTaskAC>
| ReturnType<typeof updateTaskTitleAC>
| ReturnType<typeof updateTaskStatusAC>
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType