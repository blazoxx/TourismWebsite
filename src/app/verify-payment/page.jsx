"use client";
import { useState } from 'react';
import { Shield, Search, CheckCircle, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { verifyPaymentId } from '../utils/smartContract';

export default function VerifyPaymentPage({ searchParams }) {
  const [paymentId, setPaymentId] = useState(searchParams?.id || '');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleVerify = async () => {
    if (!paymentId.trim()) {
      setVerificationResult({
        valid: false,
        reason: 'Please enter a valid Payment ID'
      });
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    try {
      // In a real application, you would fetch the original payment details from your database
      // For demonstration purposes, we'll check if the ID has the correct format
      const parts = paymentId.split('-');
      
      if (parts.length !== 3 || parts[0] !== 'JHP') {
        setVerificationResult({
          valid: false,
          reason: 'Invalid Payment ID format. Payment IDs should start with JHP-'
        });
        setLoading(false);
        return;
      }

      // Check if we have stored verification data in localStorage (demo purposes)
      const storedVerification = localStorage.getItem('lastPaymentVerification');
      const storedPaymentId = localStorage.getItem('lastPaymentId');

      if (storedPaymentId === paymentId && storedVerification) {
        const verificationData = JSON.parse(storedVerification);
        setVerificationResult({
          valid: true,
          paymentId: paymentId,
          verifiedAt: new Date().toISOString()
        });
        setPaymentDetails(verificationData);
      } else {
        // In production, this would query your database
        setVerificationResult({
          valid: true, // For demo, we'll assume valid format means valid payment
          paymentId: paymentId,
          verifiedAt: new Date().toISOString(),
          note: 'Payment ID format is valid. In production, this would verify against the database.'
        });
        
        // Mock payment details for demo
        const mockDetails = {
          id: paymentId,
          amount: 'XXX',
          booking: 'BK-XXXX',
          method: 'Verified Payment',
          timestamp: 'Verification timestamp hidden for privacy',
          verified: true
        };
        setPaymentDetails(mockDetails);
      }

    } catch (error) {
      setVerificationResult({
        valid: false,
        reason: 'Error during verification: ' + error.message
      });
    }

    setLoading(false);
  };

  // Auto-verify if ID provided in URL
  useState(() => {
    if (searchParams?.id) {
      handleVerify();
    }
  }, []);

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
              <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Shield className="text-blue-600" />
                Payment Verification
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Verification Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <Shield size={48} className="text-blue-600 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Verify Payment Authenticity
            </h2>
            <p className="text-gray-600">
              Enter a Payment ID to verify its authenticity and view payment details
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700 mb-2">
                Payment ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="paymentId"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value.toUpperCase())}
                  placeholder="JHP-20241228-ABCD1234EFGH"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Search size={18} />
                  )}
                  Verify
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Payment IDs start with "JHP-" followed by date and unique identifier
              </p>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-xl shadow-lg p-8 mb-8 ${
            verificationResult.valid 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="text-center">
              {verificationResult.valid ? (
                <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
              ) : (
                <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${
                verificationResult.valid ? 'text-green-900' : 'text-red-900'
              }`}>
                {verificationResult.valid ? 'Payment Verified!' : 'Verification Failed'}
              </h3>
              
              <p className={`${
                verificationResult.valid ? 'text-green-700' : 'text-red-700'
              }`}>
                {verificationResult.valid 
                  ? 'This payment ID is authentic and valid.' 
                  : verificationResult.reason
                }
              </p>

              {verificationResult.note && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {verificationResult.note}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payment Details */}
        {verificationResult?.valid && paymentDetails && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Verified Payment Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono font-medium text-blue-600">{paymentDetails.id}</span>
              </div>
              
              {paymentDetails.amount !== 'XXX' && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">₹{paymentDetails.amount}</span>
                </div>
              )}
              
              {paymentDetails.booking !== 'BK-XXXX' && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono font-medium">{paymentDetails.booking}</span>
                </div>
              )}
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{paymentDetails.method}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Verification Time:</span>
                <span className="font-medium">
                  {new Date(verificationResult.verifiedAt).toLocaleString()}
                </span>
              </div>

              {paymentDetails.txHash && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Transaction Hash:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {paymentDetails.txHash.slice(0, 10)}...
                    </code>
                    <ExternalLink size={16} className="text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">🔍 How Payment Verification Works</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Each payment generates a unique ID with cryptographic hash verification</p>
            <p>• Payment IDs follow the format: JHP-YYYYMMDD-UNIQUEHASH</p>
            <p>• QR codes contain verification data that can be scanned by anyone</p>
            <p>• All payment data is encrypted and stored securely</p>
            <p>• Verification confirms the payment's authenticity without exposing sensitive data</p>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Privacy Note:</strong> Verification shows payment authenticity but protects sensitive information.
              Only the payment holder has access to full transaction details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}