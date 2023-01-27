import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, AppStateType } from '../store/store'
import { ErrorType, setAppErrorAC } from '../store/app-reducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {

    const error = useSelector<AppStateType, ErrorType>(st => st.app.error)
    const dispatch = useDispatch<AppDispatchType>()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}