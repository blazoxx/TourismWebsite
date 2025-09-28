"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Wifi, Car, Coffee, Users, Home, Phone, Mail, CreditCard } from "lucide-react";

export default function HomestaysPage() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedPriceRange, setPriceRange] = useState("all");

  const homestays = [
    {
      id: 1,
      name: "Tribal Heritage Homestay",
      location: "Ranchi",
      host: "Suman Munda",
      description: "Experience authentic tribal culture in a traditional mud house. Learn about Munda customs, participate in daily activities, and enjoy organic meals.",
      image: "/images/districtgems/img1.jpg",
      price: "₹1,200",
      priceRange: "budget",
      rating: 4.8,
      reviews: 45,
      amenities: ["Traditional meals", "Cultural activities", "Nature walks", "Organic farming"],
      rooms: 3,
      maxGuests: 8,
      languages: ["Hindi", "English", "Mundari"],
      contact: {
        phone: "+91 98765 43210",
        email: "suman.munda@gmail.com"
      },
      specialties: ["Tribal cooking classes", "Traditional crafts", "Folk music sessions"]
    },
    {
      id: 2,
      name: "Netarhat Hill View Homestay",
      location: "Netarhat",
      host: "Rajesh Kumar",
      description: "Wake up to breathtaking sunrise views from the Queen of Chotanagpur. Perfect for nature lovers and photographers.",
      image: "/images/districtgems/img2.jpg",
      price: "₹2,000",
      priceRange: "mid",
      rating: 4.9,
      reviews: 62,
      amenities: ["Mountain views", "Bonfire", "Trekking guide", "Photography tours"],
      rooms: 4,
      maxGuests: 12,
      languages: ["Hindi", "English", "Bengali"],
      contact: {
        phone: "+91 87654 32109",
        email: "rajesh.netarhat@gmail.com"
      },
      specialties: ["Sunrise tours", "Nature photography", "Local trekking"]
    },
    {
      id: 3,
      name: "Eco Village Homestay",
      location: "Hazaribagh",
      host: "Priya Devi",
      description: "Sustainable living experience with solar power, rainwater harvesting, and organic farming. Perfect for eco-conscious travelers.",
      image: "/images/districtgems/img3.jpg",
      price: "₹1,800",
      priceRange: "mid",
      rating: 4.7,
      reviews: 38,
      amenities: ["Solar power", "Organic garden", "Yoga sessions", "Meditation space"],
      rooms: 5,
      maxGuests: 15,
      languages: ["Hindi", "English"],
      contact: {
        phone: "+91 76543 21098",
        email: "priya.ecovillage@gmail.com"
      },
      specialties: ["Sustainable living", "Organic farming", "Wellness programs"]
    },
    {
      id: 4,
      name: "Waterfall View Homestay",
      location: "Hundru Falls",
      host: "Amit Singh",
      description: "Stay near the magnificent Hundru Falls. Enjoy the sound of cascading water and explore nearby trekking trails.",
      image: "/images/districtgems/img4.jpg",
      price: "₹1,500",
      priceRange: "budget",
      rating: 4.6,
      reviews: 29,
      amenities: ["Waterfall access", "Trekking trails", "Picnic spots", "Local cuisine"],
      rooms: 3,
      maxGuests: 10,
      languages: ["Hindi", "English"],
      contact: {
        phone: "+91 65432 10987",
        email: "amit.hundru@gmail.com"
      },
      specialties: ["Waterfall tours", "Adventure activities", "Local cuisine"]
    },
    {
      id: 5,
      name: "Forest Lodge Homestay",
      location: "Betla National Park",
      host: "Sunita Oraon",
      description: "Stay on the edge of Betla National Park. Perfect base for wildlife safaris and bird watching expeditions.",
      image: "/images/districtgems/img1.jpg",
      price: "₹2,500",
      priceRange: "premium",
      rating: 4.9,
      reviews: 51,
      amenities: ["Safari arrangements", "Bird watching", "Nature guide", "Wildlife photography"],
      rooms: 4,
      maxGuests: 12,
      languages: ["Hindi", "English", "Oraon"],
      contact: {
        phone: "+91 54321 09876",
        email: "sunita.betla@gmail.com"
      },
      specialties: ["Wildlife safaris", "Bird watching", "Nature conservation"]
    },
    {
      id: 6,
      name: "Artisan Village Homestay",
      location: "Khunti",
      host: "Ramesh Mahato",
      description: "Live with skilled Dokra artisans and learn the ancient metal casting techniques. Participate in craft workshops.",
      image: "/images/districtgems/img2.jpg",
      price: "₹1,600",
      priceRange: "budget",
      rating: 4.8,
      reviews: 33,
      amenities: ["Craft workshops", "Artisan interactions", "Traditional meals", "Cultural programs"],
      rooms: 3,
      maxGuests: 9,
      languages: ["Hindi", "English", "Kurmali"],
      contact: {
        phone: "+91 43210 98765",
        email: "ramesh.dokra@gmail.com"
      },
      specialties: ["Dokra craft learning", "Metal casting", "Traditional arts"]
    }
  ];

  const locations = [
    { id: "all", name: "All Locations" },
    { id: "Ranchi", name: "Ranchi" },
    { id: "Netarhat", name: "Netarhat" },
    { id: "Hazaribagh", name: "Hazaribagh" },
    { id: "Hundru Falls", name: "Hundru Falls" },
    { id: "Betla National Park", name: "Betla National Park" },
    { id: "Khunti", name: "Khunti" }
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "budget", name: "Budget (₹1,000-1,800)" },
    { id: "mid", name: "Mid-range (₹1,800-2,500)" },
    { id: "premium", name: "Premium (₹2,500+)" }
  ];

  const filteredHomestays = homestays.filter(homestay => {
    const locationMatch = selectedLocation === "all" || homestay.location === selectedLocation;
    const priceMatch = selectedPriceRange === "all" || homestay.priceRange === selectedPriceRange;
    return locationMatch && priceMatch;
  });

  const handleBookNow = (homestay) => {
    // Store homestay details for payment
    const priceNumeric = parseInt(homestay.price.replace('₹', '').replace(',', ''));
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: homestay.id,
      title: homestay.name,
      price: priceNumeric,
      type: 'homestay',
      location: homestay.location,
      host: homestay.host,
      rooms: homestay.rooms,
      maxGuests: homestay.maxGuests
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Homestays</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Authentic Homestays
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Stay with local families and experience the warmth of Jharkhand hospitality. 
            Immerse yourself in local culture, traditions, and way of life.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Location</h3>
            <div className="flex flex-wrap gap-4">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedLocation === location.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="flex flex-wrap gap-4">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPriceRange === range.id
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Homestays Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomestays.map((homestay) => (
            <div key={homestay.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src={homestay.image}
                  alt={homestay.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{homestay.rating}</span>
                  <span className="ml-1 text-xs text-gray-600">({homestay.reviews})</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {homestay.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{homestay.name}</h3>
                <p className="text-sm text-gray-600 mb-3">Hosted by {homestay.host}</p>
                <p className="text-gray-600 mb-4 line-clamp-3">{homestay.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Home className="w-4 h-4 mr-1" />
                      {homestay.rooms} rooms
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      Up to {homestay.maxGuests} guests
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Amenities:</span>
                    <div className="flex flex-wrap gap-1">
                      {homestay.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {homestay.amenities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{homestay.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Specialties:</span>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {homestay.specialties.slice(0, 2).map((specialty, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="w-3 h-3 mr-2 text-blue-500" />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Contact available
                    </span>
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email booking
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">{homestay.price}</span>
                    <span className="text-sm text-gray-600">/night</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/homestays/${homestay.id}`}
                      className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/payment?package=${homestay.id}&amount=${homestay.price.replace('₹', '').replace(',', '')}&title=${encodeURIComponent(homestay.name)}&type=homestay&location=${encodeURIComponent(homestay.location)}&host=${encodeURIComponent(homestay.host)}`}
                      onClick={() => handleBookNow(homestay)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <CreditCard className="w-4 h-4" />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHomestays.length === 0 && (
          <div className="text-center py-16">
            <Home className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No homestays found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more options.</p>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Homestays?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Experience authentic local culture while supporting rural communities directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Cultural Immersion</h3>
              <p className="text-sm opacity-80">Live with local families and experience authentic traditions</p>
            </div>
            <div className="text-center">
              <Coffee className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Home-cooked Meals</h3>
              <p className="text-sm opacity-80">Enjoy traditional cuisine prepared with local ingredients</p>
            </div>
            <div className="text-center">
              <Home className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-sm opacity-80">Your stay directly benefits local families and communities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
