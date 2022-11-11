import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export function AppBarComponent() {

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
                    <Button color="secondary">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}