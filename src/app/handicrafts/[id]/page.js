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
  User,
  Package,
  IndianRupee,
  Calendar,
  Award,
  Palette,
  Hammer,
  Scissors,
  Gem
} from "lucide-react";

// Handicrafts data (this should ideally be in a separate data file)
const handicraftsData = {
  1: {
    id: 1,
    name: "Sohrai–Khovar Painting",
    location: "Hazaribagh",
    category: "Painting",
    description: "Traditional wall paintings depicting nature, animals, and tribal life. These ancient art forms are practiced by women during harvest festivals and are recognized as a significant cultural heritage of Jharkhand.",
    images: ["/images/districtgems/img1.jpg", "/images/districtgems/img2.jpg", "/images/districtgems/img3.jpg"],
    price: "₹500 - ₹5,000",
    artisan: "Local Women Artists",
    rating: 4.8,
    reviewCount: 156,
    timeToMake: "2-7 days",
    materials: "Natural pigments, mud, cow dung",
    history: "Sohrai and Khovar are traditional mural art forms practiced by women in rural Jharkhand for over 10,000 years. These paintings are created during harvest festivals and are believed to bring prosperity and ward off evil spirits.",
    technique: "The paintings are created using natural materials like mud, charcoal, and ochre. Women use their fingers, twigs, and cloth to create intricate patterns on freshly plastered walls.",
    significance: "These art forms represent the deep connection between tribal communities and nature, featuring motifs of animals, trees, and geometric patterns that hold spiritual significance.",
    availability: "Available year-round",
    customization: "Custom designs available on request",
    contact: {
      phone: "+91-9876543210",
      email: "sohrai.artists@gmail.com"
    }
  },
  2: {
    id: 2,
    name: "Paitkar Painting",
    location: "East Singhbhum (Amadubi)",
    category: "Painting",
    description: "Scroll paintings that narrate stories from Hindu epics and tribal folklore. Created by the Chitrakar community using traditional techniques passed down through generations.",
    images: ["/images/districtgems/img2.jpg", "/images/districtgems/img1.jpg", "/images/districtgems/img4.jpg"],
    price: "₹800 - ₹8,000",
    artisan: "Chitrakar Community",
    rating: 4.9,
    reviewCount: 203,
    timeToMake: "3-10 days",
    materials: "Handmade paper, natural colors",
    history: "Paitkar paintings originated in the Santhal Pargana region and are created by the Chitrakar community. These scroll paintings serve as visual narratives of mythological stories and tribal legends.",
    technique: "Artists use handmade paper and natural pigments derived from minerals and plants. The paintings are created in a continuous scroll format, telling stories through sequential imagery.",
    significance: "These paintings preserve oral traditions and serve as educational tools, passing down cultural knowledge from one generation to the next.",
    availability: "Available throughout the year",
    customization: "Custom story scrolls can be commissioned",
    contact: {
      phone: "+91-9876543211",
      email: "paitkar.artists@gmail.com"
    }
  },
  3: {
    id: 3,
    name: "Dokra Metal Craft",
    location: "Khunti/Seraikela",
    category: "Metalwork",
    description: "Ancient lost-wax casting technique creating beautiful brass figurines, jewelry, and decorative items. This 4000-year-old art form produces unique pieces with intricate details.",
    images: ["/images/districtgems/img3.jpg", "/images/districtgems/img4.jpg", "/images/districtgems/img1.jpg"],
    price: "₹300 - ₹15,000",
    artisan: "Dokra Artisans",
    rating: 4.7,
    reviewCount: 189,
    timeToMake: "5-15 days",
    materials: "Brass, wax, clay",
    history: "Dokra is one of the earliest known methods of non-ferrous metal casting, dating back over 4000 years. The technique was brought to Jharkhand by migrating artisan communities.",
    technique: "The lost-wax casting process involves creating a clay core, covering it with wax, then clay again. When heated, the wax melts away, leaving a mold for molten brass.",
    significance: "Dokra artifacts often depict tribal deities, animals, and daily life scenes, serving both decorative and ritualistic purposes in tribal communities.",
    availability: "Available year-round",
    customization: "Custom designs and sizes available",
    contact: {
      phone: "+91-9876543212",
      email: "dokra.artisans@gmail.com"
    }
  },
  4: {
    id: 4,
    name: "Tasar Silk Weaving",
    location: "Godda/Dumka",
    category: "Textile",
    description: "Luxurious silk fabric woven from cocoons of wild silkworms. Known for its natural golden sheen, durability, and eco-friendly production process.",
    images: ["/images/districtgems/img4.jpg", "/images/districtgems/img3.jpg", "/images/districtgems/img2.jpg"],
    price: "₹1,200 - ₹25,000",
    artisan: "Silk Weavers Cooperative",
    rating: 4.9,
    reviewCount: 267,
    timeToMake: "7-21 days",
    materials: "Tasar silk, natural dyes",
    history: "Tasar silk production in Jharkhand dates back centuries. The state is one of the largest producers of Tasar silk in India, with tribal communities traditionally involved in sericulture.",
    technique: "Wild silkworms are reared on Arjun and Sal trees. The cocoons are collected, processed, and spun into silk threads, which are then woven into fabric using traditional handlooms.",
    significance: "Tasar silk represents sustainable fashion and provides livelihood to thousands of tribal families. The fabric is prized for its natural texture and eco-friendly properties.",
    availability: "Seasonal availability based on cocoon harvest",
    customization: "Custom weaving patterns and colors available",
    contact: {
      phone: "+91-9876543213",
      email: "tasar.weavers@gmail.com"
    }
  },
  5: {
    id: 5,
    name: "Bamboo Craft",
    location: "Ranchi",
    category: "Bamboo Craft",
    description: "Eco-friendly products made from locally sourced bamboo including baskets, furniture, decorative items, and utility products that promote sustainable living.",
    images: ["/images/districtgems/img1.jpg", "/images/districtgems/img3.jpg", "/images/districtgems/img4.jpg"],
    price: "₹150 - ₹3,000",
    artisan: "Bamboo Craft Collective",
    rating: 4.6,
    reviewCount: 134,
    timeToMake: "1-5 days",
    materials: "Bamboo, natural varnish",
    history: "Bamboo crafting is an ancient skill in Jharkhand's tribal communities. The abundance of bamboo forests has made it a traditional material for creating household items and tools.",
    technique: "Artisans use traditional tools to split, shape, and weave bamboo into various products. The bamboo is treated naturally to increase durability and prevent pest damage.",
    significance: "Bamboo crafts represent sustainable living and environmental consciousness. They provide an alternative to plastic products while supporting forest conservation.",
    availability: "Available throughout the year",
    customization: "Custom sizes and designs available",
    contact: {
      phone: "+91-9876543214",
      email: "bamboo.collective@gmail.com"
    }
  },
  6: {
    id: 6,
    name: "Tribal Jewelry",
    location: "Gumla",
    category: "Jewelry",
    description: "Traditional silver and brass jewelry with intricate tribal motifs, worn during festivals and ceremonies. Each piece tells a story of tribal heritage and craftsmanship.",
    images: ["/images/districtgems/img2.jpg", "/images/districtgems/img4.jpg", "/images/districtgems/img1.jpg"],
    price: "₹400 - ₹12,000",
    artisan: "Tribal Silversmiths",
    rating: 4.8,
    reviewCount: 178,
    timeToMake: "3-8 days",
    materials: "Silver, brass, beads",
    history: "Tribal jewelry making in Jharkhand has been practiced for generations. Each tribe has its distinct style and motifs that reflect their cultural identity and beliefs.",
    technique: "Artisans use traditional tools to hammer, engrave, and shape metals. Intricate patterns are created using age-old techniques passed down through families.",
    significance: "Tribal jewelry serves both ornamental and spiritual purposes. Different pieces are worn during specific ceremonies and are believed to provide protection and bring good fortune.",
    availability: "Available year-round",
    customization: "Custom designs based on tribal motifs available",
    contact: {
      phone: "+91-9876543215",
      email: "tribal.jewelry@gmail.com"
    }
  }
};

