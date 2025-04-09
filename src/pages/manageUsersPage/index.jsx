import React, {useEffect, useState} from 'react'
import {TextField, Typography, Button, Box, Grid} from '@mui/material'
import Navbar from '../../components/NavBar'
import {useSelector, useDispatch } from "react-redux";
import {updateUser} from '../../state'
import { Navigate } from 'react-router-dom';

const ManageUsersPage = () => {
    const user = useSelector((state) => state.user)
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
      try {
          const response = await fetch(`http://localhost:3001/users/adminGetAllUser?username=${user.username}&userType=${user.userType}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });

          if (!response.ok) {
              throw new Error('Failed to fetch orders')
          }
          const data = await response.json();
          setUsers(data);
      } catch (error) {
          console.error("Error: " + error);
      }
  };

    useEffect(() =>{
      fetchUsers()
    }, [])


    if (user?.userType !== "admin") {
      return <Navigate to="/pageNotFound" />;
    }

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
        <Typography variant="h4" color="#ba3a46" fontWeight="bold" gutterBottom>
          System Users
        </Typography>

        <Box
          style={{ width: '100%', color: 'white'}}
          display="flex"
          flexDirection="column"
          gap="12px"
        >
          {users.length === 0 ? (
            <Typography variant="subtitle1" color="white">No users to display</Typography>
          ) : (
            users.map((users, index) => (
              <Box
                key={index}
                p={2}
                sx={{
                  bgcolor: '#222b3d',
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                <Typography variant="body1">
                  <strong>User:</strong> {users.username}
                </Typography>

                <Typography variant="body2">
                  <strong>Email:</strong> {users.email}
                </Typography>

                <Typography variant="body2">
                  <strong>Role:</strong> {users.userType}
                </Typography>

                <Typography variant="body2">
                  <strong>Creation Date:</strong> {new Date(users.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          )}
        </Box>
                
        </Box>
       </>
    )
}

export default ManageUsersPage;