import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactRouter from './components/Router/ReactRouter';
import './App.css';

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <ReactRouter />
      </div>
    </CookiesProvider>
    
  );
}

export default App;
