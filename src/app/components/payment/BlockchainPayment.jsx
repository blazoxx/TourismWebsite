"use client";
import { useState, useEffect } from 'react';
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Copy } from 'lucide-react';

export default function BlockchainPayment({ 
  walletConnected, 
  walletAddress, 
  onConnectWallet, 
  amount 
}) {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (walletConnected && window.ethereum) {
      getNetworkInfo();
    }
  }, [walletConnected]);

  const getNetworkInfo = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkNames = {
        '0x1': 'Ethereum Mainnet',
        '0x89': 'Polygon Mainnet',
        '0x38': 'BSC Mainnet',
        '0xaa36a7': 'Sepolia Testnet',
        '0x13881': 'Polygon Mumbai',
      };
      
      setNetworkInfo({
        chainId,
        name: networkNames[chainId] || 'Unknown Network'
      });
    } catch (error) {
      console.error('Error getting network info:', error);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // Polygon Mainnet
      });
    } catch (switchError) {
      // If the chain hasn't been added to MetaMask, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
            }],
          });
        } catch (addError) {
          console.error('Error adding Polygon network:', addError);
        }
      }
    }
  };

  if (!walletConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <Wallet size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-gray-600 mb-6">
            Connect your MetaMask wallet to proceed with blockchain payment
          </p>
          <button
            onClick={onConnectWallet}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 flex items-center gap-2 mx-auto"
          >
            <Wallet size={20} />
            Connect MetaMask
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Don't have MetaMask?</h4>
          <p className="text-blue-800 text-sm mb-3">
            MetaMask is a crypto wallet that allows you to interact with blockchain applications.
          </p>
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            Download MetaMask
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="text-green-600" size={20} />
          <h4 className="font-medium text-green-900">Wallet Connected</h4>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-green-700">Address:</span>
            <div className="flex items-center gap-2">
              <code className="bg-white px-2 py-1 rounded text-green-800">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </code>
              <button
                onClick={copyAddress}
                className="text-green-600 hover:text-green-800"
                title="Copy address"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          
          {networkInfo && (
            <div className="flex items-center justify-between">
              <span className="text-green-700">Network:</span>
              <span className="text-green-800 font-medium">{networkInfo.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Payment Information</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Amount (INR):</span>
            <span className="font-medium">₹{amount || 0}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Amount (ETH):</span>
            <span className="font-medium">~{((amount || 0) / 100000).toFixed(6)} ETH</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Network Fee:</span>
            <span className="font-medium text-orange-600">~$2-5 USD</span>
          </div>
          
          <div className="flex justify-between py-2 font-semibold">
            <span>Total:</span>
            <span>₹{amount || 0} + Gas Fee</span>
          </div>
        </div>
      </div>

      {/* Network Switch Recommendation */}
      {networkInfo && networkInfo.chainId !== '0x89' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
            <div className="flex-1">
              <h4 className="font-medium text-yellow-900 mb-1">Recommended Network</h4>
              <p className="text-yellow-800 text-sm mb-3">
                For lower gas fees, we recommend using Polygon network instead of Ethereum.
              </p>
              <button
                onClick={switchToPolygon}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700"
              >
                Switch to Polygon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Security */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">🔒 Transaction Security</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-600 mt-0.5" />
            <span>Transaction will be recorded on the blockchain</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-600 mt-0.5" />
            <span>Smart contract ensures secure payment processing</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={16} className="text-green-600 mt-0.5" />
            <span>No sensitive card information stored</span>
          </li>
        </ul>
      </div>

      {/* Payment Instructions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Payment Instructions</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>Click "Pay Securely" button below</li>
          <li>MetaMask will open with transaction details</li>
          <li>Review the transaction and gas fee</li>
          <li>Confirm the transaction in MetaMask</li>
          <li>Wait for blockchain confirmation</li>
        </ol>
      </div>
    </div>
  );
}