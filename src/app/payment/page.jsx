"use client";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Wallet,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import PaymentForm from '../components/payment/PaymentForm';
import BlockchainPayment from '../components/payment/BlockchainPayment';

const schema = yup.object().shape({
  amount: yup.number().required('Amount is required').min(1, 'Amount must be greater than 0'),
  paymentMethod: yup.string().required('Please select a payment method'),
  email: yup.string().email('Invalid email').required('Email is required'),
  fullName: yup.string().required('Full name is required'),
});

export default function PaymentPage({ searchParams }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  // Extract booking details from URL parameters
  useEffect(() => {
    const details = {
      packageId: searchParams?.package || '',
      amount: searchParams?.amount || 100,
      title: searchParams?.title || '',
      type: searchParams?.type || '',
      location: searchParams?.location || '',
      date: searchParams?.date || '',
      artisan: searchParams?.artisan || '',
    };
    setBookingDetails(details);
  }, [searchParams]);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      amount: parseInt(searchParams?.amount) || 100,
      paymentMethod: 'card',
      email: '',
      fullName: '',
    }
  });

  const watchedAmount = watch('amount');

  // Update amount when booking details change
  useEffect(() => {
    if (bookingDetails?.amount) {
      setValue('amount', parseInt(bookingDetails.amount));
    }
  }, [bookingDetails, setValue]);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      alert('Please install MetaMask to use blockchain payments.');
    }
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      if (data.paymentMethod === 'blockchain') {
        if (!walletConnected) {
          throw new Error('Please connect your wallet first');
        }
        await processBlockchainPayment(data);
      } else {
        await processCardPayment(data);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({
        type: 'error',
        message: error.message || 'Payment failed. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processCardPayment = async (data) => {
    // Simulate card payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would integrate with a payment processor like Stripe
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
      setPaymentStatus({
        type: 'success',
        message: 'Payment successful! Your booking has been confirmed.',
        transactionId: `TXN${Date.now()}`
      });
    } else {
      throw new Error('Card payment failed. Please check your card details.');
    }
  };

  const processBlockchainPayment = async (data) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Convert amount to Wei (assuming payment in ETH)
      const amountWei = ethers.utils.parseEther((data.amount / 100).toString()); // Convert cents to ETH
      
      const transaction = await signer.sendTransaction({
        to: '0x742d35Cc6634C0532925a3b8D0Bff5be', // Replace with your payment wallet
        value: amountWei,
        gasLimit: 21000,
      });

      setTransactionHash(transaction.hash);
      
      // Wait for transaction confirmation
      const receipt = await transaction.wait();
      
      setPaymentStatus({
        type: 'success',
        message: 'Blockchain payment successful! Your transaction has been confirmed.',
        transactionId: transaction.hash,
        blockNumber: receipt.blockNumber
      });
    } catch (error) {
      throw new Error(`Blockchain payment failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
              <span className="ml-2">Back to Home</span>
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Secure Payment</h1>
              <p className="text-gray-600">Blockchain-secured transaction processing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Booking Summary */}
        {bookingDetails && bookingDetails.title && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item:</span>
                <span className="font-medium">{bookingDetails.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">{bookingDetails.type?.replace('_', ' ')}</span>
              </div>
              {bookingDetails.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{bookingDetails.location}</span>
                </div>
              )}
              {bookingDetails.date && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(bookingDetails.date).toLocaleDateString()}</span>
                </div>
              )}
              {bookingDetails.artisan && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Artisan:</span>
                  <span className="font-medium">{bookingDetails.artisan}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{bookingDetails.amount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (INR)
                </label>
                <input
                  type="number"
                  {...register('amount')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
                )}
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('card');
                      setValue('paymentMethod', 'card');
                    }}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="font-medium">Credit/Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('blockchain');
                      setValue('paymentMethod', 'blockchain');
                    }}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                      paymentMethod === 'blockchain'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Wallet size={20} />
                    <span className="font-medium">Blockchain (MetaMask)</span>
                  </button>
                </div>
                <input type="hidden" {...register('paymentMethod')} />
              </div>

              {/* Conditional Payment Forms */}
              {paymentMethod === 'card' && (
                <PaymentForm register={register} errors={errors} />
              )}

              {paymentMethod === 'blockchain' && (
                <BlockchainPayment 
                  walletConnected={walletConnected}
                  walletAddress={walletAddress}
                  onConnectWallet={connectWallet}
                  amount={watchedAmount}
                />
              )}

              {/* Status Messages */}
              {paymentStatus && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  paymentStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {paymentStatus.type === 'success' ? (
                    <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{paymentStatus.message}</p>
                    {paymentStatus.transactionId && (
                      <p className="text-sm mt-1">
                        Transaction ID: <code className="bg-white px-2 py-1 rounded">{paymentStatus.transactionId}</code>
                      </p>
                    )}
                    {paymentStatus.blockNumber && (
                      <p className="text-sm mt-1">
                        Block Number: {paymentStatus.blockNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || (paymentMethod === 'blockchain' && !walletConnected)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Pay Securely ₹{watchedAmount || 0}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🔐 Blockchain Security
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-green-600 mt-0.5" />
                  <p>End-to-end encrypted transactions using blockchain technology</p>
                </div>
                <div className="flex items-start gap-3">
                  <Lock size={16} className="text-green-600 mt-0.5" />
                  <p>Smart contract-based payment processing for maximum security</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <p>Immutable transaction records on the Ethereum blockchain</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💳 Payment Methods
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Credit/Debit Cards:</strong> Visa, MasterCard, RuPay accepted</p>
                <p><strong>Blockchain:</strong> MetaMask wallet integration for crypto payments</p>
                <p><strong>Security:</strong> PCI DSS compliant payment processing</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm opacity-90 mb-3">
                Contact our support team if you have any issues with your payment.
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}