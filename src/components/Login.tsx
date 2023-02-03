import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, AppStateType } from '../store/store'
import { loginTC } from '../store/auth-reducer'
import { Navigate } from 'react-router-dom'

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login = () => {

    const isLogin = useSelector<AppStateType, boolean>(st => st.auth.isLogin)
    const dispatch = useDispatch<AppDispatchType>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 3) {
                errors.password = 'Password must be 3 or more symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLogin) {
        return <Navigate to='/' />
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'} target={'_blank'}> here</a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            /* name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            ниже равносильная запись */
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email && <span style={{ color: 'red' }}>{formik.errors.email}</span>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            /* name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            ниже равносильная запись */
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password && <span style={{ color: 'red' }}>{formik.errors.password}</span>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}