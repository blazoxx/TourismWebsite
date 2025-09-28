"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Music,
  CreditCard,
  Gift,
  Star,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';

export default function EventDetailPage({ params }) {
  const [event, setEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Sample event data - in a real app, you'd fetch this based on params.id
  const eventData = {
    id: 1,
    name: "Sarhul Festival Celebration",
    location: "Ranchi Cultural Center, Ranchi",
    category: "cultural",
    date: "March 15-17, 2024",
    time: "10:00 AM - 6:00 PM daily",
    description: "The most important festival of the tribal communities, celebrating the worship of nature and the Sal tree. This three-day celebration features traditional dances, folk music, cultural performances, and authentic tribal cuisine. Experience the rich heritage of Jharkhand's indigenous communities through this vibrant festival.",
    image: "/images/events/sarhul-festival.jpg",
    images: [
      "/images/events/sarhul-festival.jpg",
      "/images/districts/ranchi1.jpg",
      "/images/districts/ranchi2.jpg"
    ],
    duration: "3 days",
    expectedVisitors: "50,000+",
    highlights: [
      "Sal tree worship ceremony",
      "Traditional Sarhul dance performances", 
      "Folk music concerts",
      "Local cuisine stalls",
      "Tribal art and craft exhibitions",
      "Cultural workshops",
      "Photography sessions",
      "Meet and interact with tribal communities"
    ],
    ticketPrice: 0, // Free event
    organizer: "Jharkhand Tourism Board",
    contact: {
      phone: "+91 651-2490379",
      email: "info@jharkhnadtourism.gov.in",
      website: "www.jharkhandtourism.gov.in"
    },
    schedule: [
      {
        day: "Day 1 - March 15",
        events: [
          "10:00 AM - Opening ceremony and Sal tree worship",
          "12:00 PM - Traditional dance performances",
          "2:00 PM - Cultural lunch break",
          "4:00 PM - Folk music concerts",
          "6:00 PM - Community feast"
        ]
      },
      {
        day: "Day 2 - March 16", 
        events: [
          "10:00 AM - Tribal craft workshops",
          "12:00 PM - Traditional games and sports",
          "2:00 PM - Lunch and cultural exchange",
          "4:00 PM - Poetry and storytelling sessions",
          "6:00 PM - Evening cultural performances"
        ]
      },
      {
        day: "Day 3 - March 17",
        events: [
          "10:00 AM - Final worship ceremony",
          "12:00 PM - Grand cultural parade",
          "2:00 PM - Community lunch",
          "4:00 PM - Cultural competitions",
          "6:00 PM - Closing ceremony"
        ]
      }
    ],
    facilities: [
      "Free parking available",
      "Food and beverage stalls",
      "Clean restroom facilities", 
      "First aid medical support",
      "Photography allowed",
      "Wheelchair accessible",
      "Children's activity area",
      "Information desk"
    ],
    rules: [
      "Festival is open to all ages",
      "Respect local customs and traditions",
      "No alcohol or smoking on premises",
      "Flash photography during ceremonies is restricted",
      "Follow organizer instructions for safety",
      "Keep the venue clean"
    ]
  };

  useEffect(() => {
    setEvent(eventData);
  }, []);

  const handleBookTicket = () => {
    // Store event details for booking
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: event.id,
      title: event.name,
      price: event.ticketPrice * ticketQuantity,
      type: 'event_ticket',
      location: event.location,
      date: event.date,
      organizer: event.organizer,
      quantity: ticketQuantity,
      ticketPrice: event.ticketPrice
    }));
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  const totalAmount = event.ticketPrice * ticketQuantity;
  const isFreeEvent = event.ticketPrice === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/events" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </div>
              {isFreeEvent && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Free Event
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">{event.expectedVisitors} expected</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
              <div className="space-y-6">
                {event.schedule.map((day, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-lg font-semibold text-purple-600 mb-3">{day.day}</h3>
                    <div className="space-y-2">
                      {day.events.map((eventItem, eventIndex) => (
                        <div key={eventIndex} className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{eventItem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Guidelines</h2>
              <div className="space-y-3">
                {event.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              {isFreeEvent ? (
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600">FREE</div>
                  <div className="text-gray-600">No ticket required</div>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600">₹{event.ticketPrice}</div>
                  <div className="text-gray-600">per ticket</div>
                </div>
              )}

              {!isFreeEvent && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Tickets
                  </label>
                  <select
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Ticket' : 'Tickets'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!isFreeEvent && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>₹{event.ticketPrice} x {ticketQuantity} tickets</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {isFreeEvent ? (
                <Link
                  href={`/events/${event.id}/register`}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Join Free Event
                </Link>
              ) : (
                <Link
                  href={`/payment?package=${event.id}&amount=${totalAmount}&title=${encodeURIComponent(event.name)}&type=event_ticket&location=${encodeURIComponent(event.location)}&date=${encodeURIComponent(event.date)}&quantity=${ticketQuantity}`}
                  onClick={handleBookTicket}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Book {ticketQuantity} {ticketQuantity === 1 ? 'Ticket' : 'Tickets'}
                </Link>
              )}

              {/* Organizer Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Event Organizer</h3>
                <p className="text-gray-700 mb-3">{event.organizer}</p>
                
                <div className="space-y-2">
                  <a 
                    href={`tel:${event.contact.phone}`}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                  >
                    <Phone className="w-4 h-4" />
                    {event.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${event.contact.email}`}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                  >
                    <Mail className="w-4 h-4" />
                    {event.contact.email}
                  </a>
                  {event.contact.website && (
                    <a 
                      href={`https://${event.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      {event.contact.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}