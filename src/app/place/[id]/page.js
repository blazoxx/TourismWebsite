"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPlaceById } from "@/app/data/places";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  Camera, 
  Calendar, 
  Thermometer,
  Car,
  Train,
  Plane,
  Phone,
  Globe,
  Heart,
  Share2,
  Navigation,
  Users,
  Award,
  Info,
  Mountain,
  TreePine,
  Waves,
  Home
} from "lucide-react";

export default function PlaceDetailsPage({ params }) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaceData = async () => {
      setLoading(true);
      const placeData = getPlaceById(parseInt(params.id));
      setPlace(placeData);
      setLoading(false);
    };

    fetchPlaceData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Place not found</h2>
          <p className="text-gray-600 mb-4">The place you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Hero Section with 3D Model */}
      <div className="relative h-96 md:h-[500px] bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={place.images[0]}
            alt={place.name}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        
        {/* Content Layout */}
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-8 w-full flex justify-between items-end">
            {/* Left Side - Place Info */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                  {place.category}
                </span>
                <div className="flex items-center text-white">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{place.rating}</span>
                  <span className="text-gray-300 ml-1">({place.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {place.name}
              </h1>
              <div className="flex items-center text-white">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{place.location}</span>
              </div>
            </div>
            
            {/* Right Side - 3D Model */}
            <div className="hidden lg:block flex-shrink-0 ml-8">
              <div className="relative w-96 h-80 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/places/baba_baidyanath.png"
                  alt="3D Model"
                  fill
                  className="object-contain drop-shadow-2xl filter"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))'
                  }}
                />
                {/* Additional shadow layers for 3D effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg transform translate-y-2 -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-lg transform translate-x-2 translate-y-4 -z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Info },
              { id: "gallery", label: "Gallery", icon: Camera },
              { id: "visit", label: "Plan Visit", icon: Calendar },
              { id: "nearby", label: "Nearby", icon: Navigation }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {place.name}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{place.description}</p>
                </div>

                {/* Highlights */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {place.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Things to Do</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {place.activities.map((activity, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3 text-center">
                        <span className="text-blue-800 font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {place.images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${place.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "visit" && (
              <div className="space-y-6">
                {/* How to Reach */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Reach</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">By Air</h4>
                      <p className="text-sm text-gray-600 mb-1">{place.howToReach.byAir.distance}</p>
                      <p className="text-sm text-gray-600">{place.howToReach.byAir.time}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Train className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">By Train</h4>
                      <p className="text-sm text-gray-600 mb-1">{place.howToReach.byTrain.distance}</p>
                      <p className="text-sm text-gray-600">{place.howToReach.byTrain.time}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Car className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">By Road</h4>
                      <p className="text-sm text-gray-600 mb-1">{place.howToReach.byRoad.distance}</p>
                      <p className="text-sm text-gray-600">{place.howToReach.byRoad.time}</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Travel Tips</h3>
                  <div className="space-y-3">
                    {place.tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-yellow-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-yellow-600 text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "nearby" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Attractions</h2>
                <div className="space-y-4">
                  {place.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                          {attraction.type === 'Waterfall' && <Waves className="w-5 h-5 text-blue-600" />}
                          {attraction.type === 'Temple' && <Mountain className="w-5 h-5 text-blue-600" />}
                          {attraction.type === 'Lake' && <Waves className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{attraction.name}</h4>
                          <p className="text-sm text-gray-600">{attraction.type}</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-medium">{attraction.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Entry Fee</span>
                  <span className="font-semibold text-gray-900">{place.entryFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Timings</span>
                  <span className="font-semibold text-gray-900">{place.timings}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Best Time</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{place.bestTimeToVisit.season}</div>
                    <div className="text-sm text-gray-600">{place.bestTimeToVisit.months}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{place.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400 mr-3" />
                  <a href={`https://${place.contact.website}`} className="text-blue-600 hover:text-blue-800">
                    {place.contact.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Facilities</h3>
              <div className="grid grid-cols-2 gap-2">
                {place.facilities.map((facility, index) => (
                  <div key={index} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2 text-center">
                    {facility}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">Plan Your Visit</h3>
              <p className="text-blue-100 mb-4 text-sm">Create a custom itinerary including this place</p>
              <Link 
                href="/plan-trip"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Create Itinerary
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
