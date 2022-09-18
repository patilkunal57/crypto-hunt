import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { HistoricalChart } from '../config/api';
import { CryptoState } from '../cryptoContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import SelectButton from '../components/selectButton'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const CoinInfo = ({coin}) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag,setflag] = useState(false);

  const {currency} = CryptoState();
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    console.log(data);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  
  }, [days]);
  
  return (
    <>
    <div style={{
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,}}>
         <Line 
      data={{
      labels: historicData? historicData.map((coin) => {
       let date = new Date(coin[0]);
       let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
         return days === 1 ? time : date.toLocaleDateString();
        }): console.log("this is problem"),
      datasets: [
      {
        data:historicData? historicData.map((coin) => coin[1]) : console.log("there is problem"),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
     
     ],
    }} />
   
   <div style={{ display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",}}>
        {
         chartDays? chartDays.map((day) => (
            <SelectButton
            key={day.value}
            onClick={() => {setDays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
         )): <div> try again</div>
        }

    </div>
   </div>
   
  </>
  )
}

export default CoinInfo