import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api'


export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.getTodolists().then(res => {setState(res.data)})
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.createTodolist('TODOLIST3').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.deleteTodolist('f5193833-2afe-41cb-a851-c1735e55f623').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.updateTodolistTitle('f5193833-2afe-41cb-a851-c1735e55f623', 'todolist').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}