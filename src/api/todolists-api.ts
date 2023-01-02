import axios from 'axios'

const commonInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
	withCredentials: true,
	headers: {
        'API-KEY': '2747a036-30e1-438f-a28d-363ba79ced59'
    }
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

/*
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data:{}
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data:{}
}
ниже общая типизация подходящая для этих трех */

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        return commonInstance.get<Array<TodolistType>>('')
    },
    createTodolist(title: string) {
        return commonInstance.post<ResponseType<{item: TodolistType}>>('', {title})
    },
    deleteTodolist(todolistID: string) {
        return commonInstance.delete<ResponseType>(todolistID)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return commonInstance.put<ResponseType>(todolistID, {title: newTitle})
    },
}