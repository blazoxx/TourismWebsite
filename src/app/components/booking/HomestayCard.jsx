"use client";
import Link from 'next/link';
import { CreditCard, Wifi, Car, Utensils, Bed, Star } from 'lucide-react';

export default function HomestayCard({ 
  homestayData = {
    id: 1,
    name: "Traditional Jharkhand Homestay",
    location: "Ranchi, Jharkhand",
    pricePerNight: 1200,
    rating: 4.5,
    reviews: 89,
    image: "/images/districts/ranchi1.jpg",
    amenities: ["WiFi", "Parking", "Traditional Food", "Air Conditioning"],
    hostName: "Rajesh Kumar",
    roomType: "Private Room"
  }
}) {
  
  const handleBookNow = () => {
    // Store homestay details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: homestayData.id,
      title: homestayData.name,
      price: homestayData.pricePerNight,
      type: 'homestay',
      location: homestayData.location,
      roomType: homestayData.roomType
    }));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi size={14} />;
      case 'parking': return <Car size={14} />;
      case 'traditional food': return <Utensils size={14} />;
      case 'air conditioning': return <Bed size={14} />;
      default: return <span className="w-3.5 h-3.5 rounded-full bg-green-500"></span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Homestay Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={homestayData.image} 
          alt={homestayData.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-homestay.jpg';
          }}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-green-600">₹{homestayData.pricePerNight}</span>
          <span className="text-xs text-gray-500">/night</span>
        </div>
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {homestayData.roomType}
        </div>
      </div>

      {/* Homestay Details */}
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900">{homestayData.name}</h3>
          <p className="text-gray-600 text-sm">{homestayData.location}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium">{homestayData.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({homestayData.reviews} reviews)</span>
        </div>

        {/* Host Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Hosted by <span className="font-medium text-gray-900">{homestayData.hostName}</span>
          </p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Amenities:</h4>
          <div className="grid grid-cols-2 gap-2">
            {homestayData.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/homestays/${homestayData.id}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 text-center"
          >
            View Details
          </Link>
          <Link
            href={`/payment?package=${homestayData.id}&amount=${homestayData.pricePerNight}&title=${encodeURIComponent(homestayData.name)}&type=homestay&location=${encodeURIComponent(homestayData.location)}`}
            onClick={handleBookNow}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            Book Stay
          </Link>
        </div>
      </div>
    </div>
  );
}