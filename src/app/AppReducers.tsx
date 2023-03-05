import React, { useReducer } from 'react'
import { v1 } from 'uuid'
import { Container, Grid, Paper } from '@mui/material'
import { AddItemForm, AppBarComponent } from 'common/components'
import { Todolist } from 'features/todolists/Todolist'
import {
  todolistsReducer, createTodolistAC, deleteTodolistAC, updateTodolistTitleAC, updateTodolistFilterAC, TodolistFilterValuesType
} from 'features/todolists/todolists-reducer'
import { tasksReducer, createTaskAC, deleteTaskAC, updateTaskTitleAC, updateTaskStatusAC } from 'features/tasks/tasks-reducer'
import { TaskPriority, TaskStatus } from 'features/tasks/tasks-api'

export function AppReducers() {

  const todolistID1 = v1()
  const todolistID2 = v1()

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', todolistFilter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
    { id: todolistID2, title: 'What to buy', todolistFilter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]:
      [
        { id: v1(), title: 'HTML&CSS', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'JS', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'ReactJS', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'Rest API', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'GraphQL', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
      ],
    [todolistID2]:
      [
        { id: v1(), title: 'Book', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'Milk', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'Bred', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'Pasta', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
        { id: v1(), title: 'Pencil', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '' },
      ],
  })

  function addTodolist(titleOfNewTodolist: string): void {
    const todolist = {
      id: v1(),
      title: titleOfNewTodolist,
      status: TaskStatus.Completed,
      completed: true,
      todoListId: todolistID2,
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: ''
    }
    dispatchToTodolists(createTodolistAC({ todolist: todolist })) //redux toolkit
    dispatchToTasks(createTodolistAC({ todolist: todolist }))     //redux toolkit
    //dispatchToTodolists(createTodolistAC(todolist))             //redux
    //dispatchToTasks(createTodolistAC(todolist))                 //redux
  }
  function removeTodolist(todolistID: string): void {
    dispatchToTodolists(deleteTodolistAC({ id: todolistID }))     //redux toolkit
    dispatchToTasks(deleteTodolistAC({ id: todolistID }))         //redux toolkit
    //dispatchToTodolists(deleteTodolistAC(todolistID))           //redux
    //dispatchToTasks(deleteTodolistAC(todolistID))               //redux
  }
  function changeTodolistTitle(todolistID: string, newTodolistTitle: string): void {
    dispatchToTodolists(updateTodolistTitleAC({ id: todolistID, title: newTodolistTitle }))   //redux toolkit
    //dispatchToTodolists(updateTodolistTitleAC(todolistID, newTodolistTitle))                //redux
  }
  function changeTodolistFilter(todolistID: string, newTodolistFilter: TodolistFilterValuesType): void {
    dispatchToTodolists(updateTodolistFilterAC({ id: todolistID, filter: newTodolistFilter }))    //redux toolkit
    //dispatchToTodolists(updateTodolistFilterAC(todolistID, newTodolistFilter))                  //redux
  }

  function addTask(todolistID: string, titleOfNewTask: string): void {
    const task = {
      id: v1(),
      title: titleOfNewTask,
      status: TaskStatus.New,
      entityStatus: 'idle',
      completed: false,
      todoListId: todolistID,
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: ''
    }
    dispatchToTasks(createTaskAC({ todolistID: todolistID, task: task }))   //redux toolkit
    //dispatchToTasks(createTaskAC(todolistID, task))                       //redux
  }
  function removeTask(todolistID: string, taskID: string): void {
    dispatchToTasks(deleteTaskAC({ todolistID, taskID }))                   //redux toolkit
    //dispatchToTasks(deleteTaskAC(todolistID, taskID))                     //redux
  }
  function changeTaskTitle(todolistID: string, taskID: string, newTaskTitle: string): void {
    dispatchToTasks(updateTaskTitleAC({ todolistID, taskID, taskTitle: newTaskTitle })) //redux toolkit
    //dispatchToTasks(updateTaskTitleAC(todolistID, taskID, newTaskTitle))              //redux
  }
  function changeTaskStatus(todolistID: string, taskID: string, taskStatus: TaskStatus): void {
    dispatchToTasks(updateTaskStatusAC({ todolistID, taskID, taskStatus })) //redux toolkit
    //dispatchToTasks(updateTaskStatusAC(todolistID, taskID, taskStatus))   //redux
  }

  return (
    <div className="App">
      <AppBarComponent />
      <Container style={{ padding: '30px', margin: '0', maxWidth: '100%' }} fixed>
        <Grid container>
          <Paper style={{ padding: '10px', backgroundColor: '' }} elevation={3}>
            <Grid item>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>Add new todolist</h3>
                <AddItemForm what={'todolist name'} callback={addTodolist} />
              </div>
            </Grid>
          </Paper>
        </Grid>
        <Grid style={{ marginTop: '30px', justifyContent: 'flex-start', gap: '30px' }} container>
          {todolists.map(tl => {

            let filteredTasksByFilter = tasks[tl.id]
            if (tl.todolistFilter === 'active') {
              filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.New)
            }
            if (tl.todolistFilter === 'completed') {
              filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.Completed)
            }

            return (
              <Paper key={tl.id} style={{ padding: '10px' }} elevation={3}>
                <Grid item>
                  <Todolist
                    todolistId={tl.id}
                    todolistTitle={tl.title}
                    todolistFilter={tl.todolistFilter}
                    todolistEntityStatus={tl.entityStatus}
                    tasks={filteredTasksByFilter}

                    deleteTodolist={removeTodolist}
                    updateTodolistTitle={changeTodolistTitle}
                    updateTodolistFilter={changeTodolistFilter}

                    createTask={addTask}
                    deleteTask={removeTask}
                    updateTaskTitle={changeTaskTitle}
                    updateTaskStatus={changeTaskStatus}
                  />
                </Grid>
              </Paper>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}