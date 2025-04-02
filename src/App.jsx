import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TwinklingStars from './components/TwinklingStars';
import BackgroundImages from './components/BackgroundImages';
import AnimatedLayout from './components/AnimatedLayout';

function App() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <div className="App">
      <TwinklingStars />
      <BackgroundImages />
      
      <div className="content">
        <Header 
          account={account}
          setAccount={setAccount}
          setStatus={setStatus}
        />

        <AnimatedLayout 
          account={account}
          setStatus={setStatus}
        />

        {status && <div className="status-message">{status}</div>}
      </div>
    </div>
  );
}

export default App;
