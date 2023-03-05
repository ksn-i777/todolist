import axios from 'axios'

//instance
const commonInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
        'API-KEY': '2606b888-8484-4e56-ac3e-483848e15f9a'
    }
})

//api
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

// types
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