"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Users, Calendar, Camera, Heart, Share2 } from "lucide-react";
import Navbar from "@/app/components/homepage/Navbar";
import Footer from "@/app/components/homepage/Footer";

// District data - you can move this to a separate file later
const districtData = {
  RANCHI: {
    name: "Ranchi",
    region: "Central Jharkhand",
    heroImage: "/images/districts/ranchi1.jpg",
    description: "The capital city of Jharkhand, known for its scenic beauty, waterfalls, and rich tribal culture. Ranchi is often called the 'City of Waterfalls' due to its numerous cascades.",
    population: "29,14,253",
    area: "5,097 km²",
    languages: ["Hindi", "Mundari", "Oraon"],
    bestTime: "October to March",
    attractions: [
      {
        name: "Hundru Falls",
        image: "/images/districts/ranchi1.jpg",
        description: "A spectacular 98-meter waterfall on the Subarnarekha River",
        category: "Natural"
      },
      {
        name: "Jagannath Temple",
        image: "/images/districts/ranchi2.jpg", 
        description: "Famous temple dedicated to Lord Jagannath",
        category: "Religious"
      },
      {
        name: "Rock Garden",
        image: "/images/districts/ranchi3.avif",
        description: "Beautiful garden with rock formations and sculptures",
        category: "Recreation"
      }
    ],
    festivals: ["Sarhul", "Karma", "Sohrai", "Tusu Parab"],
    cuisine: ["Litti Chokha", "Dhuska", "Arsa Roti", "Rugra"],
    howToReach: {
      air: "Birsa Munda Airport (7 km from city center)",
      rail: "Ranchi Railway Station - well connected to major cities",
      road: "NH-33 connects Ranchi to Kolkata and other major cities"
    }
  },
  DHANBAD: {
    name: "Dhanbad",
    region: "Eastern Jharkhand", 
    heroImage: "/images/districtgems/img2.jpg",
    description: "Known as the 'Coal Capital of India', Dhanbad is rich in mineral resources and industrial heritage.",
    population: "26,84,487",
    area: "2,040 km²",
    languages: ["Hindi", "Bengali", "Maithili"],
    bestTime: "November to February",
    attractions: [
      {
        name: "Maithon Dam",
        image: "/images/districtgems/img2.jpg",
        description: "Beautiful dam on Barakar River with boating facilities",
        category: "Natural"
      }
    ],
    festivals: ["Durga Puja", "Kali Puja", "Poila Boishakh"],
    cuisine: ["Fish Curry", "Rice", "Sweets"],
    howToReach: {
      air: "Nearest airport: Ranchi (160 km)",
      rail: "Dhanbad Railway Station - major junction",
      road: "Well connected by NH-2 and state highways"
    }
  }
};

export default function DistrictPage() {
  const params = useParams();
  const router = useRouter();
  const [district, setDistrict] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (params.name) {
      const districtName = params.name.toUpperCase();
      const districtInfo = districtData[districtName];
      if (districtInfo) {
        setDistrict(districtInfo);
      }
    }
  }, [params.name]);

  if (!district) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">District Not Found</h1>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden mt-20">
        <Image
          src={district.heroImage}
          alt={district.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center max-w-4xl px-6">
            <p className="text-lg mb-2 opacity-90">{district.region}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{district.name}</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              {district.description}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-24 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Map</span>
        </button>

        {/* Action Buttons */}
        <div className="absolute top-24 right-6 flex gap-3">
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition">
            <Heart size={20} />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition">
            <Share2 size={20} />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition">
            <Camera size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "attractions", label: "Attractions" },
              { id: "culture", label: "Culture & Festivals" },
              { id: "travel", label: "How to Reach" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">About {district.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {district.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{district.population}</div>
                  <div className="text-sm text-gray-600">Population</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{district.area}</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-lg font-bold text-gray-900">{district.bestTime}</div>
                  <div className="text-sm text-gray-600">Best Time</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-gray-900">{district.languages.length}</div>
                  <div className="text-sm text-gray-600">Languages</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {district.languages.join(", ")}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Region:</span> {district.region}
                  </div>
                  <div>
                    <span className="font-medium">Languages:</span> {district.languages.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Best Time to Visit:</span> {district.bestTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attractions Tab */}
        {activeTab === "attractions" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Top Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {district.attractions.map((attraction, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-48">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 text-sm font-medium rounded-full">
                        {attraction.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                    <p className="text-gray-600">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Culture Tab */}
        {activeTab === "culture" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Festivals</h2>
              <div className="space-y-4">
                {district.festivals.map((festival, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{festival}</h3>
                      <p className="text-sm text-gray-600">Traditional festival celebrated with great enthusiasm</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Local Cuisine</h2>
              <div className="space-y-4">
                {district.cuisine.map((dish, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{dish}</h3>
                      <p className="text-sm text-gray-600">Traditional delicacy of the region</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Travel Tab */}
        {activeTab === "travel" && (
          <div>
            <h2 className="text-3xl font-bold mb-8">How to Reach {district.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">By Air</h3>
                <p className="text-gray-600">{district.howToReach.air}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚂</span>
                </div>
                <h3 className="text-xl font-bold mb-3">By Train</h3>
                <p className="text-gray-600">{district.howToReach.rail}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold mb-3">By Road</h3>
                <p className="text-gray-600">{district.howToReach.road}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
