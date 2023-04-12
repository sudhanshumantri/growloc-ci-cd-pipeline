import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store, { browserHistory } from './store/';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { ReactNotifications, Store } from 'react-notifications-component';
import '../node_modules/react-notifications-component/dist/theme.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
    typography: {
        fontFamily: [
            'Poppins',
            '-apple-system',
            'BlinkMacSystemFont',
        ].join(','),
    }
});

root.render(
    <Provider store={store}>
        <HashRouter history={browserHistory}>
            <ThemeProvider theme={theme}>
                <ReactNotifications />
                <App />
            </ThemeProvider>
        </HashRouter>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
