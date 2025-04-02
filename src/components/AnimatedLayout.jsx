import React, { useState } from 'react';
import Countdown from './Countdown';
import MintForm from './MintForm';
import './AnimatedLayout.css';

const AnimatedLayout = ({ account, setStatus }) => {
  const [showMintForm, setShowMintForm] = useState(false);

  const toggleMintForm = () => {
    setShowMintForm(!showMintForm);
  };

  return (
    <div className="animated-layout">
      <div className={`welcome-section ${showMintForm ? 'slide-left' : ''}`}>
        <div>
          <h1 className="welcome1">Welcome to the</h1>
          <h1 className="welcome">Shards Mint</h1>
        </div>

        <div className={`countdown-wrapper ${showMintForm ? 'compact' : ''}`}>
          <Countdown />
        </div>

        {!showMintForm && (
          <button 
            className="mint-now-button" 
            onClick={toggleMintForm}
            disabled={!account}
          >
            {account ? 'Mint NFT Now' : 'Connect Wallet to Mint'}
          </button>
        )}
      </div>

      <div className={`mint-section ${showMintForm ? 'slide-in' : ''}`}>
        {showMintForm && (
          <>
            <MintForm 
              account={account} 
              setStatus={setStatus}
            />
            <button className="back-button" onClick={toggleMintForm}>
              Back to Timer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimatedLayout; 