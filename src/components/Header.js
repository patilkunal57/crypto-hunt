import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import { CryptoState } from '../cryptoContext';




const Header = () => {

    const { currency, setCurrency } = CryptoState();
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
     },
    });



  return (
    <ThemeProvider theme={darkTheme}>

    <AppBar position="static" color='secondary'>
      <Container>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color: "#EEBC1D"}} >
            Crypto Hunt
          </Typography>
        
        
      
          <Select
          variant='outlined'
       
          value={currency}
          label="Age"
          onChange={(e) => setCurrency(e.target.value)}
          style ={{
            width: 100,
            height: 40,
            marginLeft:15,
          }}
        >
           <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
         
         </Select>

        </Toolbar>
        </Container>
        </AppBar>
      </ThemeProvider>  


  )
}

export default Header