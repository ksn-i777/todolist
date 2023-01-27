import React from 'react'
import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, AppStateType } from '../store/store'
import { RequestStatusType } from '../store/app-reducer'
import { logoutTC } from '../store/auth-reducer'

export function AppBarComponent() {

    const requestStatus = useSelector<AppStateType, RequestStatusType>(st => st.app.requestStatus)
    const isLogin = useSelector<AppStateType, boolean>(st => st.auth.isLogin)
    const dispatch = useDispatch<AppDispatchType>()

    function logout() {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color={'inherit'}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{mr: 2}}
                    ><Menu/>
                    </IconButton>
                    <Typography color="secondary" variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    {isLogin && <Button onClick={logout} color="secondary">Log out</Button>}
                </Toolbar>
                {requestStatus === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
        </Box>
    )
}