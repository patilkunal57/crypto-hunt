import { createTheme } from '@mui/system';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Container from '@mui/material/Container';

function App() {
  
  return (

    <BrowserRouter>
    <Header/>
    <Container >
        <Route path="/" component={Homepage} exact/>
        <Route path="/coins/:id" component={CoinPage} exact/>
    </Container>
    </BrowserRouter>
  );
}

export default App;
