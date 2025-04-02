import React from 'react';
import { useWallet } from '../context/WalletContext';

const WalletConnection = () => {
  const { account, connectWallet, disconnectWallet, chainId } = useWallet();

  const getNetworkName = (chainIdHex) => {
    if (!chainIdHex) return '';
    
    const chainMap = {
      '0x1': 'Ethereum',
      '0x89': 'Polygon',
      '0x13881': 'Mumbai',
      '0xaa36a7': 'Sepolia',
      '0xa': 'Optimism',
      '0xa4b1': 'Arbitrum'
    };
    
    return chainMap[chainIdHex] || 'Unknown Network';
  };

  return (
    <div>
      {account ? (
        <div className="wallet_conteiner">
          <span className="wallet_connect">
            {getNetworkName(chainId)} | {account.substring(0, 6)}...
            <button 
              onClick={disconnectWallet} 
              className="disconnect-btn"
              style={{ 
                background: 'transparent', 
                border: 'none', 
                fontSize: '12px', 
                color: '#ff5555', 
                marginLeft: '5px',
                cursor: 'pointer' 
              }}
            >
              ×
            </button>
          </span>
        </div>
      ) : (
        <div>
          <button className="wallet_conteiner" onClick={connectWallet}>
            <span className="wallet_connect">Connect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection; 