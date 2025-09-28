"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Star, Home, CreditCard, ShoppingCart } from "lucide-react";

export default function HandicraftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const handicrafts = [
    {
      id: 1,
      name: "Sohrai–Khovar Painting",
      location: "Hazaribagh",
      category: "painting",
      description: "Traditional wall paintings depicting nature, animals, and tribal life. These ancient art forms are practiced by women during harvest festivals.",
      image: "/images/districtgems/img1.jpg",
      price: "₹500 - ₹5,000",
      artisan: "Local Women Artists",
      rating: 4.8,
      timeToMake: "2-7 days",
      materials: "Natural pigments, mud, cow dung"
    },
    {
      id: 2,
      name: "Paitkar Painting",
      location: "East Singhbhum (Amadubi)",
      category: "painting",
      description: "Scroll paintings that narrate stories from Hindu epics and tribal folklore. Created by the Chitrakar community.",
      image: "/images/districtgems/img2.jpg",
      price: "₹800 - ₹8,000",
      artisan: "Chitrakar Community",
      rating: 4.9,
      timeToMake: "3-10 days",
      materials: "Handmade paper, natural colors"
    },
    {
      id: 3,
      name: "Dokra Metal Craft",
      location: "Khunti/Seraikela",
      category: "metalwork",
      description: "Ancient lost-wax casting technique creating beautiful brass figurines, jewelry, and decorative items.",
      image: "/images/districtgems/img3.jpg",
      price: "₹300 - ₹15,000",
      artisan: "Dokra Artisans",
      rating: 4.7,
      timeToMake: "5-15 days",
      materials: "Brass, wax, clay"
    },
    {
      id: 4,
      name: "Tasar Silk Weaving",
      location: "Godda/Dumka",
      category: "textile",
      description: "Luxurious silk fabric woven from cocoons of wild silkworms. Known for its natural golden sheen and durability.",
      image: "/images/districtgems/img4.jpg",
      price: "₹1,200 - ₹25,000",
      artisan: "Silk Weavers Cooperative",
      rating: 4.9,
      timeToMake: "7-21 days",
      materials: "Tasar silk, natural dyes"
    },
    {
      id: 5,
      name: "Bamboo Craft",
      location: "Ranchi",
      category: "bamboo",
      description: "Eco-friendly products made from locally sourced bamboo including baskets, furniture, and decorative items.",
      image: "/images/districtgems/img1.jpg",
      price: "₹150 - ₹3,000",
      artisan: "Bamboo Craft Collective",
      rating: 4.6,
      timeToMake: "1-5 days",
      materials: "Bamboo, natural varnish"
    },
    {
      id: 6,
      name: "Tribal Jewelry",
      location: "Gumla",
      category: "jewelry",
      description: "Traditional silver and brass jewelry with intricate tribal motifs, worn during festivals and ceremonies.",
      image: "/images/districtgems/img2.jpg",
      price: "₹400 - ₹12,000",
      artisan: "Tribal Silversmiths",
      rating: 4.8,
      timeToMake: "3-8 days",
      materials: "Silver, brass, beads"
    }
  ];

  const categories = [
    { id: "all", name: "All Crafts" },
    { id: "painting", name: "Paintings" },
    { id: "metalwork", name: "Metalwork" },
    { id: "textile", name: "Textiles" },
    { id: "bamboo", name: "Bamboo Craft" },
    { id: "jewelry", name: "Jewelry" }
  ];

  const filteredHandicrafts = selectedCategory === "all" 
    ? handicrafts 
    : handicrafts.filter(item => item.category === selectedCategory);

  const handleBuyNow = (item) => {
    // Extract numeric price from price range string (take lower value)
    const priceMatch = item.price.match(/₹(\d+)/);
    const priceNumeric = priceMatch ? parseInt(priceMatch[1]) : 500;

    // Store handicraft details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: item.id,
      title: item.name,
      price: priceNumeric,
      type: 'handicraft_purchase',
      location: item.location,
      artisan: item.artisan,
      materials: item.materials,
      timeToMake: item.timeToMake
    }));
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
            <h1 className="text-2xl font-bold text-gray-900">Jharkhand Handicrafts</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Traditional Handicrafts
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover the rich heritage of Jharkhand through its exquisite handmade crafts, 
            created by skilled artisans using age-old techniques passed down through generations.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Handicrafts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHandicrafts.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Production Time: {item.timeToMake}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Artisan:</span> {item.artisan}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Materials:</span> {item.materials}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">{item.price}</span>
                  <div className="flex gap-2">
                    <Link 
                      href={`/handicrafts/${item.id}`} 
                      className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/payment?package=${item.id}&amount=${item.price.match(/₹(\d+)/) ? item.price.match(/₹(\d+)/)[1] : 500}&title=${encodeURIComponent(item.name)}&type=handicraft_purchase&artisan=${encodeURIComponent(item.artisan)}&location=${encodeURIComponent(item.location)}`}
                      onClick={() => handleBuyNow(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
                    >
                      <CreditCard className="w-4 h-4" />
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Support Local Artisans</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Every purchase helps preserve traditional crafts and supports the livelihoods of skilled artisans in Jharkhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Visit Artisan Villages
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
              Contact Artisans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
