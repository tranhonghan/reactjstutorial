import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import Loading from './components/Loading'

ReactDOM.render(
  <React.StrictMode>
    <Loading>
      <App />
    </Loading>
  </React.StrictMode>,
  document.getElementById('root')
);