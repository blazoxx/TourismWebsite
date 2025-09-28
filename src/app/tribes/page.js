"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Calendar, Heart, Music, Home, Palette, Award } from "lucide-react";

export default function TribesPage() {
  const [selectedTribe, setSelectedTribe] = useState("all");

  const tribes = [
    {
      id: 1,
      name: "Santhal",
      population: "2.8 million",
      region: "Santhal Parganas, Dumka, Godda",
      language: "Santhali",
      description: "The largest tribal community in Jharkhand, known for their rich cultural heritage, traditional dance forms like Karam and Sohrai, and agricultural practices.",
      image: "/images/districtgems/img1.jpg",
      traditions: ["Karam Festival", "Sohrai Dance", "Traditional Agriculture", "Folk Music"],
      occupation: "Agriculture, Animal Husbandry, Forest Products",
      festivals: ["Karam", "Sohrai", "Baha", "Erok"],
      artForms: ["Santhal Painting", "Traditional Songs", "Dance", "Handicrafts"],
      housing: "Traditional mud houses with thatched roofs",
      socialStructure: "Patriarchal society with village councils (Manjhi system)",
      uniqueFeatures: "Own script (Ol Chiki), Rich oral literature, Traditional healing practices"
    },
    {
      id: 2,
      name: "Munda",
      population: "1.2 million",
      region: "Ranchi, Khunti, West Singhbhum",
      language: "Mundari",
      description: "Known for their warrior traditions and the legendary freedom fighter Birsa Munda. They have a rich tradition of iron smelting and agricultural innovations.",
      image: "/images/districtgems/img2.jpg",
      traditions: ["Birsa Munda Legacy", "Iron Smelting", "Traditional Governance", "Ancestor Worship"],
      occupation: "Agriculture, Iron Work, Forest Products, Labor",
      festivals: ["Karam", "Sarhul", "Sohrai", "Jani Shikar"],
      artForms: ["Munda Folk Songs", "Traditional Dance", "Iron Crafts", "Wood Carving"],
      housing: "Rectangular houses with courtyards",
      socialStructure: "Clan-based society with traditional councils",
      uniqueFeatures: "Birsa Munda's birthplace, Traditional iron smelting, Unique calendar system"
    },
    {
      id: 3,
      name: "Oraon (Kurukh)",
      population: "1.8 million",
      region: "Ranchi, Gumla, Lohardaga, Palamu",
      language: "Kurukh",
      description: "One of the major Dravidian tribes, known for their agricultural expertise, traditional dances, and rich folklore. They have a strong tradition of community cooperation.",
      image: "/images/districtgems/img3.jpg",
      traditions: ["Sarhul Festival", "Community Farming", "Traditional Medicine", "Oral Literature"],
      occupation: "Agriculture, Tea Plantation Work, Forest Products",
      festivals: ["Sarhul", "Karam", "Jitiya", "Karma"],
      artForms: ["Jhumar Dance", "Folk Songs", "Traditional Crafts", "Storytelling"],
      housing: "Traditional houses with separate cattle sheds",
      socialStructure: "Age-grade system with village assemblies",
      uniqueFeatures: "Dravidian origin, Rich mythology, Traditional ecological knowledge"
    },
    {
      id: 4,
      name: "Ho",
      population: "700,000",
      region: "East Singhbhum, West Singhbhum",
      language: "Ho",
      description: "Known for their expertise in metallurgy and mining. They have a rich tradition of folk tales and are skilled in traditional crafts and agriculture.",
      image: "/images/districtgems/img4.jpg",
      traditions: ["Metallurgy", "Mining Expertise", "Folk Tales", "Traditional Crafts"],
      occupation: "Mining, Metallurgy, Agriculture, Industrial Labor",
      festivals: ["Mage Parab", "Karam", "Sohrai", "Baha"],
      artForms: ["Ho Folk Songs", "Traditional Dance", "Metal Crafts", "Oral Poetry"],
      housing: "Houses built on raised platforms",
      socialStructure: "Kinship-based clans with traditional headmen",
      uniqueFeatures: "Ancient mining traditions, Rich folklore, Traditional metallurgy skills"
    },
    {
      id: 5,
      name: "Kharia",
      population: "300,000",
      region: "Ranchi, Gumla, Simdega",
      language: "Kharia",
      description: "Divided into three sub-groups, known for their hunting and gathering traditions, forest knowledge, and unique cultural practices.",
      image: "/images/districtgems/img1.jpg",
      traditions: ["Hunting & Gathering", "Forest Conservation", "Traditional Medicine", "Tribal Governance"],
      occupation: "Forest Products, Agriculture, Hunting, Traditional Medicine",
      festivals: ["Karam", "Sarhul", "Jani Shikar", "Phagu"],
      artForms: ["Traditional Songs", "Dance", "Bamboo Crafts", "Herbal Medicine"],
      housing: "Simple huts made of bamboo and leaves",
      socialStructure: "Three sub-groups with distinct social practices",
      uniqueFeatures: "Deep forest knowledge, Traditional conservation practices, Unique social divisions"
    },
    {
      id: 6,
      name: "Bhumij",
      population: "180,000",
      region: "East Singhbhum, Seraikela-Kharsawan",
      language: "Bhumij",
      description: "Known for their agricultural skills and traditional land management practices. They have a rich tradition of folk music and dance.",
      image: "/images/districtgems/img2.jpg",
      traditions: ["Land Management", "Agricultural Innovation", "Folk Music", "Traditional Governance"],
      occupation: "Agriculture, Land Management, Forest Products",
      festivals: ["Karam", "Sohrai", "Baha", "Tusu"],
      artForms: ["Bhumij Folk Songs", "Traditional Dance", "Agricultural Tools", "Handicrafts"],
      housing: "Traditional houses with storage facilities",
      socialStructure: "Village-based communities with headmen",
      uniqueFeatures: "Advanced agricultural techniques, Land tenure systems, Rich musical traditions"
    }
  ];

  const categories = [
    { id: "all", name: "All Tribes" },
    { id: "major", name: "Major Tribes" },
    { id: "dravidian", name: "Dravidian Origin" },
    { id: "austroasiatic", name: "Austro-Asiatic" }
  ];

  const getFilteredTribes = () => {
    if (selectedTribe === "all") return tribes;
    if (selectedTribe === "major") return tribes.filter(t => ["Santhal", "Munda", "Oraon"].includes(t.name));
    if (selectedTribe === "dravidian") return tribes.filter(t => t.name === "Oraon (Kurukh)");
    if (selectedTribe === "austroasiatic") return tribes.filter(t => ["Santhal", "Munda", "Ho", "Kharia", "Bhumij"].includes(t.name));
    return tribes;
  };

  const filteredTribes = getFilteredTribes();

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
            <h1 className="text-2xl font-bold text-gray-900">Tribes of Jharkhand</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Indigenous Communities
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover the rich cultural heritage of Jharkhand&apos;s tribal communities, 
            their traditions, languages, and contributions to the state&apos;s diverse cultural tapestry.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span>32 Tribal Communities</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              <span>26.2% Population</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedTribe(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedTribe === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tribes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTribes.map((tribe) => (
            <div key={tribe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={tribe.image}
                      alt={tribe.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{tribe.name}</h3>
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <Users className="w-4 h-4 mr-1" />
                      {tribe.population}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tribe.region}
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">{tribe.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Major Festivals
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tribe.festivals.slice(0, 3).map((festival, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {festival}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                        <Palette className="w-4 h-4 mr-2" />
                        Art Forms
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tribe.artForms.slice(0, 3).map((art, index) => (
                          <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                            {art}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Heritage Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cultural Heritage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The tribal communities of Jharkhand have preserved their unique traditions, 
              languages, and cultural practices for thousands of years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Music & Dance</h3>
              <p className="text-gray-600">
                Rich traditions of folk music, dance forms like Karam, Sohrai, and Jhumar that celebrate nature and community life.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Architecture</h3>
              <p className="text-gray-600">
                Unique housing styles adapted to local climate and materials, reflecting deep understanding of sustainable living.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Knowledge</h3>
              <p className="text-gray-600">
                Ancient wisdom in agriculture, medicine, metallurgy, and forest conservation passed down through generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Tribal Culture</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Visit tribal villages, participate in festivals, and learn about the rich cultural heritage 
            that makes Jharkhand unique. Support community-based tourism initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Plan Cultural Tour
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
              Support Communities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
