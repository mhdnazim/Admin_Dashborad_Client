import { Grid, Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <>
      <Typography variant='h2' sx={{ textAlign: "center", marginTop: "30px"}}>
        Hi, Welcome to Admin Portal
      </Typography>
      <Grid sx={{ textAlign: "center", margin: "15px 0px" }}>
          <img
          src="/users.png"
          alt="Profile"
          loading="lazy"
          width={150}
          style={{ borderRadius: "10%"}}
          />
      </Grid>
    </>
  )
}

export default page