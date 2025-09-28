"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, FileText, MapPin, Car, Heart } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function PlanTripForm() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transportIndex, setTransportIndex] = useState(0);
  const [isTransportAnimating, setIsTransportAnimating] = useState(false);

  const scrollLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev === 0 ? itineraries.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const scrollRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % itineraries.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const scrollTransportLeft = () => {
    if (isTransportAnimating) return;
    setIsTransportAnimating(true);
    setTransportIndex(prev => prev === 0 ? transportOptions.length - 1 : prev - 1);
    setTimeout(() => setIsTransportAnimating(false), 500);
  };

  const scrollTransportRight = () => {
    if (isTransportAnimating) return;
    setIsTransportAnimating(true);
    setTransportIndex(prev => (prev + 1) % transportOptions.length);
    setTimeout(() => setIsTransportAnimating(false), 500);
  };

  const transportOptions = [
    {
      id: 1,
      type: "By Air",
      icon: "✈",
      status: "Available",
      title: "Ranchi Airport (IXR)",
      description: "Direct flights from Delhi, Mumbai, Kolkata",
      duration: "2-3 hours from major cities"
    },
    {
      id: 2,
      type: "By Train",
      icon: "🚂",
      status: "Available",
      title: "Ranchi Railway Station",
      description: "Well connected to all major cities",
      duration: "8-12 hours from Delhi/Mumbai"
    },
    {
      id: 3,
      type: "By Road",
      icon: "🚗",
      status: "Available",
      title: "NH-33, NH-23",
      description: "Good connectivity via highways",
      duration: "6-8 hours from Kolkata"
    },
    {
      id: 4,
      type: "By Bus",
      icon: "🚌",
      status: "Available",
      title: "State Transport",
      description: "Regular bus services from neighboring states",
      duration: "10-14 hours from major cities"
    },
    {
      id: 5,
      type: "By Taxi",
      icon: "🚕",
      status: "Available",
      title: "Cab Services",
      description: "Private taxi and cab bookings",
      duration: "Door-to-door service available"
    }
  ];

  const itineraries = [
    {
      id: 1,
      title: "Explore Jharkhand's stunning waterfalls",
      subtitle: "Hundru, Dassam, and Jonha Falls with nature walks",
      image: "/images/districtgems/img1.jpg",
      description: "Discover cascading waterfalls, pristine pools, and scenic hiking trails around Ranchi. Perfect for nature lovers and photography enthusiasts."
    },
    {
      id: 2,
      title: "Experience authentic tribal culture",
      subtitle: "Village visits, folk dances, and traditional crafts",
      image: "/images/districtgems/img2.jpg",
      description: "Immerse yourself in the rich heritage of Jharkhand's tribal communities through authentic cultural experiences and handicraft workshops."
    },
    {
      id: 3,
      title: "Spiritual journey through ancient temples",
      subtitle: "Baidyanath, Parasnath, and sacred pilgrimage sites",
      image: "/images/districtgems/img3.jpg",
      description: "Visit sacred temples, ancient archaeological sites, and spiritual destinations that showcase Jharkhand's religious heritage."
    },
    {
      id: 4,
      title: "Wildlife safari and nature exploration",
      subtitle: "Betla National Park and forest reserves",
      image: "/images/districtgems/img4.jpg",
      description: "Encounter diverse wildlife, explore dense forests, and experience the natural beauty of Jharkhand's protected areas."
    },
    {
      id: 5,
      title: "Adventure sports and hill stations",
      subtitle: "Paragliding, trekking, and scenic hill retreats",
      image: "/images/districtgems/img1.jpg",
      description: "Thrilling adventure activities combined with peaceful hill station retreats for the perfect blend of excitement and relaxation."
    }
  ];

  return (
    <div className="bg-white pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Content */}
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Top things to do in Jharkhand
            </h1>
            
            <div className="space-y-4">
              <Link 
                href="/itineraries"
                className="inline-flex items-center text-xl font-medium text-blue-600 hover:text-blue-700 group transition-colors"
              >
                See all our itineraries 
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="pt-2">
                <Link 
                  href="/plan-trip"
                  className="text-xl font-normal text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Or make one yourself
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - True Infinite Carousel */}
          <div className="relative overflow-hidden">
            {/* Left Navigation Button - Only show after scrolling right */}
            {currentIndex > 0 && (
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200 hover:border-gray-300"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}

            {/* Right Navigation Button */}
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200 hover:border-gray-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            <div className="mx-12">
              <div 
                className="flex gap-6 pb-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 344}px)`,
                  width: `${itineraries.length * 344}px`
                }}
              >
                {itineraries.map((itinerary, index) => (
                  <div key={itinerary.id} className="flex-none w-80 min-w-80">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={itinerary.image}
                          alt={itinerary.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {itinerary.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {itinerary.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600 font-medium">
                            {itinerary.subtitle}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
