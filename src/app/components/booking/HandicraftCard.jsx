"use client";
import Link from 'next/link';
import { CreditCard, ShoppingCart, Package, Star, Truck } from 'lucide-react';

export default function HandicraftCard({ 
  handicraftData = {
    id: 1,
    name: "Traditional Dokra Art Figurine",
    description: "Handcrafted bronze figurine made using the ancient Dokra technique by tribal artisans.",
    price: 850,
    originalPrice: 1200,
    rating: 4.7,
    reviews: 34,
    image: "/images/districtgems/img1.jpg",
    artisan: "Ravi Mahato",
    village: "Chaibasa, West Singhbhum",
    inStock: true,
    stockCount: 12,
    shippingInfo: "Free shipping within Jharkhand"
  }
}) {
  
  const handleBuyNow = () => {
    // Store handicraft details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: handicraftData.id,
      title: handicraftData.name,
      price: handicraftData.price,
      type: 'handicraft_purchase',
      artisan: handicraftData.artisan,
      village: handicraftData.village
    }));
  };

  const discountPercentage = Math.round(((handicraftData.originalPrice - handicraftData.price) / handicraftData.originalPrice) * 100);
  const isLowStock = handicraftData.stockCount < 5;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Handicraft Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={handicraftData.image} 
          alt={handicraftData.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-handicraft.jpg';
          }}
        />
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">₹{handicraftData.price}</div>
            {handicraftData.originalPrice > handicraftData.price && (
              <div className="text-sm text-gray-500 line-through">₹{handicraftData.originalPrice}</div>
            )}
          </div>
        </div>
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {discountPercentage}% OFF
          </div>
        )}
        {isLowStock && (
          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Only {handicraftData.stockCount} left!
          </div>
        )}
      </div>

      {/* Handicraft Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{handicraftData.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{handicraftData.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium">{handicraftData.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({handicraftData.reviews} reviews)</span>
        </div>

        {/* Artisan Info */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Package size={14} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-900">Handcrafted by</span>
          </div>
          <p className="text-sm text-gray-700">{handicraftData.artisan}</p>
          <p className="text-xs text-gray-500">{handicraftData.village}</p>
        </div>

        {/* Shipping Info */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Truck size={14} className="text-green-500" />
          <span>{handicraftData.shippingInfo}</span>
        </div>

        {/* Stock Status */}
        <div className="mb-6">
          {handicraftData.inStock ? (
            <div className={`flex items-center gap-2 text-sm ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
              <div className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-orange-500' : 'bg-green-500'}`}></div>
              <span>{isLowStock ? `Only ${handicraftData.stockCount} in stock` : 'In Stock'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/handicrafts/${handicraftData.id}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 text-center"
          >
            View Details
          </Link>
          {handicraftData.inStock ? (
            <Link
              href={`/payment?package=${handicraftData.id}&amount=${handicraftData.price}&title=${encodeURIComponent(handicraftData.name)}&type=handicraft_purchase&artisan=${encodeURIComponent(handicraftData.artisan)}`}
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <CreditCard size={16} />
              Buy Now
            </Link>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}