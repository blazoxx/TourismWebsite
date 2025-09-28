import { ethers } from 'ethers';

// Smart contract ABI for payment processing
export const PAYMENT_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_bookingId", "type": "string"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"},
      {"internalType": "string", "name": "_customerEmail", "type": "string"}
    ],
    "name": "processPayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_bookingId", "type": "string"}],
    "name": "getPayment",
    "outputs": [
      {"internalType": "address", "name": "customer", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "bool", "name": "processed", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "customer", "type": "address"},
      {"indexed": true, "internalType": "string", "name": "bookingId", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "PaymentProcessed",
    "type": "event"
  }
];

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  1: '0x0000000000000000000000000000000000000000', // Ethereum Mainnet
  137: '0x0000000000000000000000000000000000000000', // Polygon Mainnet
  11155111: '0x0000000000000000000000000000000000000000', // Sepolia Testnet
  80001: '0x0000000000000000000000000000000000000000', // Polygon Mumbai
};

// Network configurations
export const NETWORK_CONFIGS = {
  ethereum: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  polygon: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  sepolia: {
    chainId: 11155111,
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'SEP',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  mumbai: {
    chainId: 80001,
    chainName: 'Polygon Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
};

export class PaymentContract {
  constructor(provider, signer, chainId) {
    this.provider = provider;
    this.signer = signer;
    this.chainId = chainId;
    this.contractAddress = CONTRACT_ADDRESSES[chainId];
    
    if (this.contractAddress && this.contractAddress !== '0x0000000000000000000000000000000000000000') {
      this.contract = new ethers.Contract(
        this.contractAddress,
        PAYMENT_CONTRACT_ABI,
        this.signer
      );
    }
  }

  async processPayment(bookingId, amount, customerEmail) {
    if (!this.contract) {
      throw new Error('Contract not deployed on this network');
    }

    try {
      const amountWei = ethers.utils.parseEther(amount.toString());
      
      const transaction = await this.contract.processPayment(
        bookingId,
        amountWei,
        customerEmail,
        {
          value: amountWei,
          gasLimit: 100000, // Adjust based on contract complexity
        }
      );

      return transaction;
    } catch (error) {
      console.error('Smart contract payment error:', error);
      throw error;
    }
  }

  async getPayment(bookingId) {
    if (!this.contract) {
      throw new Error('Contract not deployed on this network');
    }

    try {
      const payment = await this.contract.getPayment(bookingId);
      return {
        customer: payment.customer,
        amount: ethers.utils.formatEther(payment.amount),
        timestamp: payment.timestamp.toNumber(),
        processed: payment.processed,
      };
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  // Listen for payment events
  onPaymentProcessed(callback) {
    if (!this.contract) return;

    this.contract.on('PaymentProcessed', (customer, bookingId, amount, timestamp, event) => {
      callback({
        customer,
        bookingId,
        amount: ethers.utils.formatEther(amount),
        timestamp: timestamp.toNumber(),
        transactionHash: event.transactionHash,
        blockNumber: event.blockNumber,
      });
    });
  }
}

// Utility functions
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount, decimals = 6) => {
  return parseFloat(amount).toFixed(decimals);
};

export const getExplorerUrl = (chainId, hash, type = 'tx') => {
  const explorers = {
    1: 'https://etherscan.io',
    137: 'https://polygonscan.com',
    11155111: 'https://sepolia.etherscan.io',
    80001: 'https://mumbai.polygonscan.com',
  };

  const baseUrl = explorers[chainId];
  if (!baseUrl) return '';

  return `${baseUrl}/${type}/${hash}`;
};

export const estimateGasPrice = async (provider) => {
  try {
    const gasPrice = await provider.getGasPrice();
    return ethers.utils.formatUnits(gasPrice, 'gwei');
  } catch (error) {
    console.error('Error estimating gas price:', error);
    return '20'; // Default fallback
  }
};

// Simple payment processing without smart contract (for fallback)
export const processSimplePayment = async (provider, signer, toAddress, amount) => {
  try {
    const transaction = await signer.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(amount.toString()),
      gasLimit: 21000,
    });

    return transaction;
  } catch (error) {
    console.error('Simple payment error:', error);
    throw error;
  }
};

export default PaymentContract;