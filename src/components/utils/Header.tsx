'use client'
import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, Box, colors, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';


const Header = () => {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleLogin = () => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('user_Id')
    window.localStorage.removeItem('role')
    router.push('/login')
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
       <Box sx={{ width: "90%", margin: "15px auto", borderRadius: "30px"}} >
             <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: "black", display: "flex", justifyContent: "space-between", borderRadius: "30px" }}>
                 <img
                  src="/favicon.svg"
                  alt="Logo"
                  loading="lazy"
                /> &nbsp;
                <Typography
                component="h2"
                variant="h5"
                color="inherit"
                //   align="center"
                noWrap
                sx={{ flex: 1 }}
                >
                <Link href={'/dashboard'} style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Employee.com</Link>
                </Typography>
                <Toolbar
                component="nav"
                variant="dense"
                sx={{  overflowX: 'auto', columnGap : "20px", bgcolor: "black" }}
            >
                <Link href="/dashboard" style={{ color:"white ", fontWeight: "bold"}}>
                    Home
                </Link>
                <Link href="/employee/list" style={{ color:"white", fontWeight: "bold"}}>
                    Employee List
                </Link>
            </Toolbar>
                {/* <Button variant="contained" size="small"
                onClick={() => {handleLogin()}}>
                LogOut &nbsp; <Logout />
                </Button> */}
                <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src="/gear-solid.svg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography onClick={() => {handleLogin()}} textAlign="center">Log Out</Typography>
                </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>
      </Toolbar>
       </Box>
      
    </>
  )
}

export default Header