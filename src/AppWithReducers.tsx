import React, { useReducer } from 'react';
import './App.css';
import { Todolist } from './components/Todolist';
import { v1 } from 'uuid';
import { UniversalAddItemForm } from './components/UniversalAddItemForm';
import { AppBarComponent } from './components/AppBarComponent';
import { Container, Grid, Paper } from '@mui/material';
import { todolistsReducer, addTodolistAC, removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } from './state/todolists-reducer';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC } from './state/tasks-reducer';

export type TodolistFilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    todolistId: string,
    todolistTitle: string,
    todolistFilter: TodolistFilterValuesType,
};

export type TaskType = {
    taskId: string,
    taskTitle: string,
    taskIsDoneStatus: boolean,
};
export type TasksType = {
    [key: string]: Array<TaskType>,
};

export function AppWithReducers() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {todolistId: todolistID1, todolistTitle: 'What to learn', todolistFilter: 'all'},
        {todolistId: todolistID2, todolistTitle: 'What to buy', todolistFilter: 'all'},
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]:
            [
                {taskId: v1(), taskTitle: 'HTML&CSS', taskIsDoneStatus: true},
                {taskId: v1(), taskTitle: 'JS', taskIsDoneStatus: true},
                {taskId: v1(), taskTitle: 'ReactJS', taskIsDoneStatus: false},
                {taskId: v1(), taskTitle: 'Rest API', taskIsDoneStatus: false},
                {taskId: v1(), taskTitle: 'GraphQL', taskIsDoneStatus: false},
            ],
        [todolistID2]:
            [
                {taskId: v1(), taskTitle: 'Book', taskIsDoneStatus: true},
                {taskId: v1(), taskTitle: 'Milk', taskIsDoneStatus: false},
                {taskId: v1(), taskTitle: 'Bred', taskIsDoneStatus: true},
                {taskId: v1(), taskTitle: 'Pasta', taskIsDoneStatus: false},
                {taskId: v1(), taskTitle: 'Pencil', taskIsDoneStatus: true},
            ],
    });

    function addTodolist(titleOfNewTodolist:string):void {
        const action = addTodolistAC(titleOfNewTodolist)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function removeTodolist(todolistID:string):void {
        const action = removeTodolistAC(todolistID)
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }
    function changeTodolistTitle(todolistID:string, newTodolistTitle:string):void {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, newTodolistTitle))
    }
    function changeTodolistFilter(todolistID:string, newTodolistFilter:TodolistFilterValuesType):void {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, newTodolistFilter));
    }

    function addTask(todolistID:string, titleOfNewTask:string):void {
        dispatchToTasks(addTaskAC(todolistID, titleOfNewTask));
    }
    function removeTask(todolistID:string, taskID:string):void {
        dispatchToTasks(removeTaskAC(todolistID, taskID));
    }
    function changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, newTaskTitle))
    }
    function changeTaskStatus(todolistID:string, taskID:string, taskStatus:boolean):void {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, taskStatus));
    }

    return (
        <div className="App">
            <AppBarComponent/>
            <Container style={{padding: '30px', margin: '0', maxWidth: '100%'}} fixed>
                <Grid container>
                    <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                        <Grid item>
                            <div>
                                <h3 style={{margin: '0 0 5px 0'}}>Add new todolist</h3>
                                <UniversalAddItemForm what={'todolist name'} callback={addTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {

                        let filteredTasksByFilter = tasks[tl.todolistId];
                        if (tl.todolistFilter === 'active') {
                            filteredTasksByFilter = tasks[tl.todolistId].filter(task => !task.taskIsDoneStatus);
                        }
                        if (tl.todolistFilter === 'completed') {
                            filteredTasksByFilter = tasks[tl.todolistId].filter(task => task.taskIsDoneStatus);
                        }

                        return (
                            <Paper key={tl.todolistId} style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        todolistId={tl.todolistId}
                                        todolistTitle={tl.todolistTitle}
                                        todolistFilter={tl.todolistFilter}
                                        tasks={filteredTasksByFilter}

                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTodolistFilter={changeTodolistFilter}

                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
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