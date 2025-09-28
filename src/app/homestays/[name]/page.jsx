"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Users, 
  Home, 
  Phone, 
  Mail,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function HomestayDetailPage({ params }) {
  const [homestay, setHomestay] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [guests, setGuests] = useState(2);
  const [totalNights, setTotalNights] = useState(1);

  // Sample homestay data - in a real app, you'd fetch this based on params.name
  const homestayData = {
    id: 1,
    name: "Tribal Heritage Homestay",
    location: "Ranchi, Jharkhand",
    host: "Suman Munda",
    description: "Experience authentic tribal culture in a traditional mud house. Learn about Munda customs, participate in daily activities, and enjoy organic meals prepared with locally sourced ingredients. Our family has been preserving Munda traditions for generations and we're excited to share our way of life with you.",
    image: "/images/districts/ranchi1.jpg",
    images: [
      "/images/districts/ranchi1.jpg",
      "/images/districts/ranchi2.jpg",
      "/images/districts/ranchi3.avif"
    ],
    pricePerNight: 1200,
    rating: 4.8,
    reviews: 45,
    amenities: [
      "Traditional meals included",
      "Cultural activities",
      "Nature walks",
      "Organic farming experience",
      "WiFi available",
      "Parking space",
      "Clean bathrooms",
      "Traditional music sessions"
    ],
    rooms: 3,
    maxGuests: 8,
    languages: ["Hindi", "English", "Mundari"],
    contact: {
      phone: "+91 98765 43210",
      email: "suman.munda@gmail.com"
    },
    specialties: [
      "Tribal cooking classes",
      "Traditional crafts workshop",
      "Folk music and dance sessions",
      "Village walks and interaction",
      "Organic farming participation",
      "Local festival participation"
    ],
    houseRules: [
      "Check-in: 2:00 PM - 8:00 PM",
      "Check-out: 11:00 AM",
      "Respect local customs and traditions",
      "Participate in family activities",
      "No smoking inside the house",
      "Inform host about dietary restrictions"
    ],
    nearbyAttractions: [
      "Rock Garden - 5 km",
      "Ranchi Lake - 8 km", 
      "Tagore Hill - 10 km",
      "Birsa Munda Park - 12 km"
    ]
  };

  useEffect(() => {
    setHomestay(homestayData);
  }, []);

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const checkIn = new Date(selectedDates.checkIn);
      const checkOut = new Date(selectedDates.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays > 0 ? diffDays : 1);
    }
  }, [selectedDates]);

  const handleBookNow = () => {
    const totalAmount = homestay.pricePerNight * totalNights;
    
    // Store booking details
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: homestay.id,
      title: homestay.name,
      price: totalAmount,
      type: 'homestay',
      location: homestay.location,
      host: homestay.host,
      checkIn: selectedDates.checkIn,
      checkOut: selectedDates.checkOut,
      guests: guests,
      nights: totalNights,
      pricePerNight: homestay.pricePerNight
    }));
  };

  if (!homestay) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const totalAmount = homestay.pricePerNight * totalNights;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/homestays" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Homestays
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={homestay.image}
                  alt={homestay.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {homestay.images?.slice(1, 4).map((img, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`${homestay.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{homestay.location}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{homestay.name}</h1>
              <p className="text-lg text-gray-600 mb-4">Hosted by {homestay.host}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{homestay.rating}</span>
                  <span className="text-gray-600">({homestay.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {homestay.rooms} rooms
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Up to {homestay.maxGuests} guests
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{homestay.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {homestay.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes Us Special</h2>
              <div className="space-y-3">
                {homestay.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-blue-500 mt-0.5" />
                    <span className="text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">House Rules</h2>
              <div className="space-y-2">
                {homestay.houseRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-500 mt-1" />
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">₹{homestay.pricePerNight}</div>
                <div className="text-gray-600">per night</div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Array.from({ length: homestay.maxGuests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Booking Summary */}
              {selectedDates.checkIn && selectedDates.checkOut && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>₹{homestay.pricePerNight} x {totalNights} nights</span>
                      <span>₹{homestay.pricePerNight * totalNights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{guests} guests</span>
                      <span>-</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              <Link
                href={`/payment?package=${homestay.id}&amount=${totalAmount}&title=${encodeURIComponent(homestay.name)}&type=homestay&location=${encodeURIComponent(homestay.location)}&host=${encodeURIComponent(homestay.host)}&checkIn=${selectedDates.checkIn}&checkOut=${selectedDates.checkOut}&guests=${guests}&nights=${totalNights}`}
                onClick={handleBookNow}
                className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  selectedDates.checkIn && selectedDates.checkOut
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                {selectedDates.checkIn && selectedDates.checkOut 
                  ? `Book for ₹${totalAmount}` 
                  : 'Select dates to book'
                }
              </Link>

              {/* Contact Host */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Contact Host</h3>
                <div className="space-y-2">
                  <a 
                    href={`tel:${homestay.contact.phone}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="w-4 h-4" />
                    {homestay.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${homestay.contact.email}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="w-4 h-4" />
                    {homestay.contact.email}
                  </a>
                </div>
                
                <div className="mt-3">
                  <span className="text-sm text-gray-600">Languages: {homestay.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}