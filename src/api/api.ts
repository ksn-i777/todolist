import axios from 'axios';

//instance
const commonInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
        'API-KEY': '2606b888-8484-4e56-ac3e-483848e15f9a'
    }
})

//api
export const authAPI = {
    login(data: LoginType) {
        return commonInstance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    me() {
        return commonInstance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logout() {
        return commonInstance.delete<ResponseType>('auth/login')
    }
}

export const todolistsAPI = {
    getTodolists() {
        return commonInstance.get<Array<TodolistTypeFromResponse>>('todo-lists/')
    },
    createTodolist(title: string) {
        return commonInstance.post<ResponseType<{item: TodolistTypeFromResponse}>>('todo-lists/', {title})
    },
    deleteTodolist(todolistID:string) {
        return commonInstance.delete<ResponseType>('todo-lists/' + todolistID)
    },
    updateTodolistTitle(todolistID:string, newTitle:string) {
        return commonInstance.put<ResponseType>('todo-lists/' + todolistID, {title: newTitle})
    },
}

export const tasksAPI = {
    getTasks(todolistID:string) {
        return commonInstance.get<GetTasksResponseType>('todo-lists/' + todolistID + '/tasks')
    },
    createTask(todolistID:string, title: string) {
        return commonInstance.post<ResponseType<{item:TaskType}>>('todo-lists/' + todolistID + '/tasks', {title})
    },
    deleteTask(todolistID:string, taskID:string) {
        return commonInstance.delete<ResponseType>('todo-lists/' + todolistID + '/tasks/' + taskID)
    },
    updateTask(todolistID:string, taskID:string, task:TaskType) {
        return commonInstance.put<ResponseType<{item:TaskType}>>('todo-lists/' + todolistID + '/tasks/' + taskID, task)
    },
}

// types
export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriority {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TodolistTypeFromResponse = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}