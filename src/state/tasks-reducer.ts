import {v1} from 'uuid';
import {TasksType, TaskType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    status: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export function tasksReducer(objTasks:TasksType, action:ActionsType):TasksType {

    let copyObjTasks:TasksType

    switch (action.type) {
        case 'REMOVE-TASK':
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.id !== action.taskID)}
            return copyObjTasks
        case 'ADD-TASK':
            const newTask:TaskType = {id: v1(), title: action.title, isDone: false}
            copyObjTasks = {...objTasks, [action.todolistID]: [newTask, ...objTasks[action.todolistID]]}
            return copyObjTasks
        case 'CHANGE-TASK-STATUS':
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)}
            return copyObjTasks
        case 'CHANGE-TASK-TITLE':
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.id === action.taskID  ? {...t, title: action.title} : t)}
            return copyObjTasks
        case 'ADD-TODOLIST':
            copyObjTasks = {[action.todolistID]: [], ...objTasks}
            return copyObjTasks
        case 'REMOVE-TODOLIST':
            copyObjTasks = {...objTasks}
            delete copyObjTasks[action.todolistID]
            return copyObjTasks
        default:
            throw new Error("I don't understand this type")
    }
}

export function removeTaskAC(todolistID:string, taskID:string):RemoveTaskActionType {
    return {type: 'REMOVE-TASK', todolistID: todolistID, taskID: taskID}
}
export function addTaskAC(todolistID:string, title:string):AddTaskActionType {
    return {type: 'ADD-TASK', todolistID: todolistID, title: title}
}
export function changeTaskStatusAC(todolistID:string, taskID:string, status:boolean):ChangeTaskStatusActionType {
    return {type: 'CHANGE-TASK-STATUS', todolistID: todolistID, taskID: taskID, status: status}
}
export function changeTaskTitleAC(todolistID:string, taskID:string, title:string):ChangeTaskTitleActionType {
    return {type: 'CHANGE-TASK-TITLE', todolistID: todolistID, taskID: taskID, title: title}
}

