import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');
  const [chainId, setChainId] = useState(null);

  // Listen for account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      // Set initial values
      const getInitialState = async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
          
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setChainId(chainId);
        } catch (error) {
          console.error('Error getting initial state:', error);
        }
      };
      
      getInitialState();
      
      // Set up listeners
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });
      
      window.ethereum.on('chainChanged', (newChainId) => {
        setChainId(newChainId);
        // Recommended by MetaMask to reload the page on chain change
        // Commented out for better UX, handle manually instead
        // window.location.reload();
      });
      
      // Cleanup listeners on unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', setAccount);
        window.ethereum.removeListener('chainChanged', setChainId);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        setStatus(`Error connecting wallet: ${error.message}`);
        console.error('Error connecting wallet:', error);
        return null;
      }
    } else {
      setStatus('Please install MetaMask to use this feature');
      return null;
    }
  };
  
  const disconnectWallet = () => {
    // MetaMask doesn't have a disconnect method, so we just clear our state
    setAccount(null);
    setStatus('Wallet disconnected');
  };

  const value = {
    account,
    setAccount,
    status,
    setStatus,
    chainId,
    connectWallet,
    disconnectWallet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 