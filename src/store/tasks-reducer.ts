import {v1} from 'uuid';
import {
    GetTodolistsActionType,
    CreateTodolistActionType,
    DeleteTodolistActionType,
    GET_TODOLISTS,
    CREATE_TODOLIST,
    DELETE_TODOLIST,
    todolistID1,
} from './todolists-reducer';
import {TaskPriority, TaskStatus, TaskType} from '../api/api';

export const CREATE_TASK = 'CREATE-TASK'
export const DELETE_TASK = 'DELETE-TASK'
export const UPDATE_TASK_TITLE = 'UPDATE-TASK-TITLE'
export const UPDATE_TASK_STATUS = 'UPDATE-TASK-STATUS'

export type TasksType = {
    [key: string]: Array<TaskType>,
}

type CreateTaskActionType = {
    type: typeof CREATE_TASK
    todolistID: string
    titleOfNewTask: string
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

type TasksActionsType = CreateTaskActionType
| DeleteTaskActionType
| UpdateTaskTitleActionType
| UpdateTaskStatusActionType
| GetTodolistsActionType
| CreateTodolistActionType
| DeleteTodolistActionType

const initializationState:TasksType = {
    [todolistID1]:
        [
            {id: v1(), title: 'HTML&CSS', status: TaskStatus.Completed, completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'JS', status: TaskStatus.Completed, completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'ReactJS', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'Rest API', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            {id: v1(), title: 'GraphQL', status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
        ],
}

export function tasksReducer(objTasks:TasksType = initializationState, action:TasksActionsType):TasksType {

    let copyObjTasks:TasksType

    switch (action.type) {
        case CREATE_TASK:
            const newTask:TaskType = {id: v1(), title: action.titleOfNewTask, status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''}
            return {...objTasks, [action.todolistID]: [newTask, ...objTasks[action.todolistID]]}
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

export function createTaskAC(todolistID:string, titleOfNewTask:string):CreateTaskActionType {
    return {type: CREATE_TASK, todolistID, titleOfNewTask}
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