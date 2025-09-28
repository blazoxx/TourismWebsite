"use client";
import TourPackageCard from '../components/booking/TourPackageCard';
import HomestayCard from '../components/booking/HomestayCard';
import EventBookingCard from '../components/booking/EventBookingCard';
import HandicraftCard from '../components/booking/HandicraftCard';

export default function BookingsDemo() {
  // Sample data for demonstration
  const sampleTourPackage = {
    id: 1,
    title: "Jharkhand Heritage Tour",
    description: "Explore the rich cultural heritage of Jharkhand with visits to ancient temples, waterfalls, and tribal villages.",
    price: 2500,
    duration: "3 days, 2 nights",
    groupSize: "2-8 people",
    rating: 4.8,
    reviews: 156,
    image: "/images/places/baba_baidyanath.png",
    highlights: ["Baba Baidyanath Temple", "Betla National Park", "Tribal Culture Experience"]
  };

  const sampleHomestay = {
    id: 1,
    name: "Traditional Jharkhand Homestay",
    location: "Ranchi, Jharkhand",
    pricePerNight: 1200,
    rating: 4.5,
    reviews: 89,
    image: "/images/districts/ranchi1.jpg",
    amenities: ["WiFi", "Parking", "Traditional Food", "Air Conditioning"],
    hostName: "Rajesh Kumar",
    roomType: "Private Room"
  };

  const sampleEvent = {
    id: 1,
    title: "Sarhul Festival Celebration",
    description: "Experience the traditional Sarhul festival with tribal dance, music, and cultural rituals.",
    date: "2024-04-15",
    time: "10:00 AM - 6:00 PM",
    location: "Ranchi Cultural Center",
    ticketPrice: 500,
    capacity: 200,
    availableTickets: 45,
    image: "/images/events/sarhul-festival.jpg",
    organizer: "Jharkhand Cultural Society"
  };

  const sampleHandicraft = {
    id: 1,
    name: "Traditional Dokra Art Figurine",
    description: "Handcrafted bronze figurine made using the ancient Dokra technique by tribal artisans.",
    price: 850,
    originalPrice: 1200,
    rating: 4.7,
    reviews: 34,
    image: "/images/districtgems/img1.jpg",
    artisan: "Ravi Mahato",
    village: "Chaibasa, West Singhbhum",
    inStock: true,
    stockCount: 12,
    shippingInfo: "Free shipping within Jharkhand"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Booking Components Demo</h1>
          <p className="text-gray-600 mt-2">
            Click any "Book Now", "Book Stay", "Book Ticket", or "Buy Now" button to go to the payment page
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tour Packages Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏛️ Tour Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TourPackageCard packageData={sampleTourPackage} />
            <TourPackageCard packageData={{
              ...sampleTourPackage,
              id: 2,
              title: "Waterfalls of Jharkhand",
              price: 1800,
              description: "Visit the most beautiful waterfalls in Jharkhand including Hundru Falls and Jonha Falls."
            }} />
          </div>
        </section>

        {/* Homestays Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏠 Homestays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HomestayCard homestayData={sampleHomestay} />
            <HomestayCard homestayData={{
              ...sampleHomestay,
              id: 2,
              name: "Tribal Village Experience",
              location: "Gumla, Jharkhand",
              pricePerNight: 900,
              hostName: "Suman Oraon"
            }} />
          </div>
        </section>

        {/* Events Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎭 Events & Festivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventBookingCard eventData={sampleEvent} />
            <EventBookingCard eventData={{
              ...sampleEvent,
              id: 2,
              title: "Karma Festival Celebration",
              ticketPrice: 300,
              availableTickets: 5,
              capacity: 150
            }} />
          </div>
        </section>

        {/* Handicrafts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Handicrafts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HandicraftCard handicraftData={sampleHandicraft} />
            <HandicraftCard handicraftData={{
              ...sampleHandicraft,
              id: 2,
              name: "Tribal Basket Collection",
              price: 450,
              originalPrice: 650,
              stockCount: 3,
              artisan: "Maya Devi"
            }} />
          </div>
        </section>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How the Payment Integration Works:</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Each booking card has contextual payment buttons (Book Now, Book Stay, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Clicking these buttons navigates to the payment page with pre-filled booking details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>The payment page shows a booking summary with item details and pricing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Users can pay via credit card or blockchain (MetaMask) with full security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}