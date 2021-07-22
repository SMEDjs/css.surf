import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ChakraProvider,extendTheme } from "@chakra-ui/react"
import { HelmetProvider } from "react-helmet-async";
const theme = extendTheme({
  colors: {
    white: "#e7f4ff",
    gray: {
      700: "#1d232f;"
    }
  },
})
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);