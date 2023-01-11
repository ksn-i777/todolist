import {
    GetTodolistsActionType,
    CreateTodolistActionType,
    DeleteTodolistActionType,
    GET_TODOLISTS,
    CREATE_TODOLIST,
    DELETE_TODOLIST,
    todolistID1,
} from './todolists-reducer';
import { tasksAPI, TaskStatus, TaskType} from '../api/api';
import { AppDispatch, RootStateType } from './store';

export const CREATE_TASK = 'CREATE-TASK'
export const DELETE_TASK = 'DELETE-TASK'
export const UPDATE_TASK_TITLE = 'UPDATE-TASK-TITLE'
export const UPDATE_TASK_STATUS = 'UPDATE-TASK-STATUS'
export const GET_TASKS = 'GET-TASKS'

export type TasksType = {
    [key: string]: Array<TaskType>,
}

type GetTasksActionType = {
    type: typeof GET_TASKS
    todolistID: string
    tasks: Array<TaskType>
}

type CreateTaskActionType = {
    type: typeof CREATE_TASK
    todolistID: string
    task: TaskType
}
type DeleteTaskActionType = {
    type: typeof DELETE_TASK
    todolistID: string
    taskID: string
}
type UpdateTaskTitleActionType = {
    type: typeof UPDATE_TASK_TITLE
    todolistID: string
    taskID: string
    newTaskTitle: string
}
type UpdateTaskStatusActionType = {
    type: typeof UPDATE_TASK_STATUS
    todolistID: string
    taskID: string
    taskStatus: TaskStatus
}

type TasksActionsType = GetTasksActionType
| CreateTaskActionType
| DeleteTaskActionType
| UpdateTaskTitleActionType
| UpdateTaskStatusActionType
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType

const initializationState:TasksType = {
    [todolistID1]: [],
}

export function tasksReducer(objTasks:TasksType = initializationState, action:TasksActionsType):TasksType {

    let copyObjTasks:TasksType

    switch (action.type) {
        case GET_TASKS:
            return {...objTasks, [action.todolistID]: action.tasks}
        case CREATE_TASK:
            return {...objTasks, [action.todolistID]: [action.task, ...objTasks[action.todolistID]]}
        case DELETE_TASK:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case UPDATE_TASK_TITLE:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID  ? {...t, title: action.newTaskTitle} : t)}
        case UPDATE_TASK_STATUS:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.taskStatus} : t)}
        case GET_TODOLISTS:
            copyObjTasks = {...objTasks}
            action.todolists.forEach(tl => {
                copyObjTasks[tl.id] = []
            })
            return copyObjTasks
        case CREATE_TODOLIST:
            copyObjTasks = {...objTasks}
            copyObjTasks[action.todolistID] = []
            return copyObjTasks
        case DELETE_TODOLIST:
            copyObjTasks = {...objTasks}
            delete copyObjTasks[action.todolistID]
            return copyObjTasks
        default:
            return objTasks
    }
}

export function getTasksAC(todolistID:string, tasks: Array<TaskType>):GetTasksActionType {
    return {type: GET_TASKS, todolistID, tasks}
}
export function createTaskAC(todolistID:string, task:TaskType):CreateTaskActionType {
    return {type: CREATE_TASK, todolistID, task}
}
export function deleteTaskAC(todolistID:string, taskID:string):DeleteTaskActionType {
    return {type: DELETE_TASK, todolistID, taskID}
}
export function updateTaskTitleAC(todolistID:string, taskID:string, newTaskTitle:string):UpdateTaskTitleActionType {
    return {type: UPDATE_TASK_TITLE, todolistID, taskID, newTaskTitle}
}
export function updateTaskStatusAC(todolistID:string, taskID:string, taskStatus:TaskStatus):UpdateTaskStatusActionType {
    return {type: UPDATE_TASK_STATUS, todolistID, taskID, taskStatus}
}

export const getTasksTC = (todolistID:string) => (dispatch: AppDispatch) => {
    tasksAPI.getTasks(todolistID).then(tasks => {
        dispatch(getTasksAC(todolistID, tasks))
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
export const updateTaskTitleTC = (todolistID:string, taskID:string, newTaskTitle:string) =>
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
            title: newTaskTitle,
            todoListId: taskFromCurrentTodolist.todoListId
        }
        tasksAPI.updateTask(todolistID, taskID, updatedTask).then(res => {
            dispatch(updateTaskTitleAC(todolistID, taskID, newTaskTitle))
        })
    }
}
export const updateTaskStatusTC = (todolistID:string, taskID:string, newTaskStatus:TaskStatus) =>
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
            status: newTaskStatus,
            title: taskFromCurrentTodolist.title,
            todoListId: taskFromCurrentTodolist.todoListId
        }
        tasksAPI.updateTask(todolistID, taskID, updatedTask).then(res => {
            dispatch(updateTaskStatusAC(todolistID, taskID, newTaskStatus))
        })
    }
}
