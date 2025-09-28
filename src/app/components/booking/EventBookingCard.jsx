"use client";
import Link from 'next/link';
import { CreditCard, Calendar, MapPin, Users, Clock } from 'lucide-react';

export default function EventBookingCard({ 
  eventData = {
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
  }
}) {
  
  const handleBookTicket = () => {
    // Store event details for payment
    localStorage.setItem('bookingPackage', JSON.stringify({
      id: eventData.id,
      title: eventData.title,
      price: eventData.ticketPrice,
      type: 'event_ticket',
      date: eventData.date,
      location: eventData.location,
      organizer: eventData.organizer
    }));
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const isAlmostSoldOut = eventData.availableTickets < 20;
  const isSoldOut = eventData.availableTickets === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src={eventData.image} 
          alt={eventData.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-event.jpg';
          }}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="text-lg font-bold text-blue-600">₹{eventData.ticketPrice}</span>
        </div>
        {isAlmostSoldOut && !isSoldOut && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Almost Sold Out!
          </div>
        )}
        {isSoldOut && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sold Out
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{eventData.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{eventData.description}</p>

        {/* Event Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar size={16} className="text-blue-500" />
            <span>{formatDate(eventData.date)}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock size={16} className="text-blue-500" />
            <span>{eventData.time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-blue-500" />
            <span>{eventData.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Users size={16} className="text-blue-500" />
            <span>{eventData.availableTickets} of {eventData.capacity} tickets available</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Organized by <span className="font-medium text-gray-900">{eventData.organizer}</span>
          </p>
        </div>

        {/* Progress Bar for Ticket Availability */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tickets Available</span>
            <span>{eventData.availableTickets} left</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isSoldOut ? 'bg-red-500' : 
                isAlmostSoldOut ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${(eventData.availableTickets / eventData.capacity) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/events/${eventData.id}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 text-center"
          >
            Event Details
          </Link>
          {isSoldOut ? (
            <button
              disabled
              className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center gap-2"
            >
              Sold Out
            </button>
          ) : (
            <Link
              href={`/payment?package=${eventData.id}&amount=${eventData.ticketPrice}&title=${encodeURIComponent(eventData.title)}&type=event_ticket&date=${eventData.date}&location=${encodeURIComponent(eventData.location)}`}
              onClick={handleBookTicket}
              className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 text-white ${
                isAlmostSoldOut ? 'bg-orange-600 hover:bg-orange-700' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              <CreditCard size={16} />
              Book Ticket
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}