'use client'
import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'
// import CommonSnackBars from '@/components/snackBars/CommonSnackBar';
import { Group, Visibility, VisibilityOff } from '@mui/icons-material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        EMS-Portal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}

    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Login = () => {
  const [value, setValue] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const [input , setInput] = useState<{ email:string, password: string }>({
        email:"",
        password:""
    })

    const handleNormalInputs = (e:any) => {
      const { name, value } = e.target
      setInput({ ...input, [name]: value })
      console.log(input, "inputs")
    } 

    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
    })

    


    const userLogin = () => {
      schema.validate(input)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
      const response = axios.post('https://admin-dashboard-fc3h.onrender.com/employee/login',{ email:input.email, password:input.password }).then(res => {
      console.log(res.data, "resData")
      // setValue(true)
      const  access_token: string  = res.data.access_token;
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('role', res.data.data.role)
      localStorage.setItem('user_Id', JSON.stringify(res.data.data._id))
      router.push('/dashboard')
      })
    }

    const handleSubmit = (e:any) => {
      e.preventDefault()
      userLogin()
    }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

   const paperStyle={padding :20,height:'70vh',maxWidth:400, margin:"20px auto", borderRadius: "30px"}

  return (
    <>
     <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Group />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
           <Paper elevation={10} style={paperStyle}>
           <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                    <Typography
                        color="black"
                        gutterBottom
                        variant="h5"
                    >
                        Hi, Welcome Back
                    </Typography>
                    <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign="center"
                    >
                        Enter your credentials to continue
                    </Typography>
                </Stack>
            </Grid>
        <Box>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleNormalInputs(e)}
              value={ input.email }
              
            />

            <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
              name="password"
            onChange={(e) => handleNormalInputs(e)}
            value={ input.password }
            type={ showPassword ? 'text' : 'password' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  { showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
    </Paper>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    {/* <CommonSnackBars value={ value } setValue={ setValue } /> */}
    </>
  )
}

export default Login