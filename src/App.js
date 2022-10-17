import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Layout from "./components/layout";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const theme = createTheme({
    typography: {
        fontFamily: [
            "Fira Sans Condensed"
        ].join(",")
    }
});
function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Layout />
            </div>
        </ThemeProvider>
    );
}
export default App;