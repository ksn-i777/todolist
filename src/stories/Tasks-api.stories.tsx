import React, {useEffect, useState} from 'react'
import {tasksAPI} from '../api/api'


export default {
   title: 'API'
}

const todolistID = '4deef941-ee5d-432e-9952-286625398b24'
const taskID = '4f1f143d-e063-4b44-a77d-d14de2b7c246'
const task = {
   description: '',
   title: 'FFFF',
   completed: false,
   status: 0,
   priority: 0,
   startDate: '',
   deadline: '',
   id: taskID,
   todoListId: todolistID,
   order: 0,
   addedDate: '',
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.getTasks(todolistID).then(res => {setState(res)})
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.createTask(todolistID, 'WWWW').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.deleteTask(todolistID, taskID).then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.updateTask(todolistID, taskID, task).then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}