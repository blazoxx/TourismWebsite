# 🔐 Blockchain-Secured Payment System for Jharkhand Tourism

A comprehensive payment solution that integrates traditional payment methods with blockchain security for the Jharkhand Tourism platform.

## 🚀 Features

### 💳 Payment Methods
- **Credit/Debit Cards**: Traditional payment processing with PCI DSS compliance
- **Blockchain Payments**: MetaMask integration for cryptocurrency transactions
- **Multi-Network Support**: Ethereum, Polygon, BSC, and testnets

### 🔒 Security Features
- **Blockchain Security**: Immutable transaction records
- **Smart Contract Integration**: Secure payment processing
- **Encrypted Data**: End-to-end encryption for sensitive information
- **MetaMask Integration**: Secure wallet connectivity
- **Transaction Verification**: Real-time blockchain confirmation

### 🎨 User Experience
- **Responsive Design**: Works on all devices
- **Real-time Validation**: Instant form validation
- **Payment Status Tracking**: Live transaction monitoring
- **Receipt Generation**: Downloadable payment receipts
- **Network Switching**: Automatic network recommendations

## 📦 Installation

### Prerequisites
```bash
Node.js >= 18.x
npm or yarn
MetaMask browser extension (for blockchain payments)
```

### Dependencies Installation
```bash
npm install ethers web3 @web3-react/core @web3-react/injected-connector react-hook-form yup crypto-js @metamask/providers
```

## 🛠️ Setup

### 1. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D0Bff5be
NEXT_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
NEXT_PUBLIC_NETWORK_MODE=testnet
```

### 2. Smart Contract Deployment
```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat project
npx hardhat init

# Deploy to testnet
npx hardhat run scripts/deploy.js --network mumbai
```

### 3. Update Contract Addresses
Update `src/app/utils/smartContract.js` with deployed contract addresses:
```javascript
export const CONTRACT_ADDRESSES = {
  137: '0xYourPolygonMainnetAddress',
  80001: '0xYourMumbaiTestnetAddress',
  // ... other networks
};
```

## 🔧 Usage

### Basic Payment Flow
```javascript
import { useWeb3 } from '../context/Web3Context';

function MyComponent() {
  const { connectWallet, isConnected, sendTransaction } = useWeb3();
  
  const handlePayment = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    
    const tx = await sendTransaction(
      '0xRecipientAddress',
      '0.001', // Amount in ETH
      21000   // Gas limit
    );
  };
}
```

### Smart Contract Integration
```javascript
import PaymentContract from '../utils/smartContract';

const contract = new PaymentContract(provider, signer, chainId);

// Process payment through smart contract
const transaction = await contract.processPayment(
  'booking-123',
  0.001, // Amount in ETH
  'customer@example.com'
);
```

## 📁 File Structure
```
src/app/
├── payment/
│   ├── page.jsx                 # Main payment page
│   └── confirmation/
│       └── page.jsx             # Payment confirmation
├── components/payment/
│   ├── PaymentForm.jsx          # Credit card form
│   └── BlockchainPayment.jsx    # Blockchain payment UI
├── context/
│   └── Web3Context.jsx          # Web3 provider
├── utils/
│   └── smartContract.js         # Smart contract utilities
└── contracts/
    └── JharkhandTourismPayment.sol  # Solidity contract
```

## 🌐 Supported Networks

| Network | Chain ID | Currency | Status |
|---------|----------|----------|---------|
| Ethereum Mainnet | 1 | ETH | ✅ |
| Polygon Mainnet | 137 | MATIC | ✅ |
| BSC Mainnet | 56 | BNB | ✅ |
| Sepolia Testnet | 11155111 | SEP | ✅ |
| Polygon Mumbai | 80001 | MATIC | ✅ |

## 🔒 Security Best Practices

### Smart Contract Security
- ✅ Reentrancy protection
- ✅ Input validation
- ✅ Access control
- ✅ Emergency pause functionality
- ✅ Safe withdrawal patterns

### Frontend Security
- ✅ Input sanitization
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure data transmission
- ✅ No sensitive data in localStorage

### Payment Security
- ✅ PCI DSS compliance for card payments
- ✅ Encrypted transaction data
- ✅ Secure API endpoints
- ✅ Rate limiting
- ✅ Fraud detection

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:integration
```

### Smart Contract Tests
```bash
npx hardhat test
```

## 📈 Monitoring & Analytics

### Transaction Tracking
- Real-time payment status
- Blockchain confirmations
- Gas fee optimization
- Network performance metrics

### Error Handling
- Comprehensive error messages
- Retry mechanisms
- Fallback payment methods
- User-friendly error states

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS=production_wallet_address
NEXT_PUBLIC_INFURA_PROJECT_ID=production_infura_id
NEXT_PUBLIC_NETWORK_MODE=mainnet
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: support@jharkhnadtourism.gov.in
- Documentation: [Payment API Docs](./docs/payment-api.md)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

- [ ] Multi-signature wallet support
- [ ] Layer 2 scaling solutions
- [ ] Mobile app integration
- [ ] Recurring payments
- [ ] Loyalty token rewards
- [ ] Cross-chain bridging
- [ ] DeFi yield integration

---

**Built with ❤️ for Jharkhand Tourism**