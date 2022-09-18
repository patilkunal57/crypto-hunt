import { createTheme } from '@mui/system';
import { Route } from 'react-router-dom';
import { BrowserRouter , Routes} from 'react-router-dom';
import './App.css';
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Container from '@mui/material/Container';

function App() {
  
  return (
    <>
      <Header/>
     <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/coins/:id" element ={<CoinPage/>} />s
    </Routes>
    </> 


  );
}

export default App;
