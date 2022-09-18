

import { dark } from '@mui/material/styles/createPalette';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../cryptoContext';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import TextField from '@mui/material/TextField';
import { Margin, Search } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [pages, setpages] = useState(1);


    const { currency, symbol} = CryptoState();


    const history =  useNavigate();
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };
    
      useEffect(() => {
        fetchCoins();
        
      }, [currency]);
      const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
        };   
        
      
    
  return (
    <  >
        <Container style = {{textAlign: "center"}}>
        <hr ></hr>
        <h1 style = {{paddingTop : 50 , fontFamily: "Montserrat" }}>Cryptocurrency Prices by Market Cap</h1>
        <TextField variant="outlined" placeholder="search"
        style ={{marginBottom: 20, paddingTop: 20, width : "100%" }}
        onChange = {(e) => setSearch(e.target.value)}
        />
        <TableContainer>
            {
                loading ? (
                    <LinearProgress color="secondary" />
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor: "#EEBC1D"}}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "MarketCap"].map((head) => (
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight:"700",
                                        fontFamily: "Montserrat",
                                    }}
                                    key= {head}
                                    align={head === "Coin" ? "" : "right"}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch().slice((pages - 1) * 10, (pages - 1)* 10 + 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;

                                return (
                                    <TableRow onClick={() => history(`/coins/${row.id}`)}
                                    key = {row.name}
                                    style= {{
                                     
                                        cursor : "pointer",
                                        fontFamily:"Montserrat",
                                    }}
                                    >
                                        <TableCell component="th"
                                        scope="row"
                                        style ={{
                                            display: "flex",
                                            gap: 15,
                                        }}
                                        ><img src={row?.image}
                                        alt = {row.name}
                                        height = "50"
                                        style={{marginBottom : 10}}/>
                                        <div style ={{display: "flex", flexDirection:"column"}}>
                                            <span style ={{ textTransform: "uppercase", fontSize:22,}} >
                                            {row.symbol}</span>
                                            <span style = {{ color: "darkgrey"}}>{row.name}</span>
                                        </div>
                                        </TableCell>
                                        <TableCell align ="right">
                                            {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell align ="right" style ={{
                                            color: profit > 0? "rgb(14, 203, 129)" : "red",
                                            fontWeight :500,
                                        }}>
                                           {profit && "+"}
                                           {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align ="right">
                                           {symbol}{" "}
                                           {numberWithCommas(
                                               row.market_cap.toString().slice(0, -6)
                                           )}
                                           M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>
        <Pagination style={{padding : 20, width:"100%", display:"flex", justifyContent: "center"}} count={(handleSearch()?.length / 10).toFixed(0)} color="secondary" onChange ={(_, value) =>{setpages(value); window.scroll(0, 200);}}/>
        </Container>
        
    </>
  )
}

export default CoinTable