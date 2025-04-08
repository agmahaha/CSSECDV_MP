import React, {useState} from 'react'
import {TextField, Typography, Button, Box} from '@mui/material'
import {Formik} from "formik"
import * as yup from 'yup'
import Navbar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {setLogin} from '../../state'


const signupSchema = yup.object().shape({
  email: yup.string()
    .matches(/^[^@]+@[^@]+\.(com)$/, 'Email must contain "@" and end with ".com"')
    .required("required"),
  username:  yup.string()
    .required("required"),
  password: yup.string()
    .min(10, 'Password must be at least 10 characters')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required("required"),
})

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
})

const initialValuesReg = {
  username:"",
  password:"",  
  email:"",
  userType: "customer",
  address:"",
  phone_num:"",
  name:""
}

const initialValuesLog ={
  username:"",
  password:"",
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async(values, onSubmitProps) => {
    if (isLogin === true) await loginUser(values, onSubmitProps);
    if (isLogin === false) await registerUser(values, onSubmitProps);
  };

  const loginUser = async (values, onSubmitProps) => {
    console.log("logging in user: " + values.username);
    
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:  JSON.stringify(values)
      }
    )

    const loggedIn = await loggedInResponse.json()
    console.log(loggedIn)
    console.log("logging in user: " + loggedIn.token);
    onSubmitProps.resetForm()

    if (loggedInResponse.status === 200){
      if (loggedIn.user.userType === "admin" || loggedIn.user.userType === "employee") {
        alert("Here's what we got: \n" + "Username: " + loggedIn.user.username + "\n Password: " + loggedIn.user.password);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/employee/home");
      } 
      else if (loggedIn.user.userType === "customer") {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }
    }
    else {
      alert("invalid Username and Password!");
    }
  }

  const registerUser = async (values, onSubmitProps) => {
    console.log(values.userType)

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          email: values.email,
          userType: "customer",
          address: "",
          phone_num: "",
          name:""
        })
      }
    )

    const savedUser = await savedUserResponse.json()

    console.log("registering in user: " + savedUser.email + values.username);
    onSubmitProps.resetForm()
    
    
    if (savedUser){
      if (values.username.toLowerCase() !== "" && values.password !== "" && values.email !== "") {
        alert(values.username + " registered successfully!");
        setIsLogin(!isLogin)
      } 

      else {
        alert("invalid Credentials!");
      }
    }
    
  }

  return (
    <><Navbar />
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLog : initialValuesReg}
      validationSchema={isLogin ? loginSchema : signupSchema}
    >
      {({
        values, 
        errors, 
        touched, 
        handleBlur, 
        handleChange, 
        handleSubmit, 
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            style={{ marginTop: '80px', padding: '2% 10% 5% 10%' }}
            display="grid"
            gap="20px"
            sx={{
              margin: 'auto',
              borderRadius: 1,
              bgcolor: '#111823',
              width: '70%',
              height: '50%',
              left: 0,
              right: 0,
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#ba3a46',
                fontWeight: 'bold',
              }}>
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Typography>

            {!isLogin && (
              <TextField
                fullWidth
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                variant='filled'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                    input: {
                      backgroundColor: '#E8e4c9', // input background
                    },
                    label: {
                      color: 'white', // label color
                    },
                  }}
                InputLabelProps={{ style: {color: 'black'}}}
                />
            )}

            <TextField
              fullWidth
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              variant='filled'
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{
                input: {
                  backgroundColor: '#E8e4c9', // input background
                },
                label: {
                  color: 'white', // label color
                },
              }}
              InputLabelProps={{ style: {color: 'black'}}}
              />
            <TextField
              fullWidth
              type='password'
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              variant='filled'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                input: {
                  backgroundColor: '#E8e4c9', // input background
                },
                label: {
                  color: 'white', // label color
                },
              }}
              InputLabelProps={{ style: {color: 'black'}}}
              />
            <Button
              variant='contained'
              type='submit'
              name='submit'
              sx={{
                color: 'black',
                bgcolor: 'white',
                "&:hover": {
                  color: 'white',
                  bgcolor: '#ba3a46'
                },
              }}
              >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>
            <Typography
              onClick={() => {
                setIsLogin(!isLogin)
                resetForm()
              } }
              sx={{
                color: 'White',
                textDecoration: 'underline',
                "&:hover": {
                  cursor: "pointer",
                  color: "#ba3a46",
                },
              }}
            >
              {isLogin
                ? "Don't have an Account? Register HERE!"
                : "Already have an Account? Log in HERE!"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
    </>
  )
}

export default Login