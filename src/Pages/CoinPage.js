import { ContactSupportOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../cryptoContext';
import { Container, createTheme, Grid, LinearProgress, ThemeProvider, Typography} from '@mui/material';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from '../components/CoinTable';


const CoinPage = () => {
  const {id} = useParams();
  const { currency, symbol} = CryptoState();
  const [Coin, setCoin] = useState();
  const fetchCoins = async () => {
  
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);

  };

  useEffect(() => {
    
    return () => {
      fetchCoins();
    };
  }, []);


  if (!Coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
 
      <div style ={{ display: "flex",}}>
        <div style={{width: "30%",
     
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           marginTop: 25,
           borderRight: "2px solid grey",}}>
         <img
           src={Coin?.image.large}
           alt={Coin?.name}
           height="200"
           style={{ marginBottom: 20 ,}}
         />
         <Typography variant="h3" style={{ fontWeight: "bold",marginBottom: 20, fontFamily: "Montserrat",}}>
          {Coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={{ width: "100%",fontFamily: "Montserrat", padding: 25,  paddingBottom: 15, paddingTop: 0, textAlign: "justify",}}>
          {Coin?.description.en.split(".")[0]}.
        </Typography>
        <div style={{ alignSelf: "start",
                padding: 25,
                paddingTop: 10,
                width: "100%", }} >
          <span style={{ display: "flex" }}>
            <Typography variant="h5" >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(Coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex", }}>
            <Typography variant="h5" >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                Coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                Coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
        
        </div> 
        <CoinInfo coin ={Coin} /> 
      </div>

  )
  
}

export default CoinPage