function getHandicraftById(id) {
  return handicraftsData[id] || null;
}

export default function HandicraftDetailsPage({ params }) {
  const [handicraft, setHandicraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHandicraftData = async () => {
      setLoading(true);
      const handicraftData = getHandicraftById(parseInt(params.id));
      setHandicraft(handicraftData);
      setLoading(false);
    };

    fetchHandicraftData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading handicraft details...</p>
        </div>
      </div>
    );
  }

  if (!handicraft) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Handicraft Not Found</h1>
          <p className="text-gray-600 mb-8">The handicraft you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/handicrafts" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Back to Handicrafts
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'painting': return <Palette className="w-6 h-6" />;
      case 'metalwork': return <Hammer className="w-6 h-6" />;
      case 'textile': return <Scissors className="w-6 h-6" />;
      case 'jewelry': return <Gem className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
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
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-red-700">
        <div className="absolute inset-0">
          <Image
            src={handicraft.images[0]}
            alt={handicraft.name}
            fill
            className="object-cover opacity-30"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                {getCategoryIcon(handicraft.category)}
                <span className="ml-2">{handicraft.category}</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {handicraft.name}
            </h1>
            
            <div className="flex items-center text-white mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{handicraft.location}</span>
            </div>
            
            <div className="flex items-center text-white">
              <div className="flex items-center mr-6">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span className="text-lg font-medium">{handicraft.rating}</span>
                <span className="text-sm ml-1 opacity-90">({handicraft.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* 3D Craft Image */}
          <div className="hidden lg:block relative">
            <div className="relative w-80 h-80 transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl transform translate-x-4 translate-y-4"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/places/baba_baidyanath.png"
                  alt="3D Handicraft Model"
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
            {["overview", "gallery", "artisan", "purchase"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-red-500 text-red-600"
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {handicraft.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{handicraft.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Historical Background</h3>
                      <p className="text-gray-600">{handicraft.history}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Cultural Significance</h3>
                      <p className="text-gray-600">{handicraft.significance}</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Crafting Technique</h3>
                    <p className="text-gray-600">{handicraft.technique}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {handicraft.images.map((image, index) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${handicraft.name} ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "artisan" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet the Artisans</h2>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <User className="w-8 h-8 text-red-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{handicraft.artisan}</h3>
                      <p className="text-gray-600">{handicraft.location}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Materials Used</h4>
                      <p className="text-gray-600">{handicraft.materials}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Production Time</h4>
                      <p className="text-gray-600">{handicraft.timeToMake}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                      <p className="text-gray-600">Phone: {handicraft.contact.phone}</p>
                      <p className="text-gray-600">Email: {handicraft.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "purchase" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Information</h2>
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Pricing & Availability</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price Range:</span>
                        <span className="font-medium text-red-600">{handicraft.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Availability:</span>
                        <span className="font-medium">{handicraft.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customization:</span>
                        <span className="font-medium">{handicraft.customization}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-semibold text-red-900 mb-2">Support Local Artisans</h3>
                    <p className="text-red-700 mb-4">
                      Every purchase directly supports the artisan community and helps preserve traditional crafts.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                      Contact Artisan
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
                  <IndianRupee className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-medium text-red-600">{handicraft.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Production Time</p>
                    <p className="font-medium">{handicraft.timeToMake}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Artisan</p>
                    <p className="font-medium">{handicraft.artisan}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Package className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Materials</p>
                    <p className="font-medium">{handicraft.materials}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors mb-3">
                  Contact Artisan
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Request Custom Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
