import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, ADD_TODOLIST, REMOVE_TODOLIST, todolistID1} from './todolists-reducer';
import {TaskPriority, TaskStatus, TaskType} from '../api/api';

const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type TasksType = {
    [key: string]: Array<TaskType>,
}

type AddTaskActionType = {
    type: typeof ADD_TASK
    todolistID: string
    titleOfNewTask: string
}
type RemoveTaskActionType = {
    type: typeof REMOVE_TASK
    todolistID: string
    taskID: string
}
type ChangeTaskTitleActionType = {
    type: typeof CHANGE_TASK_TITLE
    todolistID: string
    taskID: string
    newTaskTitle: string
}
type ChangeTaskStatusActionType = {
    type: typeof CHANGE_TASK_STATUS
    todolistID: string
    taskID: string
    taskStatus: TaskStatus
}

type TasksActionsType = AddTaskActionType
| RemoveTaskActionType
| ChangeTaskTitleActionType
| ChangeTaskStatusActionType
| AddTodolistActionType
| RemoveTodolistActionType

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
        case ADD_TASK:
            const newTask:TaskType = {id: v1(), title: action.titleOfNewTask, status: TaskStatus.New, completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''}
            return {...objTasks, [action.todolistID]: [newTask, ...objTasks[action.todolistID]]}
        case REMOVE_TASK:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.id !== action.taskID)}
        case CHANGE_TASK_TITLE:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID  ? {...t, title: action.newTaskTitle} : t)}
        case CHANGE_TASK_STATUS:
            return {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, status: action.taskStatus} : t)}
        case ADD_TODOLIST:
            copyObjTasks = {...objTasks}
            copyObjTasks[action.todolistID] = []
            return copyObjTasks
        case REMOVE_TODOLIST:
            copyObjTasks = {...objTasks}
            delete copyObjTasks[action.todolistID]
            return copyObjTasks
        default:
            return objTasks
    }
}

export function addTaskAC(todolistID:string, titleOfNewTask:string):AddTaskActionType {
    return {type: ADD_TASK, todolistID, titleOfNewTask}
}
export function removeTaskAC(todolistID:string, taskID:string):RemoveTaskActionType {
    return {type: REMOVE_TASK, todolistID, taskID}
}
export function changeTaskTitleAC(todolistID:string, taskID:string, newTaskTitle:string):ChangeTaskTitleActionType {
    return {type: CHANGE_TASK_TITLE, todolistID, taskID, newTaskTitle}
}
export function changeTaskStatusAC(todolistID:string, taskID:string, taskStatus:TaskStatus):ChangeTaskStatusActionType {
    return {type: CHANGE_TASK_STATUS, todolistID, taskID, taskStatus}
}