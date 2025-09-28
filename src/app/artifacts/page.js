"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users, Star, Award, Clock, Palette, Shield, Info } from "lucide-react";

export default function ArtifactsPage() {
  const artifact = {
    id: 1,
    name: "Sohrai–Khovar Painting",
    location: "Hazaribagh District",
    category: "Traditional Wall Art",
    description: "Sohrai and Khovar are ancient wall painting traditions practiced by women in Jharkhand for over 10,000 years. These paintings are created during harvest festivals and wedding ceremonies, depicting nature, animals, and tribal life with natural pigments.",
    image: "/images/districtgems/img1.jpg",
    age: "10,000+ years old tradition",
    tribe: "Kurmi, Santhal, Ghatwal, and other tribal communities",
    rating: 4.9,
    significance: "UNESCO recognized intangible cultural heritage",
    materials: "Natural pigments, mud, cow dung, rice paste, charcoal",
    discoveredBy: "Local tribal communities",
    currentStatus: "Active tradition",
    historicalContext: "These paintings represent one of the oldest continuous art traditions in the world, with roots tracing back to prehistoric cave paintings. The tradition has been passed down through generations of women who create these masterpieces on the walls of their homes during festivals.",
    culturalImportance: "The paintings serve multiple purposes - they are believed to bring prosperity, ward off evil spirits, and celebrate the connection between humans and nature. Each motif has deep symbolic meaning rooted in tribal cosmology.",
    techniques: "Artists use fingers, twigs, and cloth to create intricate patterns. The base is prepared with a mixture of mud and cow dung, then painted with natural colors derived from ochre, charcoal, and plant extracts.",
    preservation: "Efforts are being made to document and preserve this art form through museums, cultural centers, and artist training programs. Many contemporary artists are also adapting these traditional motifs for modern applications.",
    relatedArtifacts: ["Cave paintings of Isko", "Tribal pottery with similar motifs", "Traditional ceremonial masks"],
    visitingInfo: {
      bestTime: "During Sohrai festival (October-November) and Khovar season (December-January)",
      locations: ["Hazaribagh villages", "Ranchi Museum", "Local cultural centers"],
      guidedTours: "Available through Jharkhand Tourism"
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Featured Artifact</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section with Artifact Image */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2" />
                <span className="text-lg font-medium">{artifact.significance}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {artifact.name}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-6">
                {artifact.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-lg font-medium">{artifact.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span className="text-lg">{artifact.location}</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={artifact.image}
                alt={artifact.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-amber-600" />
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Age</span>
                </div>
                <p className="text-gray-900">{artifact.age}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Communities</span>
                </div>
                <p className="text-gray-900">{artifact.tribe}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Palette className="w-4 h-4 mr-2" />
                  <span className="font-medium">Materials</span>
                </div>
                <p className="text-gray-900">{artifact.materials}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-gray-900">{artifact.currentStatus}</p>
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Historical Context</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{artifact.historicalContext}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Importance</h3>
            <p className="text-gray-700 leading-relaxed">{artifact.culturalImportance}</p>
          </div>

          {/* Techniques & Preservation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Techniques & Preservation</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Traditional Techniques</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{artifact.techniques}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Preservation Efforts</h3>
            <p className="text-gray-700 leading-relaxed">{artifact.preservation}</p>
          </div>
        </div>

        {/* Visiting Information */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visiting Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-amber-600" />
                Best Time to Visit
              </h3>
              <p className="text-gray-700">{artifact.visitingInfo.bestTime}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                Locations
              </h3>
              <ul className="text-gray-700 space-y-1">
                {artifact.visitingInfo.locations.map((location, index) => (
                  <li key={index}>• {location}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-amber-600" />
                Guided Tours
              </h3>
              <p className="text-gray-700">{artifact.visitingInfo.guidedTours}</p>
            </div>
          </div>
        </div>

        {/* Related Artifacts */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artifact.relatedArtifacts.map((related, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={`/images/districtgems/img${(index % 4) + 1}.jpg`}
                    alt={related}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-800 font-medium">{related}</p>
                  <p className="text-sm text-gray-600 mt-2">Click to explore this artifact</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience This Living Heritage</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Witness the {artifact.name} tradition firsthand and support the artisans who keep this ancient art form alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors">
              Plan Your Visit
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
              Support Artists
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
