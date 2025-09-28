"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  Heart,
  Share2,
  Home,
  Users,
  Calendar,
  Mountain,
  Camera,
  Leaf,
  TreePine,
  Waves
} from "lucide-react";

// Ecotourism destinations data
const ecoDestinationsData = {
  1: {
    id: 1,
    name: "Betla National Park",
    location: "Latehar",
    type: "Wildlife Sanctuary",
    description: "Home to tigers, elephants, and diverse wildlife. Experience jungle safaris and bird watching in this pristine forest ecosystem that spans over 979 square kilometers.",
    images: ["/images/districtgems/img1.jpg", "/images/districtgems/img2.jpg", "/images/districtgems/img3.jpg"],
    activities: ["Wildlife Safari", "Bird Watching", "Nature Photography", "Trekking", "Elephant Rides", "Forest Walks"],
    bestTime: "October to March",
    duration: "2-3 days",
    difficulty: "Easy to Moderate",
    highlights: ["Tiger sightings", "Elephant herds", "300+ bird species", "Sal forests", "Tribal villages"],
    rating: 4.6,
    reviewCount: 234,
    entryFee: "₹50 per person",
    timings: "6:00 AM to 6:00 PM",
    facilities: ["Safari vehicles", "Guest house", "Canteen", "Guide services", "Watchtowers"],
    howToReach: {
      byAir: "Ranchi Airport (150 km)",
      byTrain: "Daltonganj Railway Station (25 km)",
      byRoad: "Well connected by NH-75"
    },
    conservation: "Part of Project Tiger initiative, protecting endangered Bengal tigers and their habitat.",
    contact: {
      phone: "+91-6562-255123",
      email: "betla.np@jharkhand.gov.in"
    }
  },
  2: {
    id: 2,
    name: "Netarhat Hill Station",
    location: "Latehar",
    type: "Hill Station",
    description: "Known as the 'Queen of Chotanagpur', offering breathtaking sunrises, sunset points, and cool climate throughout the year with dense pine forests.",
    images: ["/images/districtgems/img2.jpg", "/images/districtgems/img1.jpg", "/images/districtgems/img4.jpg"],
    activities: ["Sunrise Viewing", "Trekking", "Photography", "Nature Walks", "Camping", "Stargazing"],
    bestTime: "October to February",
    duration: "2-4 days",
    difficulty: "Easy",
    highlights: ["Magnolia Point", "Sunset Point", "Pine forests", "Cool climate", "Tribal culture"],
    rating: 4.8,
    reviewCount: 189,
    entryFee: "No entry fee",
    timings: "24 hours (viewpoints best at sunrise/sunset)",
    facilities: ["Hotels", "Restaurants", "Trekking guides", "Camping sites"],
    howToReach: {
      byAir: "Ranchi Airport (156 km)",
      byTrain: "Daltonganj Railway Station (65 km)",
      byRoad: "Connected via Latehar-Netarhat Road"
    },
    conservation: "Efforts to preserve pine forests and prevent deforestation in the region.",
    contact: {
      phone: "+91-6564-267890",
      email: "netarhat.tourism@jharkhand.gov.in"
    }
  },
  3: {
    id: 3,
    name: "Hundru Falls",
    location: "Ranchi",
    type: "Waterfall",
    description: "Spectacular 98-meter waterfall on the Subarnarekha River, surrounded by lush green forests and rocky terrain, creating a mesmerizing natural spectacle.",
    images: ["/images/districtgems/img3.jpg", "/images/districtgems/img4.jpg", "/images/districtgems/img1.jpg"],
    activities: ["Waterfall Viewing", "Rock Climbing", "Photography", "Picnicking", "Swimming", "Nature Study"],
    bestTime: "July to February",
    duration: "1 day",
    difficulty: "Moderate",
    highlights: ["98m high waterfall", "Natural pools", "Rock formations", "Monsoon beauty", "Tribal legends"],
    rating: 4.7,
    reviewCount: 312,
    entryFee: "₹15 per person",
    timings: "6:00 AM to 6:00 PM",
    facilities: ["Parking", "Food stalls", "Changing rooms", "Safety barriers"],
    howToReach: {
      byAir: "Ranchi Airport (45 km)",
      byTrain: "Ranchi Railway Station (45 km)",
      byRoad: "Via Ranchi-Purulia Road"
    },
    conservation: "Protected area with restrictions on construction to preserve natural beauty.",
    contact: {
      phone: "+91-651-2345678",
      email: "hundru.falls@ranchi.gov.in"
    }
  },
  4: {
    id: 4,
    name: "Dalma Wildlife Sanctuary",
    location: "East Singhbhum",
    type: "Wildlife Sanctuary",
    description: "Famous for its elephant population and diverse flora. Offers excellent trekking trails and wildlife observation opportunities in the Dalma Hills.",
    images: ["/images/districtgems/img4.jpg", "/images/districtgems/img3.jpg", "/images/districtgems/img2.jpg"],
    activities: ["Elephant Watching", "Trekking", "Bird Watching", "Nature Study", "Photography", "Tribal Interaction"],
    bestTime: "November to March",
    duration: "1-2 days",
    difficulty: "Moderate",
    highlights: ["Wild elephants", "Sal forests", "Tribal villages", "Medicinal plants", "Panoramic views"],
    rating: 4.5,
    reviewCount: 167,
    entryFee: "₹25 per person",
    timings: "6:00 AM to 5:00 PM",
    facilities: ["Forest rest house", "Trekking trails", "Guide services", "Watchtowers"],
    howToReach: {
      byAir: "Ranchi Airport (140 km)",
      byTrain: "Jamshedpur Railway Station (10 km)",
      byRoad: "Via Jamshedpur-Dalma Road"
    },
    conservation: "Elephant corridor protection and habitat restoration programs.",
    contact: {
      phone: "+91-657-2234567",
      email: "dalma.sanctuary@jharkhand.gov.in"
    }
  },
  5: {
    id: 5,
    name: "Parasnath Hills",
    location: "Giridih",
    type: "Hill Station",
    description: "Highest peak in Jharkhand and sacred Jain pilgrimage site. Offers challenging treks and panoramic views from 1365 meters above sea level.",
    images: ["/images/districtgems/img1.jpg", "/images/districtgems/img2.jpg", "/images/districtgems/img3.jpg"],
    activities: ["Trekking", "Pilgrimage", "Photography", "Meditation", "Rock Climbing", "Spiritual Tours"],
    bestTime: "October to March",
    duration: "2-3 days",
    difficulty: "Challenging",
    highlights: ["Highest peak", "Jain temples", "360° views", "Sacred sites", "Ancient caves"],
    rating: 4.4,
    reviewCount: 145,
    entryFee: "₹20 per person",
    timings: "5:00 AM to 7:00 PM",
    facilities: ["Dharamshala", "Food courts", "Medical aid", "Pilgrimage guides"],
    howToReach: {
      byAir: "Ranchi Airport (175 km)",
      byTrain: "Parasnath Railway Station (8 km)",
      byRoad: "Via NH-2 from Dhanbad"
    },
    conservation: "Protected as religious site with strict environmental guidelines.",
    contact: {
      phone: "+91-6554-234567",
      email: "parasnath.tourism@giridih.gov.in"
    }
  },
  6: {
    id: 6,
    name: "Hazaribagh National Park",
    location: "Hazaribagh",
    type: "Wildlife Sanctuary",
    description: "Dense forests with tigers, leopards, and sambars. Perfect for wildlife enthusiasts and nature photographers seeking authentic jungle experiences.",
    images: ["/images/districtgems/img2.jpg", "/images/districtgems/img4.jpg", "/images/districtgems/img1.jpg"],
    activities: ["Wildlife Safari", "Photography", "Bird Watching", "Forest Walks", "Nature Study", "Camping"],
    bestTime: "November to April",
    duration: "2-3 days",
    difficulty: "Easy",
    highlights: ["Tiger reserve", "Cantt Rock", "Tribal culture", "Dense forests", "Wildlife diversity"],
    rating: 4.3,
    reviewCount: 198,
    entryFee: "₹40 per person",
    timings: "6:00 AM to 6:00 PM",
    facilities: ["Safari vehicles", "Forest lodge", "Canteen", "Nature interpretation center"],
    howToReach: {
      byAir: "Ranchi Airport (90 km)",
      byTrain: "Hazaribagh Road Railway Station (65 km)",
      byRoad: "Via NH-33 from Ranchi"
    },
    conservation: "Part of tiger conservation project with habitat restoration initiatives.",
    contact: {
      phone: "+91-6546-223344",
      email: "hazaribagh.np@jharkhand.gov.in"
    }
  }
};

