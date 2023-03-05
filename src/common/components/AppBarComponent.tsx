import React from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Box, Button, LinearProgress, Toolbar, Typography } from '@mui/material'
import { useCustomAppDispatch } from 'app/store'
import * as appSelectors from 'app/selectors'
import * as authSelectors from 'features/auth/selectors'
import { logoutTC } from 'features/auth/auth-reducer'

export function AppBarComponent() {

  const dispatch = useCustomAppDispatch()
  const requestStatus = useSelector(appSelectors.requestStatus)
  const isLogin = useSelector(authSelectors.isLogin)

  function logout() {
    dispatch(logoutTC())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={'inherit'}>
        <Toolbar>
          <Typography color="secondary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          {isLogin && <Button onClick={logout} color="secondary">Log out</Button>}
        </Toolbar>
        {requestStatus === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
    </Box>
  )
}