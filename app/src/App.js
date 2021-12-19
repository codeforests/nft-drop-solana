import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import catIcon from './assets/cat_icon.png';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'codeforests';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) { 
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
        } else {
          alert("Solana object not found, you need to get a Phantom wallet first!");
        }

        const response = await solana.connect( { onlyIfTrusted : true});
        console.log(
          "connected with public key:",
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());
      }
    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("connected with public key:" , response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header"><img alt="Kitty NFT" className='cat-icon' src={catIcon}/>Adorable Kitty NFT</p>
          <p className="sub-text">Mint your cutest kitty!</p>
          {!walletAddress && renderNotConnectedContainer()}

          {walletAddress && <CandyMachine walletAddress={window.solana} />}

        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
