# Shard-mint Website

Just a NFT minting interface for the Shards Gallery NFT collection on Polygon network.

### How to install

1. Clone the repository
   ```
   git clone https://github.com/yourusername/shards-gallery-mint.git
   cd shards-gallery-mint
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

The site will be available at http://localhost:3000

## Customization Guide

To customize this minting website for your own NFT collection, you'll need to modify the following:

### Contract Information

In `src/components/MintForm.jsx`, update the contract address and ABI:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  "function totalSupply() view returns (uint256)",
  "function mint(uint256) external payable"
  // Add any other functions from your contract
];
```

### Pricing

In the same file, find the minting function and modify the price calculation:

```javascript
// Change 1 to your NFT price in ETH/MATIC
const totalValueWei = ethers.utils.parseEther((numNFTs * 1).toString());
```

### Network Configuration

To change the network (default is Polygon), update the chain ID in `switchToPolygon` function:

```javascript
// Polygon Mainnet: 0x89
// Ethereum Mainnet: 0x1
// BSC: 0x38
// Avalanche: 0xa86a
params: [{ chainId: '0x89' }],
```

### Collection Links

In `src/components/Header.jsx`, update the external links to your collection:

```javascript
<a href="https://polygonscan.com/address/YOUR_CONTRACT_ADDRESS">...</a>
<a href="https://opensea.io/collection/YOUR_COLLECTION_SLUG">...</a>
<a href="https://twitter.com/YOUR_TWITTER_HANDLE">...</a>
```

### Countdown Timer

To change the mint date, modify the target date in `src/components/Countdown.jsx`:

```javascript
// Format: year, month (0-11), day
const targetDate = new Date(2023, 10, 15).getTime();
```

### Branding

1. Replace logo images in `src/components/img/` directory
2. Update the title in `public/index.html`
3. Modify the color scheme in `src/index.css`:
   ```css
   :root {
     --primary-gradient: linear-gradient(45deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
     --bg-dark: #YOUR_BG_COLOR;
     ...
   }
   ```

## Deployment

To build for production:

```
npm run build
```


