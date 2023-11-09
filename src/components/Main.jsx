import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./Main.css";
import svg1 from "./img/Group27.svg";
import svg2 from "./img/Group32.svg";
import svg3 from "./img/Group.svg";

function Main() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [numNFTs, setNumNFTs] = useState(1);
  const [status, setStatus] = useState("");
  const [totalSupply, setTotalSupply] = useState(null);
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const contractAddress = "0x80Ab03Df56e6152dB263Fd87B75163308041611D"; // Replace with the actual contract address
  const abi = ["function totalSupply() view returns (uint256)"]; // Make sure the ABI includes the totalSupply function
  let web3Provider;
  let signer;
  
  if (window.ethereum) {
    web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = web3Provider.getSigner();
  } else {
    web3Provider = ethers.getDefaultProvider();
    signer = null; // Set signer to null when no window.ethereum is available
  }


  const contract = new ethers.Contract(contractAddress, abi, signer);
  const contractmint = new ethers.Contract(
    contractAddress,
    ["function mint(uint256) external payable"],
    signer
  );




  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setProvider(web3Provider);
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  const connectMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
      window.open("https://metamask.io/", "_blank");
      setStatus("Please install MetaMask to use this application.");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(window.ethereum.selectedAddress);
      setIsTextVisible(!isTextVisible);
    } catch (error) {
      console.error(error);
       setStatus(`Error: ${error.message}`);
    }
  };

  const fetchTotalSupply = async () => {
    try {
      // Call the totalSupply function
      const supply = await contract.totalSupply();
      // Set the total supply in the state
      setTotalSupply(supply.toString());
    } catch (error) {
      console.error("Error fetching total supply:");
    }
  };

  const mintNFT = async () => {
    if (!numNFTs || numNFTs <= 0) {
      setStatus("Please specify a valid number of NFTs to mint.");
      return;
    }

    
    // Calculate the total value in Wei

       
    
    const totalValueWei = ethers.utils.parseEther(
      (numNFTs * 1).toString()
    );

    try {
      // Check if the total value exceeds the maximum safe integer value
      if (totalValueWei.gt(ethers.constants.MaxUint256)) {
        setStatus("Total value exceeds the maximum allowed value.");
        return;
      }

      // Mint multiple NFTs
      const tx = await contractmint.mint(numNFTs, { value: totalValueWei });
      setStatus(`Minting ${numNFTs} NFT(s)...`);
    } catch (error) {
      console.error(error);
      // setStatus(`Error, user reject transaction / Blockchain error`);  
        setStatus(`Error: ${error.message}`);    
    }
  };

  useEffect(() => {
    if (provider) {
      fetchTotalSupply(); // Fetch total supply when provider is available
    }
  }, [provider]);

  const targetDate = new Date(new Date().getFullYear(), 10, 15).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const weeksRemaining = Math.floor(
      timeRemaining / (1000 * 60 * 60 * 24 * 7 * 4)
    );
    const daysRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );
    const hoursRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setWeeks(weeksRemaining);
    setDays(daysRemaining);
    setHours(hoursRemaining);
    setMinutes(minutesRemaining);
    setSeconds(secondsRemaining);
  }

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Initialize the timer
    updateCountdown();

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const incrementCounter = () => {
    if(numNFTs < 20){
      setNumNFTs(numNFTs + 1 );
    }
  };

  // Function to decrement the count
  const decrementCounter = () => {
    if (numNFTs  > 0) {
      setNumNFTs(numNFTs - 1);
    }
  };






  return (
    <div className="Main">
      <div className="top">

        <h3 className="h3">Shards Gallery</h3>

        <div className="top_right">
          <div className="link_conteiner">
            <a
              rel="stylesheet"
              href="https://polygonscan.com/address/0x80ab03df56e6152db263fd87b75163308041611d"
              className="link"
              target="_blank"
            >
              <img src={svg1} alt="#" className="img_for_link" />
            </a>

            <a
              rel="stylesheet"
              href="https://opensea.io/collection/shardgallery"
              className="link"
              target="_blank"
            >
              <img src={svg2} alt="#" className="img_for_link" />
            </a>

            <a
              rel="https://twitter.com/ShardGallery"
              href="https://twitter.com/ShardGallery"
              className="link"
              target="_blank"
            >
              <img src={svg3} alt="#" className="img_for_link" />
            </a>
          </div>

          {account ? (
            <div className="wallet_conteiner">
              <span className="wallet_connect">
                Connected Account: {account.substring(0, 6)}
              </span>
            </div>
          ) : (
            <div>
              <button className="wallet_conteiner" onClick={connectMetamask}>
                <span className="wallet_connect">Connect Metamask</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="middle">
        <div className="middle-left">
          <div>
            <h1 className="welcome1">Welcome to the</h1>
            <h1 className="welcome">Shards Mint</h1>
          </div>

          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-value">{weeks}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{days}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{hours}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{minutes}</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{seconds}</span>
            </div>
          </div>
        </div>




        <div className="link_conteiner_mobile">
            <a
              rel="stylesheet"
              href="https://polygonscan.com/address/0x80ab03df56e6152db263fd87b75163308041611d"
              className="link_mobile"
              target="_blank"
            >
              <img src={svg1} alt="#" className="img_for_link_mobile" />
            </a>

            <a
              rel="stylesheet"
              href="https://opensea.io/collection/shardgallery"
              className="link_mobile"
              target="_blank"
            >
              <img src={svg2} alt="#" className="img_for_link_mobile" />
            </a>

            <a
              rel="stylesheet"
              href="https://twitter.com/ShardGallery"
              className="link_mobile"
              target="_blank"
            >
              <img src={svg3} alt="#" className="img_for_link_mobile" />
            </a>
          </div>







        <div className="middle-right">
          <div className="text-slider">
            <div
              className={`text-container ${isTextVisible ? "show" : "hide"}`}
            >
              {account && (
                <div className="mint_container">
                  <h2 className="mint_h2">Mint NFTs </h2>
                  <p className="mint_p">Specify the number of NFTs to mint:</p>
                  <p className="mint_p">1 MATIC each + gas</p>
                  <p className="mint_p">(Max. 20)</p>

                  <div className="counter">
                    <button onClick={decrementCounter} className="counter_decrement">-</button>
                    <span className="counter_span">{numNFTs}</span>
                    <button onClick={incrementCounter} className="counter_increment">+</button>
                  </div>


                  
                  <button onClick={mintNFT} className="counter_mint_button">Mint NFT(s)</button>
                  <p className="mint_status">Status: {status}</p>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="amount_container" id="amount_container">

      {/* <p className="amount_text">{totalSupply} out of 1000</p> */}
      {totalSupply !== null && (
        <p className="amount_text">{totalSupply} out of 1000</p>
      )}

      </div>
    </div>
  );
}

export default Main;
