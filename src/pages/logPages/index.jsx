import React, {useEffect, useState} from 'react'
import {TextField, Typography, Button, Box, Grid} from '@mui/material'
import Navbar from '../../components/NavBar'
import {useSelector, useDispatch } from "react-redux";
import {updateUser} from '../../state'
import { Navigate } from 'react-router-dom';

const LogPage = () => {
    const user = useSelector((state) => state.user);
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
      try {
          const response = await fetch(`http://localhost:3001/logs/adminLogs?username=${user.username}&userType=${user.userType}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
          if (!response.ok) {
              throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setLogs(data);
      } catch (error) {
          console.error("Error: " + error);
      }
  };

    useEffect(() =>{
      fetchLogs()
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
          System Logs
        </Typography>

        <Box
          style={{ width: '100%', color: 'white'}}
          display="flex"
          flexDirection="column"
          gap="12px"
        >
          {logs.length === 0 ? (
            <Typography variant="subtitle1" color="white">No logs to display</Typography>
          ) : (
            logs.map((log, index) => (
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
                  <strong>User:</strong> {log.username}
                </Typography>

                {log.errorType
                  ? (
                    <Typography variant="body2">
                      <strong>Error Type:</strong> {log.errorType}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      <strong>User Type:</strong> {log.userType}
                    </Typography>
                  )
                }

                <Typography variant="body2">
                  <strong>Message:</strong> {log.message}
                </Typography>

                <Typography variant="body2">
                  <strong>Time:</strong> {new Date(log.updatedAt).toLocaleString()}
                </Typography>
              </Box>
            ))
          )}
        </Box>
                
        </Box>
       </>
    )
}

export default LogPage;