import React from 'react';
import { ethers } from 'ethers';

const WalletConnection = ({ account, setAccount, setStatus }) => {
  const connectMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
      setStatus("Please install MetaMask to use this application.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {account ? (
        <div className="wallet_conteiner">
          <span className="wallet_connect">
            Connected: {account.substring(0, 6)}...
          </span>
        </div>
      ) : (
        <div>
          <button className="wallet_conteiner" onClick={connectMetamask}>
            <span className="wallet_connect">Connect Wallet</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnection; 