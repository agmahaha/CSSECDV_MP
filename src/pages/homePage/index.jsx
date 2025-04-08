import React, { useState, useEffect } from 'react'
import Logo from "./valol.png";
import Valknife from  "./knife.png"
import Bundle from  "./bundle.png"
import { Grid, Typography, Box, useTheme, Button, Badge, IconButton, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Navbar from '../../components/NavBar'
import Footer from '../../components/Footer'

const HomePage = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const navigateToPageNotFound = () => {
        navigate('*');
    };
    
    const navigateToKnives = () => {
        navigate('/knife');
    };

    const navigateToBundle = () => {
        navigate('/bundle');
    };

    const navigateToAnnouncements = () => {
        navigate('/announcements');
    }

    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user !== null) {
            if(user.userType !== "customer"){
                navigate('/pageNotFound');
            }
        }
     }, [navigate, user]);

    if (user) {
        var userType = `${user.userType}`;
      }

    if (userType === 'customer' || user === null){
        return (
            <>
                <Navbar />
                <Box bgcolor="#111823" sx={{ width: '90%', margin: '0 auto', borderRadius: '10px' }}>
                    {/* Logo and Text */}
                    <Grid container spacing={2} sx={{ display: 'flex', textAlign: 'center', marginTop: '0px' }}>
                        {/* First Column (60% wider) */}
                        <Grid item xs={12} md={8}></Grid>
    
                        {/* Second Column (Logo and Text) */}
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginBottom: '20px', textAlign: 'center'
                        }}>
                            {/* Logo */}
                            <img
                                src={Logo}
                                alt="Logo"
                                style={{ height: '75px', width: '75px', marginRight: '10px' }}
                            />
    
                            {/* Text */}
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ba3a46',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '1rem'
                                }
                                }}
                            >
                                The Valorant Skin Store
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ textAlign: 'center', padding: '2% 2% 5% 2%', display: 'flex' }}>
                        {/* First Column */}
                        <Grid item xs={12} sm={12} md={5.5} lg={5.5} ml={5} sx={{ flexFlow: 'column' }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#ba3a46',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '4rem'
                                    },
                                    [theme.breakpoints.down('xs')]: {
                                        fontSize: '3rem'
                                    },
                                }}
                            >
                                —Knife—
                            </Typography>
                            <IconButton onClick={navigateToAnnouncements}>
                                <Box bgcolor='#ba3a46' p={1} borderRadius={1} display='flex' flexDirection='row' sx={{'&:hover': {
                                        transform: 'scale(1.1)',
                                    }}}>
                                    <img
                                    src={Valknife}
                                    alt="Logo"
                                    style={{ height: '300px', width: '550px'}}
                                    />
                                </Box>
                                
                            </IconButton>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#ba3a46',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '4rem'
                                    },
                                    [theme.breakpoints.down('xs')]: {
                                        fontSize: '3rem'
                                    },
                                    mt:7
                                }}
                            >
                                —Knife—
                            </Typography>
                            <IconButton onClick={navigateToAnnouncements}>
                                <Box bgcolor='#ba3a46' p={1} borderRadius={1} display='flex' flexDirection='row' sx={{'&:hover': {
                                        transform: 'scale(1.1)',
                                    }}}>
                                    <img
                                    src={Valknife}
                                    alt="Logo"
                                    style={{ height: '300px', width: '550px'}}
                                    />
                                </Box>
                                
                            </IconButton>
                        </Grid>
    
                        {/* Second Column */}
                        <Grid item xs={12} sm={12} md={5.5} lg={5.5} ml={14}sx={{ flexFlow: 'column' }}>
                            <IconButton onClick={navigateToAnnouncements}>
                                <Box bgcolor='#ba3a46' p={1} borderRadius={1} display='flex' flexDirection='row' sx={{'&:hover': {
                                        transform: 'scale(1.1)',
                                    }}}>
                                    <img
                                    src={Bundle}
                                    alt="Logo"
                                    style={{ height: '450px', width: '800px'}}
                                    />
                                </Box>
                                
                            </IconButton>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#ba3a46',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '4rem'
                                    },
                                    [theme.breakpoints.down('xs')]: {
                                        fontSize: '3rem'
                                    },
                                }}
                            >
                                Kuronami Bundle
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* Logo and Text */}
                    
                </Box>
                <Footer/>
            </>
        );
    }
};

export default HomePage;
