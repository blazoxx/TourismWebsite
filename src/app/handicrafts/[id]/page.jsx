"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  Phone,
  Mail,
  CheckCircle,
  Heart,
  Share2
} from 'lucide-react';

export default function HandicraftDetailPage({ params }) {
  const [handicraft, setHandicraft] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample handicraft data - in a real app, you'd fetch this based on params.id
  const handicraftData = {
    id: 1,
    name: "Traditional Sohrai-Khovar Painting",
    location: "Hazaribagh, Jharkhand",
    category: "painting",
    description: "Authentic Sohrai-Khovar wall painting created by local women artists using traditional techniques passed down through generations. These beautiful artworks depict nature, animals, and tribal life, representing the rich cultural heritage of Jharkhand's indigenous communities.",
    image: "/images/districtgems/img1.jpg",
    images: [
      "/images/districtgems/img1.jpg",
      "/images/districtgems/img2.jpg",
      "/images/districtgems/img3.jpg"
    ],
    price: 2500,
    originalPrice: 3500,
    rating: 4.8,
    reviews: 34,
    artisan: "Local Women Artists Collective",
    village: "Hazaribagh District",
    inStock: true,
    stockCount: 8,
    materials: "Natural pigments, mud, cow dung, traditional brushes",
    dimensions: "24 x 36 inches",
    weight: "1.2 kg",
    productionTime: "5-7 days",
    shippingInfo: "Free shipping within Jharkhand. ₹200 for other states.",
    features: [
      "100% handmade using traditional techniques",
      "Natural pigments and eco-friendly materials",
      "Unique design - no two pieces are identical",
      "Certificate of authenticity included",
      "Supports local artisan community",
      "Ready to hang with mounting hardware"
    ],
    artisanStory: "Created by the women artisans of Hazaribagh who have been practicing this ancient art form for generations. Sohrai and Khovar are traditional wall painting styles that celebrate harvest festivals and depict the harmony between humans and nature.",
    careInstructions: [
      "Keep away from direct sunlight",
      "Dust gently with a soft, dry cloth",
      "Do not use water or chemical cleaners",
      "Store in a dry place",
      "Handle with care during transport"
    ],
    shippingDetails: {
      processingTime: "2-3 business days",
      domesticShipping: "5-7 business days",
      internationalShipping: "10-15 business days",
      packaging: "Secure bubble wrap and cardboard protection"
    },
    returnPolicy: "30-day return policy. Item must be in original condition.",
    contact: {
      phone: "+91 9876543210",
      email: "handicrafts@jharkhnadtourism.gov.in"
    }
  };

  useEffect(() => {
    setHandicraft(handicraftData);
  }, []);

  const handlePurchase = () => {
    const totalAmount = handicraft.price * quantity;
    
    // Store handicraft details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: handicraft.id,
      title: handicraft.name,
      price: totalAmount,
      type: 'handicraft_purchase',
      location: handicraft.location,
      artisan: handicraft.artisan,
      quantity: quantity,
      unitPrice: handicraft.price
    }));
  };

  if (!handicraft) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  const totalAmount = handicraft.price * quantity;
  const discountPercentage = Math.round(((handicraft.originalPrice - handicraft.price) / handicraft.originalPrice) * 100);
  const isLowStock = handicraft.stockCount < 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/handicrafts" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Handicrafts
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-red-600">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-xl overflow-hidden bg-white">
                <Image
                  src={handicraft.image}
                  alt={handicraft.name}
                  fill
                  className="object-cover"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </div>
                )}
                {isLowStock && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Only {handicraft.stockCount} left!
                  </div>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {handicraft.images?.slice(1, 4).map((img, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={img}
                      alt={`${handicraft.name} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'gallery', name: 'Gallery' },
                    { id: 'artisan', name: 'Artisan' },
                    { id: 'purchase', name: 'Purchase' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{handicraft.name}</h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-medium">{handicraft.rating}</span>
                          <span className="text-gray-600">({handicraft.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{handicraft.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{handicraft.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dimensions:</span>
                            <span className="font-medium">{handicraft.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight:</span>
                            <span className="font-medium">{handicraft.weight}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Production Time:</span>
                            <span className="font-medium">{handicraft.productionTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Materials:</span>
                            <span className="font-medium">{handicraft.materials}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                        <div className="space-y-2">
                          {handicraft.features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Care Instructions</h3>
                      <div className="space-y-2">
                        {handicraft.careInstructions.map((instruction, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {handicraft.images.map((img, index) => (
                      <div key={index} className="relative h-64 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={img}
                          alt={`${handicraft.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Artisan Tab */}
                {activeTab === 'artisan' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet the Artisan</h2>
                      <div className="flex items-center gap-4 mb-4">
                        <Package className="w-8 h-8 text-red-500" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{handicraft.artisan}</h3>
                          <p className="text-gray-600">{handicraft.village}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{handicraft.artisanStory}</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="font-semibold text-red-900 mb-2">Support Local Artisans</h3>
                      <p className="text-red-800">
                        Every purchase directly supports the artisan community and helps preserve traditional crafts. 
                        Your purchase makes a difference in sustaining these beautiful art forms for future generations.
                      </p>
                    </div>
                  </div>
                )}

                {/* Purchase Tab */}
                {activeTab === 'purchase' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Purchase Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Availability</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price Range:</span>
                            <span className="font-semibold text-red-600">₹{handicraft.price} - ₹{handicraft.originalPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Availability:</span>
                            <span className="font-medium text-green-600">Available year-round</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Customization:</span>
                            <span className="font-medium">Custom designs available on request</span>
                          </div>
                        </div>

                        <div className="bg-red-50 rounded-lg p-4 mt-6">
                          <h4 className="font-semibold text-red-900 mb-2">Support Local Artisans</h4>
                          <p className="text-red-800 text-sm">
                            Every purchase directly supports the artisan community and helps preserve traditional crafts.
                          </p>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mt-3 text-sm">
                            Contact Artisan
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600">₹</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Price Range</div>
                              <div className="text-red-600 font-semibold">₹{handicraft.price} - ₹{handicraft.originalPrice}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Clock className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Production Time</div>
                              <div className="text-gray-600">{handicraft.productionTime}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Artisan</div>
                              <div className="text-gray-600">{handicraft.artisan}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Materials</div>
                              <div className="text-gray-600">{handicraft.materials}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                            Contact Artisan
                          </button>
                          <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            Request Custom Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-red-600">₹{handicraft.price}</span>
                  {handicraft.originalPrice > handicraft.price && (
                    <span className="text-lg text-gray-500 line-through">₹{handicraft.originalPrice}</span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <div className="text-green-600 font-medium">Save ₹{handicraft.originalPrice - handicraft.price} ({discountPercentage}% off)</div>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {handicraft.inStock ? (
                  <div className={`flex items-center gap-2 text-sm ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                    <div className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                    <span>{isLowStock ? `Only ${handicraft.stockCount} in stock` : 'In Stock'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  disabled={!handicraft.inStock}
                >
                  {Array.from({ length: Math.min(handicraft.stockCount, 10) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total */}
              {quantity > 1 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total ({quantity} items):</span>
                    <span className="text-xl font-bold text-red-600">₹{totalAmount}</span>
                  </div>
                </div>
              )}

              {/* Purchase Buttons */}
              <div className="space-y-3 mb-6">
                {handicraft.inStock ? (
                  <>
                    <Link
                      href={`/payment?package=${handicraft.id}&amount=${totalAmount}&title=${encodeURIComponent(handicraft.name)}&type=handicraft_purchase&artisan=${encodeURIComponent(handicraft.artisan)}&location=${encodeURIComponent(handicraft.location)}&quantity=${quantity}`}
                      onClick={handlePurchase}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Buy Now - ₹{totalAmount}
                    </Link>
                    <button className="w-full border border-red-600 text-red-600 py-3 px-4 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>{handicraft.shippingInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Processing: {handicraft.shippingDetails.processingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Delivery: {handicraft.shippingDetails.domesticShipping}</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <a 
                    href={`tel:${handicraft.contact.phone}`}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <Phone className="w-4 h-4" />
                    {handicraft.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${handicraft.contact.email}`}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}