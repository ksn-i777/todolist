import React, {useEffect, useState} from 'react'
import {api} from '../api/api'


export default {
   title: 'API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      api.getTodolists().then(res => {setState(res.data)})
   }, [])
   return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      api.createTodolist('TODOLIST4').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      api.deleteTodolist('9313d337-ff06-41bf-a925-8a1d11d02404').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      api.updateTodolistTitle('9313d337-ff06-41bf-a925-8a1d11d02404', 'todolist').then(res => {setState(res.data)})
   }, [])

   return <div>{JSON.stringify(state)}</div>
}