function getEcoDestinationById(id) {
  return ecoDestinationsData[id] || null;
}

export default function EcotourismDetailsPage({ params }) {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDestinationData = async () => {
      setLoading(true);
      const destinationData = getEcoDestinationById(parseInt(params.id));
      setDestination(destinationData);
      setLoading(false);
    };

    fetchDestinationData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-8">The ecotourism destination you are looking for does not exist.</p>
          <Link href="/ecotourism" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Back to Ecotourism
          </Link>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'wildlife sanctuary': return <TreePine className="w-6 h-6" />;
      case 'hill station': return <Mountain className="w-6 h-6" />;
      case 'waterfall': return <Waves className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Challenging": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-600 to-green-700">
        <div className="absolute inset-0">
          <Image
            src={destination.images[0]}
            alt={destination.name}
            fill
            className="object-cover opacity-30"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                {getTypeIcon(destination.type)}
                <span className="ml-2">{destination.type}</span>
              </span>
              <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(destination.difficulty)}`}>
                {destination.difficulty}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            
            <div className="flex items-center text-white mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{destination.location}</span>
            </div>
            
            <div className="flex items-center text-white">
              <div className="flex items-center mr-6">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span className="text-lg font-medium">{destination.rating}</span>
                <span className="text-sm ml-1 opacity-90">({destination.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* 3D Nature Image */}
          <div className="hidden lg:block relative">
            <div className="relative w-80 h-80 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/places/baba_baidyanath.png"
                  alt="3D Nature Model"
                  fill
                  className="object-contain p-8 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {["overview", "gallery", "activities", "plan"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{destination.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-600" />
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <TreePine className="w-5 h-5 mr-2 text-blue-600" />
                        Conservation Efforts
                      </h3>
                      <p className="text-gray-600">{destination.conservation}</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">How to Reach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-blue-600 mb-2">✈️</div>
                        <p className="font-medium text-gray-900">By Air</p>
                        <p className="text-sm text-gray-600">{destination.howToReach.byAir}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-green-600 mb-2">🚂</div>
                        <p className="font-medium text-gray-900">By Train</p>
                        <p className="text-sm text-gray-600">{destination.howToReach.byTrain}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-orange-600 mb-2">🚗</div>
                        <p className="font-medium text-gray-900">By Road</p>
                        <p className="text-sm text-gray-600">{destination.howToReach.byRoad}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${destination.name} ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activities" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities & Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <Camera className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium text-gray-900">{activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Available Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {destination.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center text-green-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "plan" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Visit</h2>
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{destination.contact.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{destination.contact.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900 mb-2">Responsible Tourism</h3>
                    <p className="text-green-700 mb-4">
                      Help preserve this natural heritage by following eco-friendly practices and respecting local communities.
                    </p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Book Your Visit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{destination.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Best Time</p>
                    <p className="font-medium">{destination.bestTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Entry Fee</p>
                    <p className="font-medium text-green-600">{destination.entryFee}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Timings</p>
                    <p className="font-medium">{destination.timings}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors mb-3">
                  Plan Your Trip
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
