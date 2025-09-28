"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is connected on page load
  useEffect(() => {
    checkConnection();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const web3Signer = web3Provider.getSigner();
          const network = await web3Provider.getNetwork();
          
          setProvider(web3Provider);
          setSigner(web3Signer);
          setAccount(accounts[0]);
          setChainId(network.chainId);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature');
      return false;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const network = await web3Provider.getNetwork();
      
      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setChainId(network.chainId);
      setIsConnected(true);
      
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount('');
    setChainId(null);
    setIsConnected(false);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (newChainId) => {
    setChainId(parseInt(newChainId, 16));
    // Reload the page to refresh provider
    window.location.reload();
  };

  const switchNetwork = async (targetChainId) => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexValue(targetChainId) }],
      });
      return true;
    } catch (error) {
      console.error('Error switching network:', error);
      return false;
    }
  };

  const addNetwork = async (networkConfig) => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      });
      return true;
    } catch (error) {
      console.error('Error adding network:', error);
      return false;
    }
  };

  const getBalance = async () => {
    if (!provider || !account) return '0';

    try {
      const balance = await provider.getBalance(account);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };

  const sendTransaction = async (to, value, gasLimit = 21000) => {
    if (!signer) throw new Error('Wallet not connected');

    try {
      const transaction = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value.toString()),
        gasLimit,
      });

      return transaction;
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  };

  const getNetworkName = (chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      137: 'Polygon Mainnet',
      56: 'BSC Mainnet',
      11155111: 'Sepolia Testnet',
      80001: 'Polygon Mumbai',
    };
    return networks[chainId] || 'Unknown Network';
  };

  const value = {
    provider,
    signer,
    account,
    chainId,
    isConnected,
    isLoading,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    addNetwork,
    getBalance,
    sendTransaction,
    getNetworkName,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};