import React, {useState, useEffect} from 'react'
import {TextField, Typography, Button, Box, MenuItem} from '@mui/material'
import {Formik} from "formik"
import * as yup from 'yup'
import Navbar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {setLogin} from '../../state'


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();


const sampleQuestions = [
   "What is the name of the first school you attended?",
   "What is the name of your childhood best friend?",
   "What was the make and model of your first car?",
   "What is the name of the street you lived on when you were 10?",
   "What was the name of your first pet?",
   "What is the title of the first movie you saw in a theater?"
]


const signupSchema = yup.object().shape({
  email: yup.string()
    .matches(/^[^@]+@[^@]+\.(com)$/, 'Email must contain "@" and end with ".com"')
    .required("required"),
  username:  yup.string()
    .required("required"),
  password: yup.string()
    .min(10, 'Password must be at least 10 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required("required"),
  securityAnswer: yup.string()
    .max(50, 'Password at most 10 characters')
    .required("Security answer is required")
})

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
})

const initialValuesReg = {
    username: "",
    password: "",  
    email: "",
    userType: "customer",
    phone_num: "",
    securityQuestion: "",
    securityAnswer: "", 
  };

const initialValuesLog ={
  username:"",
  password:"",
  userType: "customer",
  message:""
}

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
      if (loggedIn.user.userType === "admin") {
        alert("Here's what we got: \n" + "Username: " + loggedIn.user.username + "\n Password: " + loggedIn.user.password);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/logs");
      } 
      else if (loggedIn.user.userType === "manager") {
        alert("Here's what we got: \n" + "Username: " + loggedIn.user.username + "\n Password: " + loggedIn.user.password);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/");
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
      alert(loggedIn.msg);
    }
    else {
      alert(loggedIn.msg);
    }
  }

  const registerUser = async (values, onSubmitProps) => {
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
          phone_num: "",
          securityQuestion: values.securityQuestion,
          securityAnswer: values.securityAnswer
        })
      }
    )

    const savedUser = await savedUserResponse.json()
    console.log(savedUser)

    console.log("registering in user: " + savedUser.email + values.username);
    onSubmitProps.resetForm()
    
    
    if (savedUser){
      if (values.username.toLowerCase() !== "" && values.password !== "" && values.email !== "") {
        console.log("Log payload:", {
            username: values.username,
            message: "failed to register.",
            userType: values.userType,
          })
        alert(values.username + " registered successfully!");
        setIsLogin(!isLogin)
      } 

      else {
        alert("Invalid Credentials!");
        
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
            {!isLogin && (
            
            <TextField
              select
              fullWidth
              label="Select Security Question"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.securityQuestion}
              name="securityQuestion"
              variant="filled"
              error={Boolean(touched.securityQuestion) && Boolean(errors.securityQuestion)}
              helperText={touched.securityQuestion && errors.securityQuestion}
              sx={{
                textAlign: 'left',
                '& .MuiSelect-filled': {
                  backgroundColor: '#E8e4c9',
                  color: 'black',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { color: 'black' } }}
            >
              {sampleQuestions.map((question, index) => (
                <MenuItem
                  key={index}
                  value={question}
                >
                  {question}
                </MenuItem>
              ))}
            </TextField>
    
            )}

            {!isLogin && (
            <TextField
                fullWidth
                label="Answer to Security Question"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.securityAnswer}
                name="securityAnswer"
                variant="filled"
                error={Boolean(touched.securityAnswer) && Boolean(errors.securityAnswer)}
                helperText={touched.securityAnswer && errors.securityAnswer}
                sx={{
                input: { backgroundColor: '#E8e4c9' },
                label: { color: 'white' },
                }}
                InputLabelProps={{ style: { color: 'black' } }}
            />
            
            )}

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