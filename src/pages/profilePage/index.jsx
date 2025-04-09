import React, {useEffect, useState} from 'react'
import {TextField, Typography, Button, Box, Grid} from '@mui/material'
import Navbar from '../../components/NavBar'
import {useSelector, useDispatch } from "react-redux";
import {updateUser} from '../../state'

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const [phone_num, setPhoneNum] = useState ()
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false)

    const updateDetails = async () => {
        const updatedProfile = await fetch(
            "http://localhost:3001/users/updateProfile",
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                id: user._id,
                phone_num: phone_num,
              })
            }
          )
        
        const getUpdatedUser = await fetch(`http://localhost:3001/users/${user._id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json",
                       "Authorization": `Bearer ${token}` },
        })
        console.log(token)
        if (!getUpdatedUser.ok) {
          console.error('Failed to fetch user data')
        }else{
          const updatedUser = await getUpdatedUser.json()
          dispatch(updateUser({user : updatedUser}))
        }
        
        
    }

    if(user){
      var username = user.username
      var CPhone = user.phone_num
      var CEmail = user.email
    }

    useEffect(() =>{
      setPhoneNum(CPhone)

  }, [])
  if(isEdit && username){
    return(
       <><Navbar/>
        <Box
                    style={{ padding: '2% 10% 5% 10%' }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems= "center"
                    gap="20px"
                    sx={{
                        margin: 'auto',
                        borderRadius: 1,
                        bgcolor: '#111823',
                        width: '70%',
                        height: '50%',
                        textAlign: 'center',
                    }}
                >
            <TextField
                fullWidth
                label="EMAIL"
                value= {CEmail}
                variant='filled'
                sx={{
                    input: {
                      backgroundColor: '#E8e4c9', // input background
                    },
                    label: {
                      color: 'white', // label color
                    },
                  }}
                InputLabelProps={{ style: {color: 'black'}}}
                autoComplete='false'
                disabled
                
                />
            <TextField
                fullWidth
                label="PHONE NUMBER"
                defaultValue= {CPhone}
                variant='filled'
                sx={{
                    input: {
                      backgroundColor: '#E8e4c9', // input background
                    },
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                    },
                    label: {
                      color: 'white', // label color
                    },
                  }}
                InputLabelProps={{ style: {color: 'black'}}}
                autoComplete='false'
                onChange = {(e) => setPhoneNum(e.target.value)}
                type ="number"
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
                width:'15%'
              }}
              onClick={() => {
                updateDetails()
                setIsEdit(!isEdit)
              }}
              >
              Save
            </Button>

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
                width:'15%'
              }}
              onClick={() => {window.location.reload()}}
              >
              Revert Changes
            </Button>
                
        </Box>
       </>
    )
  }else if (username && !isEdit){
    return(
      <><Navbar/>
       <Box
                   style={{ padding: '2% 10% 5% 10%' }}
                   display="flex"
                   flexDirection="column"
                   justifyContent="center"
                   alignItems='center'
                   gap="20px"
                   sx={{
                       color: '#ba3a46',
                       margin: 'auto',
                       borderRadius: 1,
                       bgcolor: '#111823',
                       width: '70%',
                       height: '50%',
                   }}
               >
           <h3>EMAIL:</h3>
           <Typography>{CEmail}</Typography>

           <h3>Contact Number:</h3>
           <Typography>{CPhone}</Typography>
           <Grid container spacing={2} sx={{ textAlign: 'center', padding: '2% 2% 5% 2%', display: 'flex' }}>
                {/* First Column */}
                <Grid item xs={12} sm={12} md={5.5} lg={5.5} ml={5} sx={{ flexFlow: 'column' }}>
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
                        width:'70%'
                        }}
                        onClick={() => {
                        setIsEdit(!isEdit)
                        }}
                        >
                        Edit Details
                    </Button>        
                </Grid>
    
                {/* Second Column */}
                <Grid item xs={12} sm={12} md={5.5} lg={5.5} sx={{ flexFlow: 'column' }}>
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
                        width:'50%'
                        }}
                        onClick={() => {
                        setIsEdit(!isEdit)
                        }}
                        >
                        Change Password
                    </Button>          
                </Grid>
            </Grid> 
       </Box>
      </>
     )
  }
}

export default ProfilePage;