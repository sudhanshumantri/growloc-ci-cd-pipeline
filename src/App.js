import React from 'react'
import './App.css'
import Layout from './components/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Fira Sans Condensed'].join(',')
  }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Layout />
      </div>
    </ThemeProvider>
  )
}
export default App
