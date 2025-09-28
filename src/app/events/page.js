"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Clock, Users, Music, Star, CreditCard, Gift } from "lucide-react";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const events = [
    {
      id: 1,
      name: "Sarhul Festival",
      location: "Ranchi",
      category: "cultural",
      date: "March 15-17, 2024",
      month: "march",
      description: "The most important festival of the tribal communities, celebrating the worship of nature and the Sal tree. Features traditional dances, music, and rituals.",
      image: "/images/districtgems/img1.jpg",
      duration: "3 days",
      expectedVisitors: "50,000+",
      highlights: ["Sal tree worship", "Traditional dances", "Folk music", "Local cuisine"],
      ticketPrice: "Free",
      organizer: "Jharkhand Tourism Board"
    },
    {
      id: 2,
      name: "Karma Festival",
      location: "Jamshedpur",
      category: "cultural",
      date: "August 20-22, 2024",
      month: "august",
      description: "Harvest festival celebrated with great enthusiasm. Known for the Karma dance performed around the Karma tree.",
      image: "/images/districtgems/img2.jpg",
      duration: "3 days",
      expectedVisitors: "30,000+",
      highlights: ["Karma dance", "Harvest celebration", "Community feasts", "Traditional songs"],
      ticketPrice: "Free",
      organizer: "Local Communities"
    },
    {
      id: 3,
      name: "Jharkhand International Film Festival",
      location: "Ranchi",
      category: "cultural",
      date: "November 10-15, 2024",
      month: "november",
      description: "Showcasing regional cinema, documentaries, and short films from Jharkhand and neighboring states.",
      image: "/images/districtgems/img3.jpg",
      duration: "6 days",
      expectedVisitors: "15,000+",
      highlights: ["Film screenings", "Director interactions", "Awards ceremony", "Cultural programs"],
      ticketPrice: "₹100 - ₹500",
      organizer: "Jharkhand Film Society"
    },
    {
      id: 4,
      name: "Tusu Parab",
      location: "Dhanbad",
      category: "cultural",
      date: "January 14-15, 2024",
      month: "january",
      description: "Winter harvest festival celebrated with colorful processions, folk songs, and traditional dances.",
      image: "/images/districtgems/img4.jpg",
      duration: "2 days",
      expectedVisitors: "25,000+",
      highlights: ["Tusu processions", "Folk performances", "Traditional crafts", "Local delicacies"],
      ticketPrice: "Free",
      organizer: "Cultural Associations"
    },
    {
      id: 5,
      name: "Jharkhand Adventure Sports Meet",
      location: "Netarhat",
      category: "sports",
      date: "December 5-8, 2024",
      month: "december",
      description: "Annual adventure sports competition featuring trekking, rock climbing, paragliding, and mountain biking.",
      image: "/images/districtgems/img1.jpg",
      duration: "4 days",
      expectedVisitors: "5,000+",
      highlights: ["Adventure competitions", "Training workshops", "Equipment exhibitions", "Nature camps"],
      ticketPrice: "₹200 - ₹1,000",
      organizer: "Jharkhand Adventure Club"
    },
    {
      id: 6,
      name: "Tribal Art & Craft Fair",
      location: "Hazaribagh",
      category: "cultural",
      date: "February 20-25, 2024",
      month: "february",
      description: "Exhibition and sale of authentic tribal handicrafts, paintings, and traditional artifacts.",
      image: "/images/districtgems/img2.jpg",
      duration: "6 days",
      expectedVisitors: "20,000+",
      highlights: ["Handicraft exhibitions", "Live demonstrations", "Artist interactions", "Cultural performances"],
      ticketPrice: "₹50",
      organizer: "Tribal Welfare Department"
    }
  ];

  const categories = [
    { id: "all", name: "All Events" },
    { id: "cultural", name: "Cultural" },
    { id: "sports", name: "Sports & Adventure" },
    { id: "religious", name: "Religious" },
    { id: "food", name: "Food & Cuisine" }
  ];

  const months = [
    { id: "all", name: "All Months" },
    { id: "january", name: "January" },
    { id: "february", name: "February" },
    { id: "march", name: "March" },
    { id: "august", name: "August" },
    { id: "november", name: "November" },
    { id: "december", name: "December" }
  ];

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
    const monthMatch = selectedMonth === "all" || event.month === selectedMonth;
    return categoryMatch && monthMatch;
  });

  const handleBookEvent = (event) => {
    // Extract numeric price from ticket price string
    let priceNumeric = 0;
    if (event.ticketPrice !== "Free") {
      const priceMatch = event.ticketPrice.match(/₹(\d+)/);
      priceNumeric = priceMatch ? parseInt(priceMatch[1]) : 0;
    }

    // Store event details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: event.id,
      title: event.name,
      price: priceNumeric,
      type: 'event_ticket',
      location: event.location,
      date: event.date,
      organizer: event.organizer,
      duration: event.duration
    }));
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString.split(',')[0] + ", 2024");
    const today = new Date();
    
    if (eventDate > today) {
      return { status: "Upcoming", color: "bg-green-100 text-green-800" };
    } else if (eventDate.toDateString() === today.toDateString()) {
      return { status: "Today", color: "bg-blue-100 text-blue-800" };
    } else {
      return { status: "Past", color: "bg-gray-100 text-gray-800" };
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
            <h1 className="text-2xl font-bold text-gray-900">Events & Festivals</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Events & Festivals
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Experience the vibrant culture of Jharkhand through colorful festivals, 
            traditional celebrations, and exciting events throughout the year.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Month Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Month</h3>
            <div className="flex flex-wrap gap-4">
              {months.map((month) => (
                <button
                  key={month.id}
                  onClick={() => setSelectedMonth(month.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedMonth === month.id
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {month.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const eventStatus = getEventStatus(event.date);
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventStatus.color}`}>
                      {eventStatus.status}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium text-gray-800">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {event.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Expected: {event.expectedVisitors}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Organizer:</span> {event.organizer}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Highlights:</span>
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                      {event.highlights.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{event.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{event.ticketPrice}</span>
                    <div className="flex gap-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        Learn More
                      </Link>
                      {event.ticketPrice === "Free" ? (
                        <Link
                          href={`/events/${event.id}`}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                        >
                          <Gift className="w-4 h-4" />
                          Join Free
                        </Link>
                      ) : (
                        <Link
                          href={`/payment?package=${event.id}&amount=${event.ticketPrice.match(/₹(\d+)/) ? event.ticketPrice.match(/₹(\d+)/)[1] : 0}&title=${encodeURIComponent(event.name)}&type=event_ticket&location=${encodeURIComponent(event.location)}&date=${encodeURIComponent(event.date)}`}
                          onClick={() => handleBookEvent(event)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1"
                        >
                          <CreditCard className="w-4 h-4" />
                          Book Ticket
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Music className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more events.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Celebration</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Immerse yourself in Jharkhand&apos;s rich cultural heritage. 
            Plan your visit around these amazing festivals and events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Plan Your Visit
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-900 transition-colors">
              Event Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
