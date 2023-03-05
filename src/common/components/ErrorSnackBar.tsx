import React from 'react'
import { useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useCustomAppDispatch } from 'app/store'
import { setAppErrorAC } from 'app/app-reducer'
import * as appSelectors from 'app/selectors'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {

  const dispatch = useCustomAppDispatch()
  const error = useSelector(appSelectors.error)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return }
    dispatch(setAppErrorAC({ error: null })) //redux toolkit
    //dispatch(setAppErrorAC(null))          //redux
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}