import {v1} from 'uuid';
import {TasksType, TaskType} from '../AppWithReducers';
import {AddTodolistActionType, RemoveTodolistActionType, ADD_TODOLIST, REMOVE_TODOLIST, todolistID1, todolistID2} from './todolists-reducer';

const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

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
    taskStatus: boolean
}

type ActionsType = AddTaskActionType
| RemoveTaskActionType
| ChangeTaskTitleActionType
| ChangeTaskStatusActionType
| AddTodolistActionType
| RemoveTodolistActionType

const initializationState:TasksType = {
    [todolistID1]:
        [
            {taskId: v1(), taskTitle: 'HTML&CSS', taskIsDoneStatus: true},
            {taskId: v1(), taskTitle: 'JS', taskIsDoneStatus: true},
            {taskId: v1(), taskTitle: 'ReactJS', taskIsDoneStatus: false},
            {taskId: v1(), taskTitle: 'Rest API', taskIsDoneStatus: false},
            {taskId: v1(), taskTitle: 'GraphQL', taskIsDoneStatus: false},
        ],
}

export function tasksReducer(objTasks:TasksType = initializationState, action:ActionsType):TasksType {

    let copyObjTasks:TasksType

    switch (action.type) {
        case ADD_TASK:
            const newTask:TaskType = {taskId: v1(), taskTitle: action.titleOfNewTask, taskIsDoneStatus: false}
            copyObjTasks = {...objTasks, [action.todolistID]: [newTask, ...objTasks[action.todolistID]]}
            return copyObjTasks
        case REMOVE_TASK:
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].filter(t => t.taskId !== action.taskID)}
            return copyObjTasks
        case CHANGE_TASK_TITLE:
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.taskId === action.taskID  ? {...t, taskTitle: action.newTaskTitle} : t)}
            return copyObjTasks
        case CHANGE_TASK_STATUS:
            copyObjTasks = {...objTasks, [action.todolistID]: objTasks[action.todolistID].map(t => t.taskId === action.taskID ? {...t, taskIsDoneStatus: action.taskStatus} : t)}
            return copyObjTasks
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
export function changeTaskStatusAC(todolistID:string, taskID:string, taskStatus:boolean):ChangeTaskStatusActionType {
    return {type: CHANGE_TASK_STATUS, todolistID, taskID, taskStatus}
}