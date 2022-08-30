import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store = { store }>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
)
