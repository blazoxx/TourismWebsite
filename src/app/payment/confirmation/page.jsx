"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, ExternalLink, ArrowLeft, Download, QrCode, Copy, Shield } from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { getExplorerUrl, generateUniquePaymentId, generateVerificationData } from '../../utils/smartContract';

export default function PaymentConfirmationPage({ searchParams }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch payment details from your backend
    // For now, we'll use URL parameters or localStorage
    const details = {
      transactionHash: searchParams?.txHash || localStorage.getItem('lastPaymentTx'),
      amount: searchParams?.amount || localStorage.getItem('lastPaymentAmount'),
      method: searchParams?.method || localStorage.getItem('lastPaymentMethod'),
      status: searchParams?.status || 'success',
      timestamp: new Date().toISOString(),
      bookingId: searchParams?.bookingId || `BK${Date.now()}`,
      customerEmail: searchParams?.email || localStorage.getItem('lastPaymentEmail'),
      chainId: searchParams?.chainId || localStorage.getItem('lastPaymentChain'),
    };

    // Generate unique payment ID and verification data
    const uniqueIdData = generateUniquePaymentId(details);
    const enhancedDetails = {
      ...details,
      paymentId: uniqueIdData.paymentId,
      paymentHash: uniqueIdData.hash,
      verificationTimestamp: uniqueIdData.timestamp
    };

    setPaymentDetails(enhancedDetails);
    
    // Generate QR code data for verification
    const verificationData = generateVerificationData(enhancedDetails);
    setQrData(JSON.stringify(verificationData, null, 2));
    
    setLoading(false);

    // Store the unique payment ID for future reference
    localStorage.setItem('lastPaymentId', uniqueIdData.paymentId);
    localStorage.setItem('lastPaymentVerification', JSON.stringify(verificationData));

    // Clear other localStorage items after loading
    localStorage.removeItem('lastPaymentTx');
    localStorage.removeItem('lastPaymentAmount');
    localStorage.removeItem('lastPaymentMethod');
    localStorage.removeItem('lastPaymentEmail');
    localStorage.removeItem('lastPaymentChain');
  }, [searchParams]);

  const downloadReceipt = () => {
    if (!paymentDetails) return;

    const receiptData = {
      paymentId: paymentDetails.paymentId,
      bookingId: paymentDetails.bookingId,
      transactionHash: paymentDetails.transactionHash,
      amount: paymentDetails.amount,
      method: paymentDetails.method,
      timestamp: paymentDetails.timestamp,
      customerEmail: paymentDetails.customerEmail,
      verificationUrl: `${window.location.origin}/verify-payment?id=${paymentDetails.paymentId}`,
      qrData: qrData
    };

    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `payment-receipt-${paymentDetails.bookingId}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const copyPaymentId = async () => {
    if (!paymentDetails?.paymentId) return;
    
    try {
      await navigator.clipboard.writeText(paymentDetails.paymentId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Failed to copy payment ID:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const isSuccess = paymentDetails?.status === 'success';

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
              <h1 className="text-2xl font-bold text-gray-900">Payment Confirmation</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Status Card */}
        <div className={`rounded-xl shadow-lg p-8 mb-8 ${
          isSuccess 
            ? 'bg-green-50 border-2 border-green-200' 
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="text-center">
            {isSuccess ? (
              <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            ) : (
              <AlertCircle size={64} className="text-red-600 mx-auto mb-4" />
            )}
            
            <h2 className={`text-2xl font-bold mb-2 ${
              isSuccess ? 'text-green-900' : 'text-red-900'
            }`}>
              {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
            </h2>
            
            <p className={`text-lg ${
              isSuccess ? 'text-green-700' : 'text-red-700'
            }`}>
              {isSuccess 
                ? 'Your payment has been processed successfully.'
                : 'There was an issue processing your payment.'
              }
            </p>
          </div>
        </div>

        {/* Payment Details */}
        {isSuccess && paymentDetails && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h3>
            
            <div className="space-y-4">
              {/* Unique Payment ID - Most Important */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="text-blue-600" size={20} />
                    <span className="font-semibold text-blue-900">Unique Payment ID</span>
                  </div>
                  <button
                    onClick={copyPaymentId}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Copy size={16} />
                    {copiedId ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="font-mono text-lg font-bold text-blue-800 bg-white px-3 py-2 rounded border">
                  {paymentDetails.paymentId}
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Keep this ID safe! Use it for verification, customer support, or refund requests.
                </p>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono font-medium">{paymentDetails.bookingId}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-green-600">₹{paymentDetails.amount}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">
                  {paymentDetails.method === 'blockchain' ? 'Blockchain (MetaMask)' : 'Credit/Debit Card'}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {new Date(paymentDetails.timestamp).toLocaleString()}
                </span>
              </div>
              
              {paymentDetails.customerEmail && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Customer Email:</span>
                  <span className="font-medium">{paymentDetails.customerEmail}</span>
                </div>
              )}
              
              {paymentDetails.transactionHash && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Transaction Hash:</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {paymentDetails.transactionHash.slice(0, 10)}...
                    </code>
                    {paymentDetails.chainId && (
                      <a
                        href={getExplorerUrl(parseInt(paymentDetails.chainId), paymentDetails.transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* QR Code Section */}
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <QrCode className="text-blue-600" size={20} />
                  Payment Verification QR Code
                </h4>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showQR ? 'Hide QR' : 'Show QR'}
                </button>
              </div>
              
              {showQR && qrData && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="inline-block bg-white p-4 rounded-lg shadow-sm">
                    <QRCode
                      value={qrData}
                      size={200}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="font-medium">Scan to verify payment authenticity</p>
                    <p className="mt-1">Contains: Payment ID, Transaction Details & Verification URL</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={downloadReceipt}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Receipt
              </button>
              
              <Link 
                href="/dashboard"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 text-center"
              >
                View Bookings
              </Link>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">🔒 Security & Verification</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Your payment information is encrypted and secure</p>
            <p>✓ {paymentDetails?.method === 'blockchain' ? 'Transaction recorded on blockchain' : 'PCI DSS compliant processing'}</p>
            <p>✓ No sensitive payment data is stored on our servers</p>
            <p>✓ Unique Payment ID generated with SHA-256 cryptographic hash</p>
            <p>✓ QR code contains verification data for payment authenticity</p>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Save your unique Payment ID ({paymentDetails?.paymentId}) and this page or download the receipt. 
              You will need the Payment ID for verification, customer support, and any future reference.
            </p>
          </div>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Verification:</strong> Anyone can verify your payment authenticity using the QR code or 
              by visiting our verification page with your unique Payment ID.
            </p>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mt-8">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm opacity-90 mb-3">
            If you have any questions about your payment or booking, our support team is here to help.
          </p>
          <div className="flex gap-3">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
              Contact Support
            </button>
            <Link 
              href="/help"
              className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}