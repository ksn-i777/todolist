import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {UniversalAddItemForm} from './components/UniversalAddItemForm';
import {AppBarComponent} from './components/AppBarComponent';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
};
export type TasksType = {
    [key: string]: Array<TaskType>,
};
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
};

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]:
            [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
            ],
        [todolistID2]:
            [
                {id: v1(), title: 'Book', isDone: true},
                {id: v1(), title: 'Milk', isDone: false},
                {id: v1(), title: 'Bred', isDone: true},
                {id: v1(), title: 'Pasta', isDone: false},
                {id: v1(), title: 'Pencil', isDone: true},
            ],
    });

    function addTask(newTaskText:string, todolistID:string):void {
        const newTask: TaskType = {id: v1(), title: newTaskText, isDone: false};
        const todolistTasks:Array<TaskType> = tasks[todolistID];
        tasks[todolistID] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }

    function removeTask(taskID:string, todolistID:string):void {
        const todolistTasks:Array<TaskType> = tasks[todolistID];
        tasks[todolistID] = todolistTasks.filter(task => task.id !== taskID);
        setTasks({...tasks});
    }

    function changeFilter(value:FilterValuesType, todolistID:string):void {
        const todolist:TodolistType|undefined = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists]);
    }

    function changeTaskStatus(taskID:string, isDone:boolean, todolistID:string):void {
        const todolistTasks:Array<TaskType> = tasks[todolistID];
        const task:TaskType|undefined = todolistTasks.find(task => task.id === taskID);
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks});
    }

    function removeTodolist(todolistID:string):void {
        const todolistsAfterRemove:Array<TodolistType> = todolists.filter(tl => tl.id !== todolistID);
        setTodolists(todolistsAfterRemove);

        delete tasks[todolistID];
        setTasks({...tasks});
    }

    function addTodolist(newInputText:string):void {
        const todolist:TodolistType = {id: v1(), title: newInputText, filter: 'all'}
        const newTodolists = [todolist, ...todolists]
        setTodolists(newTodolists)
        setTasks({[todolist.id]: [], ...tasks})
    }

    function changeTaskTitle(todolistID:string, taskID:string, newTaskTitle:string):void {
        const needTask:TaskType|undefined = tasks[todolistID].find(task => task.id === taskID)
        if (needTask) {
            needTask.title = newTaskTitle
        }
        setTasks({...tasks})
    }

    function changeTodolistTitle(newTitle:string, todolistID:string):void {
        const todolist:TodolistType|undefined = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = newTitle
        }
        setTodolists([...todolists])
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
                                <UniversalAddItemForm callback={addTodolist}/>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid style={{marginTop: '30px', justifyContent: 'flex-start', gap: '30px'}} container>
                    {todolists.map(tl => {

                        let filteredTasksByFilter = tasks[tl.id];
                        if (tl.filter === 'active') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => !task.isDone);
                        }
                        if (tl.filter === 'completed') {
                            filteredTasksByFilter = tasks[tl.id].filter(task => task.isDone);
                        }

                        return (
                            <Paper style={{padding: '10px'}} elevation={3}>
                                <Grid item>
                                    <Todolist
                                        key={tl.id}
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasksByFilter}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
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

export default App