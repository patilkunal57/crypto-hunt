import { Container, Typography } from '@mui/material'
import React from 'react'


const Banner = () => {
  return (
    < Container style={{ textAlign: "center" }}>
    <Typography
    variant="h2"
    style={{
      color: "#EEBC1D",
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Montserrat",
    }}
  >
    Crypto Hunt
  </Typography>
   <Typography
   variant="subtitle2"
   style={{
     color: "darkgrey",
     textTransform: "capitalize",
     fontFamily: "Montserrat",
   }}
 >
   Get all the Info regarding your favorite Crypto Currency
 </Typography>
    </Container>
  )
}

export default Banner