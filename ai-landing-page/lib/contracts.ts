// Contract addresses and ABIs for BNB Smart Chain
export const CONTRACT_ADDRESSES = {
  PREDICTION_MARKET: "0x...", // Deploy your contract and add address
  BNB_TOKEN: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB on BSC
}

export const CONTRACT_ABI = [
  // PredictionMarket ABI
  {
    "inputs": [
      {"internalType": "string", "name": "question", "type": "string"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "name": "createMarket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "marketId", "type": "uint256"},
      {"internalType": "bool", "name": "position", "type": "bool"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "addLiquidity",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "marketId", "type": "uint256"}
    ],
    "name": "claimWinnings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "markets",
    "outputs": [
      {"internalType": "string", "name": "question", "type": "string"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "totalLiquidity", "type": "uint256"},
      {"internalType": "bool", "name": "resolved", "type": "bool"},
      {"internalType": "bool", "name": "outcome", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const BSC_CONFIG = {
  chainId: 56, // BNB Smart Chain mainnet
  chainName: "BNB Smart Chain",
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
}
