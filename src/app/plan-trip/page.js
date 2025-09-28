"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ItineraryCard from "@/app/components/core/ItineraryCard";

export default function PlanTripPage() {
  const [days, setDays] = useState(4);
  const [city, setCity] = useState("Ranchi");
  const [interests, setInterests] = useState("waterfalls, nature, culture");
  const [budget, setBudget] = useState("Mid");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setItinerary(null);

    const request = {
      tripLength: days,
      startingCity: city,
      interests: interests.split(",").map((i) => i.trim()),
      budget,
    };

    try {
      // Sample mocked response
      const data = {
        itinerary: [
          {
            day: 1,
            title: "Sailani Island & Backwaters",
            description:
              "Arrive in Indore, transfer to Sailani Island. Enjoy boating, scenic views, and water sports.",
            image: "/images/districts/ranchi1.jpg",
            travelInfo: [
              { type: "flight", detail: "Indore Airport (78 km)" },
              { type: "train", detail: "Omkareshwar Station (70 km)" },
              { type: "car", detail: "Taxis from Indore available" },
            ],
            activities: ["Boat ride", "Sunset point", "Photography"],
            food: ["Try local poha & jalebi breakfast", "Fish curry at lakeside dhaba"],
            accommodation: ["Lakeview Resort", "Budget guesthouse near backwaters"],
            bestTime: "Morning till evening",
            tips: ["Carry swimwear", "Book resort in advance"],
          },
          {
            day: 2,
            title: "Cultural Day in Maheshwar",
            description:
              "Explore Maheshwar's temples, ghats, and local handloom sarees. Attend evening aarti at the river.",
            image: "/images/districts/ranchi1.jpg",
            travelInfo: [
              { type: "flight", detail: "Indore Airport (91 km)" },
              { type: "train", detail: "Khandwa Station (110 km)" },
            ],
            activities: ["Temple visit", "Shopping for Maheshwari sarees", "Attend evening aarti"],
            food: ["Local thali at Mandu Bhojanalaya", "Street snacks near ghats"],
            accommodation: ["Ahilya Fort Heritage Hotel", "Mid-range homestay"],
            bestTime: "Full day",
            tips: ["Wear modest clothing for temples", "Keep cash for local shops"],
          },
        ],
      };

      setItinerary(data.itinerary);
    } catch (err) {
      setError("Failed to fetch itinerary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Plan Your Trip</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Planning a trip to Jharkhand?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Fill a few details and the assistant will generate a multilingual, customizable itinerary.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Trip length: {days} days</label>
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Starting city</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Ranchi">Ranchi</option>
                <option value="Jamshedpur">Jamshedpur</option>
                <option value="Dhanbad">Dhanbad</option>
                <option value="Bokaro">Bokaro</option>
              </select>
            </div>

            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Interests</label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., waterfalls, nature, culture, temples"
                className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-3 text-lg font-medium text-gray-900">Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Budget (₹1,000-3,000/day)</option>
                <option value="Mid">Mid-range (₹3,000-7,000/day)</option>
                <option value="High">Luxury (₹7,000+/day)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 transition-colors"
            >
              {loading ? "Planning your adventure..." : "Create My Itinerary"}
            </button>
          </form>

          <p className="text-sm mt-6 text-gray-600">
            💡 Tip: You can change language from the top navbar. The assistant replies in your selected language.
          </p>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>

        {/* Itinerary Results */}
        {itinerary && (
          <div className="space-y-8">
            <div className="text-center bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Itinerary</h3>
              <p className="text-gray-600">Here&apos;s your custom {days}-day adventure in Jharkhand</p>
            </div>
            {itinerary.map((item) => (
              <ItineraryCard key={item.day} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
