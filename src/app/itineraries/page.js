"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, Clock, Heart, ArrowLeft, Compass, Award } from "lucide-react";

export default function ItinerariesPage() {
  const featuredItineraries = [
    {
      id: 1,
      title: "Waterfalls & Nature Trail",
      duration: "3 Days",
      difficulty: "Easy",
      rating: 4.8,
      price: "₹12,999",
      image: "/images/districtgems/img1.jpg",
      description: "Explore Jharkhand's stunning waterfalls including Hundru, Dassam, and Jonha Falls with guided nature walks.",
      highlights: ["Hundru Falls", "Dassam Falls", "Jonha Falls", "Nature Photography"],
      category: "Nature & Adventure",
      groupSize: "2-8 people"
    },
    {
      id: 2,
      title: "Cultural Heritage Experience",
      duration: "4 Days",
      difficulty: "Moderate",
      rating: 4.6,
      price: "₹18,999",
      image: "/images/districtgems/img2.jpg",
      description: "Immerse yourself in tribal culture, traditional crafts, and authentic village experiences.",
      highlights: ["Tribal Villages", "Folk Dances", "Handicraft Workshops", "Local Cuisine"],
      category: "Culture & Heritage",
      groupSize: "4-12 people"
    },
    {
      id: 3,
      title: "Spiritual Journey",
      duration: "5 Days",
      difficulty: "Easy",
      rating: 4.7,
      price: "₹22,999",
      image: "/images/districtgems/img3.jpg",
      description: "Discover Jharkhand's spiritual heritage visiting ancient temples, archaeological sites, and pilgrimage destinations.",
      highlights: ["Baidyanath Temple", "Parasnath Hill", "Rajrappa Temple", "Archaeological Sites"],
      category: "Spiritual & Wellness",
      groupSize: "1-15 people"
    },
    {
      id: 4,
      title: "Wildlife Safari Adventure",
      duration: "3 Days",
      difficulty: "Moderate",
      rating: 4.9,
      price: "₹16,999",
      image: "/images/districtgems/img4.jpg",
      description: "Experience thrilling wildlife encounters at Betla National Park and Hazaribagh Wildlife Sanctuary.",
      highlights: ["Betla National Park", "Tiger Safari", "Bird Watching", "Forest Lodge Stay"],
      category: "Wildlife & Safari",
      groupSize: "2-6 people"
    },
    {
      id: 5,
      title: "Adventure Sports Expedition",
      duration: "4 Days",
      difficulty: "Challenging",
      rating: 4.5,
      price: "₹24,999",
      image: "/images/districtgems/img1.jpg",
      description: "Adrenaline-packed adventure with rock climbing, paragliding, and trekking in Jharkhand's hills.",
      highlights: ["Paragliding", "Rock Climbing", "Trekking", "Camping"],
      category: "Adventure Sports",
      groupSize: "4-10 people"
    },
    {
      id: 6,
      title: "Luxury Heritage Tour",
      duration: "6 Days",
      difficulty: "Easy",
      rating: 4.8,
      price: "₹45,999",
      image: "/images/districtgems/img2.jpg",
      description: "Premium experience with luxury accommodations, private guides, and exclusive cultural performances.",
      highlights: ["Luxury Hotels", "Private Guide", "Cultural Shows", "Fine Dining"],
      category: "Luxury & Premium",
      groupSize: "2-4 people"
    }
  ];

  const categories = [
    { name: "All", count: 6, active: true },
    { name: "Nature & Adventure", count: 2, active: false },
    { name: "Culture & Heritage", count: 2, active: false },
    { name: "Spiritual & Wellness", count: 1, active: false },
    { name: "Wildlife & Safari", count: 1, active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Featured Itineraries</h1>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Destinations</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section - Modern Glass Morphism */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
              <Award className="w-4 h-4 mr-2" />
              Curated Experiences
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Discover
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Jharkhand
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Handcrafted itineraries that unveil the hidden gems, rich culture, and breathtaking landscapes of India&apos;s tribal heartland
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Destinations</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-gray-900">4.8★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Happy Travelers</div>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors font-medium"
            >
              {category.name}
              <span className="ml-2 text-xs text-gray-500">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Itineraries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredItineraries.map((itinerary) => (
            <div 
              key={itinerary.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={itinerary.image}
                  alt={itinerary.title}
                  fill
                  className="object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    {itinerary.category}
                  </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {itinerary.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {itinerary.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {itinerary.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {itinerary.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {itinerary.groupSize}
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      itinerary.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      itinerary.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {itinerary.difficulty}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {itinerary.highlights.slice(0, 3).map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                    >
                      {highlight}
                    </span>
                  ))}
                  {itinerary.highlights.length > 3 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                      +{itinerary.highlights.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                  <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:text-blue-600">
            Load More Itineraries
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Can&apos;t find the perfect itinerary? Let our AI create a custom journey tailored just for you.
          </p>
          <Link 
            href="/plan-trip"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create Custom Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}
