import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    error: {
      main: '#ffffff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
