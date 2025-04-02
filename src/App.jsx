import React from 'react';
import './App.css';
import Header from './components/Header';
import Background from './components/Background';
import AnimatedLayout from './components/AnimatedLayout';
import { WalletProvider } from './context/WalletContext';
import './styles/shared.css';

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <Background />
        
        <div className="content">
          <Header />
          <AnimatedLayout />
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;
