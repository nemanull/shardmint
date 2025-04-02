import React from 'react';
import svg1 from './img/Group27.svg';
import svg2 from './img/Group32.svg';
import svg3 from './img/Group.svg';
import WalletConnection from './WalletConnection';
import './Header.css';

const Header = ({ account, setAccount, setStatus }) => {
  return (
    <div className="top">
      <h3 className="h3">Shards Gallery</h3>
      
      <div className="top_right">
        <div className="link_conteiner">
          <a
            href="https://polygonscan.com/address/0x80ab03df56e6152db263fd87b75163308041611d"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={svg1} alt="Polygonscan" className="img_for_link" />
          </a>

          <a
            href="https://opensea.io/collection/shardgallery"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={svg2} alt="OpenSea" className="img_for_link" />
          </a>

          <a
            href="https://twitter.com/ShardGallery"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={svg3} alt="Twitter" className="img_for_link" />
          </a>
        </div>

        <WalletConnection 
          account={account}
          setAccount={setAccount}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default Header; 