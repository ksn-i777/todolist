import React, { useState } from 'react'
import { Todolist } from '../components/Todolist'
import { v1 } from 'uuid'
import { UniversalAddItemForm} from '../components/other/UniversalAddItemForm'
import { AppBarComponent } from '../components/other/AppBarComponent'
import { Container, Grid, Paper } from '@mui/material'
import { TodolistFilterValuesType, TodolistType } from '../store/todolists-reducer'
import { TasksType, DomainTaskType } from '../store/tasks-reducer'
import { TaskPriority, TaskStatus } from '../api/api'

export function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', todolistFilter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', todolistFilter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:
            [
                {id: v1(), title: 'HTML&CSS', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'JS', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'ReactJS', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Rest API', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'GraphQL', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            ],
        [todolistID2]:
            [
                {id: v1(), title: 'Book', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Milk', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Bred', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Pasta', status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
                {id: v1(), title: 'Pencil', status: TaskStatus.Completed, entityStatus: 'idle', completed: true, todoListId: todolistID2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''},
            ],
    });

    function addTodolist(titleOfNewTodolist:string):void {
        const newTodolist:TodolistType = {id: v1(), title: titleOfNewTodolist, todolistFilter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodolist.id]: [], ...tasks})
    }
    function removeTodolist(todolistID:string):void {
        setTodolists(todolists.filter(tl => tl.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    }
    function changeTodolistTitle(todolistID:string, newTodolistTitle:string):void {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTodolistTitle} : tl))
    }
    function changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, todolistFilter: newTodolistFilter} : tl));
    }

    function addTask(todolistID:string, titleOfNewTask:string):void {
        const newTask:DomainTaskType = {id: v1(), title: titleOfNewTask, status: TaskStatus.New, entityStatus: 'idle', completed: false, todoListId: todolistID, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }
    function removeTask(todolistID:string, taskID:string):void {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)});
    }
    function changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTaskTitle} : task)})
    }
    function changeTaskStatus(todolistID:string, taskID:string, taskStatus:TaskStatus):void {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, status: taskStatus} : task)})
    }

    return (
        <div className="App">
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <Grid container>
                    <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                        <Grid item>
                            <div>
                                <h3 style={{display: 'inline'}}>Add new todolist</h3>
                                <UniversalAddItemForm what={'todolist title'} callback={addTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {

                        let filteredTasksByFilter = tasks[tl.id];
                        if (tl.todolistFilter === 'active') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.New);
                        }
                        if (tl.todolistFilter === 'completed') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => task.status === TaskStatus.Completed);
                        }

                        return (
                            <Paper style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        todolistFilter={tl.todolistFilter}
                                        tasks={filteredTasksByFilter}
                                        todolistEntityStatus={tl.entityStatus}

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
    );
}