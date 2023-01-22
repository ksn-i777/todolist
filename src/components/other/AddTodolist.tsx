import React from 'react'
import { Grid, Paper } from '@mui/material'
import { UniversalAddItemForm } from './UniversalAddItemForm'

type AddTodolistPropsType = {
    createTodolist: (titleOfNewTodolist:string) => void
}

export function AddTodolist(props:AddTodolistPropsType) {
    return (
        <Grid container>
            <Paper style={{padding: '10px', backgroundColor: ''}} elevation={3}>
                <Grid item>
                    <div>
                        <h3 style={{margin: '0 0 5px 0'}}>Add new todolist</h3>
                        <UniversalAddItemForm what={'todolist name'} callback={props.createTodolist}/>
                    </div>
                </Grid>
            </Paper>
        </Grid>
    )
}