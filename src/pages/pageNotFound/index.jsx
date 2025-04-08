import React from 'react'
import { Box, Typography, useTheme} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const PageNotFound = () => {
  const navigate = useNavigate()
  var isCustomer = false
  var loc = '/'
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);

  if (user) {
    var userType = `${user.userType}`;
  }

  if (userType === 'customer'){
    isCustomer = true
    loc = '/'
  }else if (userType === ('admin' || 'employee')){
    isCustomer = false
    loc = '/employee/home'
  }else{
    isCustomer = true
    loc = '/'  
  }

  return (
    <body className='page-not-found-container'>

    <Box bgcolor="white" sx={{ width: '85%', margin: '0 auto', borderRadius: '10px', height:'500px' }}>
            <div className='page-not-found-pad'> 
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <Typography
               sx={{
                color: 'Red',
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
              onClick={() => {
                navigate(loc)
              } }
               >
                {isCustomer? 'Return to Home Page' : 'Return to Employee Page'}
              </Typography>
            </div>
    </Box>
    </body>
    
    
  )
}

export default PageNotFound