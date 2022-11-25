import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Center from './center'
import useForm from '../hooks/useForm'
import { createAPIEndpoint ,ENDPOINTS } from '../api'
import { useNavigate } from 'react-router'
import useStateContext from '../hooks/useStateContext'

const getFreshModel = () => ({
    name: '',
    email: ''
})

function Login() {

    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
       //eslint-disable-next-line
        temp.name = values.name != "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if (validate())
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then(res => {
                    console.log('sending',values);
                    console.log('reseiving',res.data);
                    setContext({ participantId: res.participantId })
                    navigate('/quiz')
                })
                .catch(err => console.log(err))
    }


  return (
    <Center >
            <Card sx={{ width: 400 }}>
                <CardContent className='windowimg' sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Quiz App
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 3,
                            width: '90%'
                        }
                    }}
                    >
                        <form noValidate autoComplete="on" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="Name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.name && { error: true, helperText: errors.name })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '30%' ,mt : '66' }}>Start</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
  )
}

export default Login