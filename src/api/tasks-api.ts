import axios from 'axios'

const commonInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
	withCredentials: true,
	headers: {
        'API-KEY': '2747a036-30e1-438f-a28d-363ba79ced59'
    }
})

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
/*
type CreateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}
type DeleteTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type UpdateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TaskType
    }
}
ниже общая типизация подходящая для этих трех */

type ResponseType<D = {item: TaskType}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const tasksAPI = {
    getTasks(todolistID: string) {
        return commonInstance.get<GetTasksResponseType>(todolistID+'/tasks')
    },
    createTask(todolistID: string, title: string) {
        return commonInstance.post<ResponseType>(todolistID + '/tasks', {title})
    },
    deleteTask(todolistID: string, taskID: string) {
        return commonInstance.delete<ResponseType<{}>>(todolistID + '/tasks/' + taskID)
    },
    updateTaskTitle(todolistID: string, taskID: string, title: string) {
        const payloud = {
            title,
            description: null,
            completed: false,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        }
        return commonInstance.put<ResponseType>(todolistID + '/tasks/' + taskID, payloud)
    },
}