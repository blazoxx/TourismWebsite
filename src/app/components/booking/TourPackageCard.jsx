"use client";
import Link from 'next/link';
import { CreditCard, MapPin, Star, Clock, Users } from 'lucide-react';

export default function TourPackageCard({ 
  packageData = {
    id: 1,
    title: "Jharkhand Heritage Tour",
    description: "Explore the rich cultural heritage of Jharkhand with visits to ancient temples, waterfalls, and tribal villages.",
    price: 2500,
    duration: "3 days, 2 nights",
    groupSize: "2-8 people",
    rating: 4.8,
    reviews: 156,
    image: "/images/places/baba_baidyanath.png",
    highlights: ["Baba Baidyanath Temple", "Betla National Park", "Tribal Culture Experience"]
  }
}) {
  
  const handleBookNow = () => {
    // Store package details in localStorage for the payment page
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: packageData.id,
      title: packageData.title,
      price: packageData.price,
      type: 'tour_package'
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Package Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={packageData.image} 
          alt={packageData.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-tour.jpg';
          }}
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-green-600">
          ₹{packageData.price}
        </div>
      </div>

      {/* Package Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{packageData.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{packageData.description}</p>

        {/* Package Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{packageData.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{packageData.groupSize}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="font-medium">{packageData.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({packageData.reviews} reviews)</span>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
          <ul className="space-y-1">
            {packageData.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <MapPin size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/places/${packageData.id}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 text-center"
          >
            View Details
          </Link>
          <Link
            href={`/payment?package=${packageData.id}&amount=${packageData.price}&title=${encodeURIComponent(packageData.title)}&type=tour_package`}
            onClick={handleBookNow}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}