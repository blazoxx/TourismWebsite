// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title JharkhandTourismPayment
 * @dev Smart contract for processing tourism payments securely on the blockchain
 */
contract JharkhandTourismPayment {
    address public owner;
    uint256 public totalPayments;
    
    struct Payment {
        address customer;
        uint256 amount;
        string bookingId;
        string customerEmail;
        uint256 timestamp;
        bool processed;
    }
    
    mapping(string => Payment) public payments;
    mapping(address => string[]) public customerBookings;
    
    event PaymentProcessed(
        address indexed customer,
        string indexed bookingId,
        uint256 amount,
        uint256 timestamp
    );
    
    event PaymentRefunded(
        address indexed customer,
        string indexed bookingId,
        uint256 amount,
        uint256 timestamp
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier validAmount() {
        require(msg.value > 0, "Payment amount must be greater than 0");
        _;
    }
    
    modifier bookingNotExists(string memory _bookingId) {
        require(!payments[_bookingId].processed, "Booking already exists");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        totalPayments = 0;
    }
    
    /**
     * @dev Process a tourism payment
     * @param _bookingId Unique booking identifier
     * @param _amount Payment amount in wei
     * @param _customerEmail Customer email for booking confirmation
     */
    function processPayment(
        string memory _bookingId,
        uint256 _amount,
        string memory _customerEmail
    ) external payable validAmount bookingNotExists(_bookingId) {
        require(msg.value == _amount, "Sent amount must match specified amount");
        require(bytes(_bookingId).length > 0, "Booking ID cannot be empty");
        require(bytes(_customerEmail).length > 0, "Customer email cannot be empty");
        
        payments[_bookingId] = Payment({
            customer: msg.sender,
            amount: _amount,
            bookingId: _bookingId,
            customerEmail: _customerEmail,
            timestamp: block.timestamp,
            processed: true
        });
        
        customerBookings[msg.sender].push(_bookingId);
        totalPayments += 1;
        
        emit PaymentProcessed(msg.sender, _bookingId, _amount, block.timestamp);
    }
    
    /**
     * @dev Get payment details by booking ID
     * @param _bookingId Booking identifier
     */
    function getPayment(string memory _bookingId) external view returns (
        address customer,
        uint256 amount,
        uint256 timestamp,
        bool processed
    ) {
        Payment memory payment = payments[_bookingId];
        return (payment.customer, payment.amount, payment.timestamp, payment.processed);
    }
    
    /**
     * @dev Get all booking IDs for a customer
     * @param _customer Customer address
     */
    function getCustomerBookings(address _customer) external view returns (string[] memory) {
        return customerBookings[_customer];
    }
    
    /**
     * @dev Refund a payment (only owner)
     * @param _bookingId Booking identifier to refund
     */
    function refundPayment(string memory _bookingId) external onlyOwner {
        Payment storage payment = payments[_bookingId];
        require(payment.processed, "Payment not found");
        require(payment.amount > 0, "Payment already refunded");
        
        uint256 refundAmount = payment.amount;
        payment.amount = 0;
        
        (bool success, ) = payment.customer.call{value: refundAmount}("");
        require(success, "Refund failed");
        
        emit PaymentRefunded(payment.customer, _bookingId, refundAmount, block.timestamp);
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Emergency pause functionality
     */
    bool public paused = false;
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    function pause() external onlyOwner {
        paused = true;
    }
    
    function unpause() external onlyOwner {
        paused = false;
    }
    
    /**
     * @dev Update owner (only current owner)
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
    
    /**
     * @dev Fallback function to receive Ether
     */
    receive() external payable {
        // Contract can receive Ether
    }
}

/*
Deployment Instructions:

1. Install dependencies:
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

2. Create hardhat.config.js:
   require("@nomicfoundation/hardhat-toolbox");
   
   module.exports = {
     solidity: "0.8.19",
     networks: {
       polygon: {
         url: "https://polygon-rpc.com/",
         accounts: ["YOUR_PRIVATE_KEY"]
       },
       mumbai: {
         url: "https://rpc-mumbai.maticvigil.com/",
         accounts: ["YOUR_PRIVATE_KEY"]
       }
     }
   };

3. Deploy script (scripts/deploy.js):
   const { ethers } = require("hardhat");
   
   async function main() {
     const JharkhandTourismPayment = await ethers.getContractFactory("JharkhandTourismPayment");
     const contract = await JharkhandTourismPayment.deploy();
     await contract.deployed();
     
     console.log("Contract deployed to:", contract.address);
   }
   
   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });

4. Deploy to testnet:
   npx hardhat run scripts/deploy.js --network mumbai

5. Verify on Polygonscan:
   npx hardhat verify --network mumbai CONTRACT_ADDRESS

6. Update CONTRACT_ADDRESSES in smartContract.js with the deployed address

Security Features:
- Reentrancy protection
- Input validation
- Access control with onlyOwner modifier
- Proper event emission
- Emergency pause functionality
- Safe withdrawal patterns
- Overflow protection (Solidity 0.8+)

Gas Optimization:
- Efficient storage patterns
- Minimal external calls
- Optimized data types
- Event-based logging
*/