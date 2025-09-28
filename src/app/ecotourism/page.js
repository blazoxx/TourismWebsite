"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Users, Leaf, Camera, Mountain, Home } from "lucide-react";

export default function EcotourismPage() {
  const [selectedType, setSelectedType] = useState("all");
  const router = useRouter();

  const ecoDestinations = [
    {
      id: 1,
      name: "Betla National Park",
      location: "Latehar",
      type: "wildlife",
      description: "Home to tigers, elephants, and diverse wildlife. Experience jungle safaris and bird watching in this pristine forest ecosystem.",
      image: "/images/districtgems/img1.jpg",
      activities: ["Wildlife Safari", "Bird Watching", "Nature Photography", "Trekking"],
      bestTime: "October to March",
      duration: "2-3 days",
      difficulty: "Easy to Moderate",
      highlights: ["Tiger sightings", "Elephant herds", "300+ bird species"]
    },
    {
      id: 2,
      name: "Netarhat Hill Station",
      location: "Latehar",
      type: "hills",
      description: "Known as the 'Queen of Chotanagpur', offering breathtaking sunrises, sunset points, and cool climate throughout the year.",
      image: "/images/districtgems/img2.jpg",
      activities: ["Sunrise Viewing", "Trekking", "Photography", "Nature Walks"],
      bestTime: "October to February",
      duration: "2-4 days",
      difficulty: "Easy",
      highlights: ["Magnolia Point", "Sunset Point", "Pine forests"]
    },
    {
      id: 3,
      name: "Hundru Falls",
      location: "Ranchi",
      type: "waterfalls",
      description: "Spectacular 98-meter waterfall on the Subarnarekha River, surrounded by lush green forests and rocky terrain.",
      image: "/images/districtgems/img3.jpg",
      activities: ["Waterfall Viewing", "Rock Climbing", "Photography", "Picnicking"],
      bestTime: "July to February",
      duration: "1 day",
      difficulty: "Moderate",
      highlights: ["98m high waterfall", "Natural pools", "Rock formations"]
    },
    {
      id: 4,
      name: "Dalma Wildlife Sanctuary",
      location: "East Singhbhum",
      type: "wildlife",
      description: "Famous for its elephant population and diverse flora. Offers excellent trekking trails and wildlife observation opportunities.",
      image: "/images/districtgems/img4.jpg",
      activities: ["Elephant Watching", "Trekking", "Bird Watching", "Nature Study"],
      bestTime: "November to March",
      duration: "1-2 days",
      difficulty: "Moderate",
      highlights: ["Wild elephants", "Sal forests", "Tribal villages"]
    },
    {
      id: 5,
      name: "Parasnath Hills",
      location: "Giridih",
      type: "hills",
      description: "Highest peak in Jharkhand and sacred Jain pilgrimage site. Offers challenging treks and panoramic views.",
      image: "/images/districtgems/img1.jpg",
      activities: ["Trekking", "Pilgrimage", "Photography", "Meditation"],
      bestTime: "October to March",
      duration: "2-3 days",
      difficulty: "Challenging",
      highlights: ["Highest peak", "Jain temples", "360° views"]
    },
    {
      id: 6,
      name: "Hazaribagh National Park",
      location: "Hazaribagh",
      type: "wildlife",
      description: "Dense forests with tigers, leopards, and sambars. Perfect for wildlife enthusiasts and nature photographers.",
      image: "/images/districtgems/img2.jpg",
      activities: ["Wildlife Safari", "Photography", "Bird Watching", "Forest Walks"],
      bestTime: "November to April",
      duration: "2-3 days",
      difficulty: "Easy",
      highlights: ["Tiger reserve", "Cantt Rock", "Tribal culture"]
    }
  ];

  const types = [
    { id: "all", name: "All Destinations", icon: Leaf },
    { id: "wildlife", name: "Wildlife", icon: Camera },
    { id: "hills", name: "Hills & Mountains", icon: Mountain },
    { id: "waterfalls", name: "Waterfalls", icon: Users }
  ];

  const filteredDestinations = selectedType === "all" 
    ? ecoDestinations 
    : ecoDestinations.filter(dest => dest.type === selectedType);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Moderate": return "text-yellow-600 bg-yellow-100";
      case "Challenging": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <h1 className="text-2xl font-bold text-gray-900">Ecotourism</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Ecotourism in Jharkhand
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Explore pristine forests, majestic waterfalls, and diverse wildlife while contributing to 
            conservation efforts and supporting local communities.
          </p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {types.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {type.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(destination.difficulty)}`}>
                    {destination.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {destination.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Best Time:</span> {destination.bestTime}
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Activities:</span>
                    <div className="flex flex-wrap gap-1">
                      {destination.activities.slice(0, 3).map((activity, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {activity}
                        </span>
                      ))}
                      {destination.activities.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{destination.activities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Highlights:</span>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <Leaf className="w-3 h-3 mr-2 text-green-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link href={`/ecotourism/${destination.id}`} className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center">
                  Plan Your Visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conservation Message */}
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Responsible Ecotourism</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Help us preserve Jharkhand&apos;s natural heritage for future generations. 
            Follow eco-friendly practices and support local conservation efforts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Leave No Trace</h3>
              <p className="text-sm opacity-80">Respect wildlife and natural habitats</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Support Locals</h3>
              <p className="text-sm opacity-80">Choose local guides and services</p>
            </div>
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-lg font-semibold mb-2">Capture Memories</h3>
              <p className="text-sm opacity-80">Take only photos, leave only footprints</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
