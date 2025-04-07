import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, useTheme, Button, Badge, IconButton, Snackbar, Alert } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

const HomePage = () => {
    const theme = useTheme();

    return(
        <>
        <Box bgcolor="black" sx={{ width: '85%', margin: '0 auto', borderRadius: '10px', opacity: 0.8 }}>
            <Grid container spacing={2} sx={{ display: 'flex', textAlign: 'center', marginTop: '0px' }}>
                        {/* First Column (60% wider) */}
                        <Grid item xs={12} md={8}></Grid>
    
                        {/* Second Column (Logo and Text) */}
                        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', marginTop: '40px', marginBottom: '20px', textAlign: 'center'
                        }}>
                            {/* Logo */}
    
                            {/* Text */}
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0b4c84',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '1rem'
                                }
                                }}
                            >
                                The Valor Shop
                            </Typography>
                        </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ textAlign: 'center', padding: '2% 2% 5% 2%', display: 'flex' }}>
                        {/* First Column */}
                        <Grid item xs={12} sm={12} md={5.5} lg={5.5} sx={{ flexFlow: 'column' }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#0b4c84',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '4rem'
                                    },
                                    [theme.breakpoints.down('xs')]: {
                                        fontSize: '3rem'
                                    },
                                }}
                            >
                                
                            </Typography>
                            
                                <Box bgcolor='white' p={2} borderRadius={15} display='flex' flexDirection='row' sx={{'&:hover': {
                                        transform: 'scale(1.1)',
                                    }}}>
                                    <Badge color='primary' badgeContent=" " invisible={false} size="large">
                                        <Typography pr={2} fontSize={30} color='black'>
                                            NEW BUNDLES AND ITEMS !!
                                        </Typography>
                                        <CampaignIcon sx={{ color: 'black'}} fontSize='large'/>
                                    </Badge>
                                </Box>
                                

                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', textAlign: 'center', marginTop: '0px' }}>

            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', textAlign: 'center', marginTop: '0px' }}>

            </Grid>
        </Box>
        </>
    );
};

export default HomePage;