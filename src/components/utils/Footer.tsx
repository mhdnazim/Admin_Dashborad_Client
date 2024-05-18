import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Grid } from '@mui/material'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Employee.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}


const Footer = () => {

    return (
        <>
            <Box component="footer" sx={{ bgcolor: "#F0EBE3", py: 6 }}>
                <Container maxWidth="lg">
                    <Grid sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Link href={'/home'}>
                            <Box
                                component="img"
                                sx={{
                                    width: 50,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 }
                                }}
                                alt="BookShelf.com"
                                src="/users.png"
                            /></Link>
                    </Grid>
                    <Typography variant="h6" align="center" gutterBottom>
                        Employeee.com
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Created By Nasim
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </>
    )
}

export default Footer