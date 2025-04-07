import React, {useEffect, useState} from 'react'
import {AppBar, Toolbar, Typography, Tabs, Tab, MenuItem, Menu, Select, InputBase, FormControl, InputLabel, Input, Avatar}from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import Logo from './keyanwhite.PNG'
import Logo2 from './pinkLogoKeyan.PNG'

const Navbar = () => {
    const [value, setValue] = useState();
    const [anchorE1, setAnchorE1] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const open =  Boolean(anchorE1)
    const [hovering, setHovering] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/about') {
      setValue(0);
    } else if (location.pathname === '/announcements') {
      setValue(1);
    } else if (location.pathname === ('/water' || '/laundry')) {
      setValue(2);
    } else if (location.pathname === '/login') {
      setValue(3);
    } 
  }, [location.pathname]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate('/about');
        break;
      case 1:
        navigate('/announcements');
        break;
      case 2:
        setAnchorE1(!anchorE1)
        break;
      case 3:
        navigate('/login');
        break;
      default:
        navigate('/');
    }
  };

  if (user) {
    var username = `${user.username}`;
    var typeOfUser = user.userType
  }

  if (username) {
    return (
      <React.Fragment>
          <AppBar
              sx ={{background:'#0b4c84', 
              margin:"10px auto",
              borderRadius:"10px",
              position:'sticky',
              width: "85%",
              left: 0,
              right: 0,
              }}>
              <Toolbar>
                  <Typography
                      onClick={() => {
                          navigate('/')
                        } }
                        sx={{
                          color: 'White',
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                        onMouseOver={() => setHovering(true)}
                        onMouseOut={() => setHovering(false)}
                  >
                      <img
                      src={hovering ? Logo2 : Logo}
                      alt="Logo"
                      style={{ height: '60px', width: '60px' }} />
                  </Typography>
                  <Tabs
                      sx ={{marginLeft:"auto"}} 
                      textColor='inherit'
                      value={value}
                      onChange={handleChange}
                      TabIndicatorProps={{style: {background:'#F4A4AC'}}}
                      >
                          <Tab label ="About" sx={{ color: "white", "&:hover": {color: "#F4A4AC"} }}/>
                          <Tab label ="Announcements" sx={{ color: "white", "&:hover": {color: "#F4A4AC"} }}/>
                          <FormControl>
                            <Select
                              sx={{
                                  backgroundColor: '#0b4c84',
                                  width: "140px",
                                  borderRadius: "0.25rem",
                                  height: "50px",
                                  p: "0.25rem 1rem",
                                  "& .MuiSvgIcon-root:": {
                                      pr: "0.25rem",
                                      width: "3rem"
                                  },
                                  color: "white", "&:hover": {color: "#F4A4AC"}
                              }}    
                              maxMenuHeight={1}
                              defaultValue="none"
                              displayEmpty
                              input={<InputBase/>}
                            >
                              <MenuItem disabled value="none"><Typography sx={{ color: "#9DB7CD", "&:hover": {color: "#F4A4AC"}}}>SERVICES</Typography></MenuItem>
                              <MenuItem onClick={() => {navigate(`/water`)}}>
                                  <Typography>Water</Typography>
                              </MenuItem>
                              <MenuItem onClick={() => {navigate("/laundry")}}><Typography>Laundry</Typography></MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <Select
                                  sx={{
                                    backgroundColor: '#0b4c84',
                                    width: "100px",
                                    borderRadius: "0.25rem",
                                    height: "50px",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root:": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    color: "white", "&:hover": {color: "#F4A4AC"}
                                }}    
                                maxMenuHeight={1}
                                defaultValue={username}
                                displayEmpty
                                input={<InputBase/>}
                            >
                              <MenuItem value = {username} disabled>
                                  <Typography sx={{ color: "#9DB7CD", "&:hover": {color: "#F4A4AC"}}}>{username}</Typography>
                              </MenuItem>
                              {typeOfUser === 'customer' && (<MenuItem onClick={() => {navigate("/profile")}}>Profile</MenuItem>)}
                              <MenuItem onClick={async () => { navigate("/"); await dispatch(setLogout()); }}>Log Out</MenuItem>
                            </Select>
                          </FormControl>
                          
                  </Tabs>
              </Toolbar>
          </AppBar>
      </React.Fragment>
  
    )
  } else {
    return (
      <React.Fragment>
          <AppBar
              sx ={{background:'#0b4c84', 
              margin:"10px auto",
              borderRadius:"10px",
              position:'sticky',
              width: "85%",
              left: 0,
              right: 0,
              }}>
              <Toolbar>
                  <Typography
                      onClick={() => {
                          navigate('/')
                        } }
                        sx={{
                          color: 'White',
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      onMouseOver={() => setHovering(true)}
                      onMouseOut={() => setHovering(false)}
                  >
                      <img
                      src={hovering ? Logo2 : Logo}
                      alt="Logo"
                      style={{ height: '60px', width: '60px' }}
                      />
                  </Typography>
                  <Tabs
                      sx ={{marginLeft:"auto"}} 
                      textColor='inherit'
                      value={value}
                      onChange={handleChange}
                      TabIndicatorProps={{style: {background:'#F4A4AC'}}}
                      >
                          <Tab label ="About" sx={{ color: "white", "&:hover": {color: "#F4A4AC"}}}/>
                          <Tab label ="Announcements" sx={{ color: "white", "&:hover": {color: "#F4A4AC"}}}/>
                          <FormControl>
                            <Select
                              sx={{
                                  backgroundColor: '#0b4c84',
                                  width: "140px",
                                  borderRadius: "0.25rem",
                                  height: "50px",
                                  p: "0.25rem 1rem",
                                  "& .MuiSvgIcon-root:": {
                                      pr: "0.25rem",
                                      width: "3rem"
                                  },
                                  color: "white", "&:hover": {color: "#F4A4AC"}
                              }}    
                              maxMenuHeight={1}
                              defaultValue="none"
                              displayEmpty
                              input={<InputBase/>}
                            >
                              <MenuItem key='0' disabled value="none"><Typography sx={{ color: "#9DB7CD", "&:hover": {color: "#F4A4AC"}}}>SERVICES</Typography></MenuItem>
                              <MenuItem onClick={() => {navigate(`/water`)}}>
                                  <Typography>Water</Typography>
                              </MenuItem>
                              <MenuItem onClick={() => {navigate("/laundry")}}><Typography>Laundry</Typography></MenuItem>
                            </Select>
                          </FormControl>
                          <Tab label ="Login/Signup" sx={{ color: "white", "&:hover": {color: "#F4A4AC"}}}/>
  
                          </Tabs>
              </Toolbar>
          </AppBar>                      
      </React.Fragment>
  
    )
  }
    
}

export default Navbar