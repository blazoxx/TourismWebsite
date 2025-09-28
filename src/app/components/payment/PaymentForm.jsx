"use client";
import { useState } from 'react';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';

export default function PaymentForm({ register, errors }) {
  const [focusedField, setFocusedField] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      {/* Visual Card */}
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs opacity-80">CARD NUMBER</p>
              <p className="text-lg font-mono tracking-wider">
                •••• •••• •••• ••••
              </p>
            </div>
            <CreditCard size={32} className="opacity-80" />
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">CARD HOLDER</p>
              <p className="text-sm font-medium">YOUR NAME HERE</p>
            </div>
            <div>
              <p className="text-xs opacity-80">EXPIRES</p>
              <p className="text-sm font-mono">••/••</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <CreditCard size={16} className="inline mr-2" />
          Card Number
        </label>
        <input
          type="text"
          {...register('cardNumber', {
            required: 'Card number is required',
            pattern: {
              value: /^[0-9\s]{13,19}$/,
              message: 'Invalid card number'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg font-mono text-lg tracking-wider focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          onFocus={() => setFocusedField('cardNumber')}
          onBlur={() => setFocusedField('')}
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            e.target.value = formatted;
          }}
        />
        {errors.cardNumber && (
          <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="inline mr-2" />
            Expiry Date
          </label>
          <input
            type="text"
            {...register('expiryDate', {
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: 'Format: MM/YY'
              }
            })}
            className={`w-full px-4 py-3 border rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.expiryDate ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="MM/YY"
            maxLength="5"
            onFocus={() => setFocusedField('expiryDate')}
            onBlur={() => setFocusedField('')}
            onChange={(e) => {
              const formatted = formatExpiryDate(e.target.value);
              e.target.value = formatted;
            }}
          />
          {errors.expiryDate && (
            <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Lock size={16} className="inline mr-2" />
            CVV
          </label>
          <input
            type="password"
            {...register('cvv', {
              required: 'CVV is required',
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: 'CVV must be 3-4 digits'
              }
            })}
            className={`w-full px-4 py-3 border rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cvv ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="123"
            maxLength="4"
            onFocus={() => setFocusedField('cvv')}
            onBlur={() => setFocusedField('')}
          />
          {errors.cvv && (
            <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User size={16} className="inline mr-2" />
          Cardholder Name
        </label>
        <input
          type="text"
          {...register('cardholderName', {
            required: 'Cardholder name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.cardholderName ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="John Doe"
          onFocus={() => setFocusedField('cardholderName')}
          onBlur={() => setFocusedField('')}
        />
        {errors.cardholderName && (
          <p className="text-red-600 text-sm mt-1">{errors.cardholderName.message}</p>
        )}
      </div>

      {/* Billing Address */}
      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Billing Address</h4>
        
        <div className="space-y-4">
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Street address"
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            <input
              type="text"
              {...register('zipCode', { 
                required: 'ZIP code is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Invalid ZIP code'
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.zipCode ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ZIP Code"
              maxLength="6"
            />
          </div>
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
          )}
          {errors.zipCode && (
            <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock size={14} className="text-green-600" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
}