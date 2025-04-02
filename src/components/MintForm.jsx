import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import './MintForm.css';

const MintForm = () => {
  const { account, setStatus, chainId } = useWallet();
  const [numNFTs, setNumNFTs] = useState(1);
  const [totalSupply, setTotalSupply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const contractAddress = "0x80Ab03Df56e6152dB263Fd87B75163308041611D";
  const abi = [
    "function totalSupply() view returns (uint256)",
    "function mint(uint256) external payable"
  ];

  const getContract = () => {
    if (!window.ethereum) return null;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // Polygon Mainnet
      });
      return true;
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
          return true;
        } catch (addError) {
          console.error('Error adding Polygon network:', addError);
          return false;
        }
      }
      console.error('Error switching to Polygon network:', error);
      return false;
    }
  };

  // Check if the current network is Polygon Mainnet
  const isPolygonNetwork = () => {
    return chainId === '0x89'; // Polygon Mainnet
  };

  const fetchTotalSupply = async () => {
    setIsLoading(true);
    try {
      const contract = getContract();
      if (!contract) return;
      const supply = await contract.totalSupply();
      setTotalSupply(supply.toString());
    } catch (error) {
      console.error("Error fetching total supply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const estimateGasPrice = async () => {
    if (!account || !isPolygonNetwork()) return;
    
    try {
      const contract = getContract();
      if (!contract) return;
      
      const valueWei = ethers.utils.parseEther('1'); // Base price for 1 NFT
      const gasPrice = await contract.provider.getGasPrice();
      const estimatedGas = await contract.estimateGas.mint(1, { value: valueWei }).catch(() => ethers.BigNumber.from(500000)); // Fallback gas estimate
      
      const totalEstimated = valueWei.add(estimatedGas.mul(gasPrice));
      setEstimatedPrice(ethers.utils.formatEther(totalEstimated));
    } catch (error) {
      console.error("Error estimating price:", error);
    }
  };

  const handleError = (error) => {
    console.error(error);
    if (error.code === 'ACTION_REJECTED') {
      return 'Transaction was rejected by user';
    }
    if (error.code === -32603) {
      if (error.data?.message?.includes('insufficient funds')) {
        return 'Insufficient funds to complete the transaction';
      }
      if (error.data?.message?.includes('max supply')) {
        return 'Maximum supply reached';
      }
      return 'Transaction failed. Please check if you have enough MATIC to cover the cost and gas fees';
    }
    if (error.message?.includes('user rejected')) {
      return 'Transaction was rejected by user';
    }
    if (error.message?.includes('network changed')) {
      return 'Network changed during transaction. Please try again.';
    }
    return `Error: ${error.message || 'Unknown error occurred'}`;
  };

  const mintNFT = async () => {
    if (!account) {
      setStatus("Please connect your wallet first.");
      return;
    }

    if (!numNFTs || numNFTs <= 0 || numNFTs > 20) {
      setStatus("Please specify a valid number of NFTs to mint (1-20).");
      return;
    }

    if (!isPolygonNetwork()) {
      setStatus("Please switch to Polygon Mainnet network.");
      await switchToPolygon();
      return;
    }

    setIsMinting(true);
    try {
      const contract = getContract();
      if (!contract) {
        setStatus("Please install MetaMask to mint NFTs.");
        return;
      }

      // Calculate total cost including gas estimate
      const totalValueWei = ethers.utils.parseEther((numNFTs * 1).toString());
      
      // Get current gas price
      const gasPrice = await contract.provider.getGasPrice();
      
      // Estimate gas
      let gasLimit;
      try {
        gasLimit = await contract.estimateGas.mint(numNFTs, { value: totalValueWei });
        // Add 20% buffer to gas limit
        gasLimit = gasLimit.mul(120).div(100);
      } catch (error) {
        setStatus(handleError(error));
        return;
      }

      // Check if user has enough funds for transaction
      const userBalance = await contract.provider.getBalance(account);
      const estimatedCost = totalValueWei.add(gasLimit.mul(gasPrice));
      
      if (userBalance.lt(estimatedCost)) {
        setStatus(`Insufficient funds. You need at least ${ethers.utils.formatEther(estimatedCost)} MATIC for this transaction.`);
        return;
      }

      const tx = await contract.mint(numNFTs, {
        value: totalValueWei,
        gasLimit,
        gasPrice
      });
      
      setStatus(`Minting ${numNFTs} NFT(s)... Transaction hash: ${tx.hash}`);
      
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        setStatus(`Successfully minted ${numNFTs} NFT(s)!`);
        fetchTotalSupply();
      } else {
        setStatus('Transaction failed. Please try again.');
      }
    } catch (error) {
      setStatus(handleError(error));
    } finally {
      setIsMinting(false);
    }
  };

  const incrementCounter = () => {
    if (numNFTs < 20) {
      setNumNFTs(numNFTs + 1);
    }
  };

  const decrementCounter = () => {
    if (numNFTs > 1) {
      setNumNFTs(numNFTs - 1);
    }
  };

  useEffect(() => {
    if (account) {
      fetchTotalSupply();
      estimateGasPrice();
    }
  }, [account, chainId]);

  return (
    <div className="mint-form">
      <h2 className="mint-title">Mint NFTs</h2>
      <div className="mint-info">
        <p>1 MATIC each + gas</p>
        <p>Max. 20 per transaction</p>
        {!isPolygonNetwork() && <p className="warning-text">Please switch to Polygon Mainnet</p>}
        {estimatedPrice && <p className="price-text">Est. cost: ~{estimatedPrice} MATIC</p>}
        {isLoading ? (
          <p className="loading-text">Loading supply...</p>
        ) : (
          totalSupply && <p className="supply-text">Total minted: {totalSupply} out of 1000</p>
        )}
      </div>

      <div className="mint-controls">
        <button 
          className="button control-button" 
          onClick={decrementCounter} 
          disabled={numNFTs <= 1 || isMinting}
        >
          -
        </button>
        <span>{numNFTs}</span>
        <button 
          className="button control-button" 
          onClick={incrementCounter} 
          disabled={numNFTs >= 20 || isMinting}
        >
          +
        </button>
      </div>

      <button 
        className="button button-primary" 
        onClick={mintNFT} 
        disabled={!account || isMinting}
      >
        {isMinting ? 'Minting...' : `Mint ${numNFTs} NFT${numNFTs > 1 ? 's' : ''}`}
      </button>
    </div>
  );
};

export default MintForm; 