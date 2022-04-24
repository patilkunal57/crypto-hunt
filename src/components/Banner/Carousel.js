// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { TrendingCoins } from '../../config/api'
// import { CryptoState } from '../../cryptoContext'
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import { Link } from 'react-router-dom';
// import { numberWithCommas } from '../CoinTable';


// const Carousel = () => {
    
//     const [trending, settrending] = useState([]);
//     const {currency} = CryptoState();
//     const fetchTrendingCoins  = async () => {
//         const { data }= await axios.get(TrendingCoins(currency));
//         settrending(data);
//     };

//     useEffect(() => {
        
//         return () => {
//             fetchTrendingCoins();
//         };
//     }, [currency]);


//     const items = trending.map((coin) => {
//         let profit = coin?.price_change_percentage_24h >= 0;
    
//         return (
//           <Link to={`/coins/${coin.id}`}>
//             <img
//               src={coin?.image}
//               alt={coin.name}
//               height="80"
//               style={{ marginBottom: 10 }}
//             />
//             <span>
//               {coin?.symbol}
//               &nbsp;
//               <span
//                 style={{
//                   color: profit > 0 ? "rgb(14, 203, 129)" : "red",
//                   fontWeight: 500,
//                 }}
//               >
//                 {profit && "+"}
//                 {coin?.price_change_percentage_24h?.toFixed(2)}%
//               </span>
//             </span>
//             <span style={{ fontSize: 22, fontWeight: 500 }}>
//               {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
//             </span>
//           </Link>
//         );
//       });







//     const responsive = {
//         0: {
//           items: 2,
//         },
//         512: {
//           items: 4,
//         },
//       };


//   return (
//     <AliceCarousel
//     mouseTracking
//     infinite
//     autoPlayInterval={1000}
//     animationDuration={1500}
//     disableDotsControls
//     disableButtonsControls
//     responsive={responsive}
//     items={items}
//     autoPlay
//   />
//   )
// }

// export default Carousel