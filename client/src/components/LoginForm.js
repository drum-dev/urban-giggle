import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    IconButton,
    TextField,
} from '@mui/material/'
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material'


const LoginForm = () => {
    const { button: buttonStyles } = useBlogTextInfoContentStyles();


    // state values for the password box 
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(values);
        try {
            const { data } = await login({
                variables: { email: values.email, password: values.password },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setValues({
            email: '',
            password: '',
            showPassword: false,
        });
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <FormControl variant="outlined">
            <TextField variant="outlined" label="Email" value={values.email} onChange={handleChange('email')}/><br />
            
            <FormControl variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    variant="outlined"
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl><br />
            <Button className={buttonStyles} type="submit" value="send">Login</Button></FormControl></form>
    )
}

export default LoginForm