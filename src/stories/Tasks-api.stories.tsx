import React, {useEffect, useState} from 'react'
import {tasksAPI} from '../api/tasks-api'


export default {
   title: 'API'
}

const todolistID = '4deef941-ee5d-432e-9952-286625398b24'
const taskID = 'caa7042f-ff17-4129-b5d2-e627a912bd77'
const taskTitle = 'TD3-TASK2'

export const GetTasks = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.getTasks(todolistID).then(res => {setState(res.data)})
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
        tasksAPI.createTask(todolistID, taskTitle).then(res => {setState(res.data)})
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
        tasksAPI.updateTaskTitle(todolistID, taskID, taskTitle).then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}