"use client";
import { useEffect, useState } from "react";
import { Card } from "@/app/components/dashboard/Cardpiechart";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis,
  BarChart, Bar, ResponsiveContainer,
} from "recharts";
import { FaUsers, FaCalendarCheck, FaGlobe, FaComments, FaSignOutAlt, FaStar } from "react-icons/fa";

// ⭐ Star Rating Renderer
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStar key={i} className="text-yellow-400 opacity-70" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }
  return <div className="flex space-x-1 mt-2">{stars}</div>;
}

export default function TourismDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // 👉 later replace this with API call
    const randomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const sampleData = {
      overallRating: 3.6, // ⭐ this can come from backend later
      stats: {
        totalSignups: randomNumber(5000, 15000),
        onlineUsers: randomNumber(100, 800),
        totalVisitors: randomNumber(20000, 80000),
        todaysBookings: randomNumber(50, 300),
      },
      reviews: {
        accommodation: [
          { name: "Positive", value: randomNumber(200, 1000) },
          { name: "Negative", value: randomNumber(50, 400) },
        ],
        activities: [
          { name: "Positive", value: randomNumber(200, 1000) },
          { name: "Negative", value: randomNumber(50, 400) },
        ],
        safety: [
          { name: "Positive", value: randomNumber(200, 1000) },
          { name: "Negative", value: randomNumber(50, 400) },
        ],
        cleanliness: [
          { name: "Positive", value: randomNumber(200, 1000) },
          { name: "Negative", value: randomNumber(50, 400) },
        ],
      },
      timeline: Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        reviews: randomNumber(100, 500),
        visitors: randomNumber(1000, 3000),
      })),
    };

    setDashboardData(sampleData);
  }, []);

  if (!dashboardData) return <p className="p-4 text-gray-500">Loading dashboard...</p>;

  const { overallRating, stats, reviews, timeline } = dashboardData;
  const COLORS = ["#38BDF8", "#F472B6"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Dashboard</h1>
          <div className="flex items-center space-x-6 text-gray-700">
            <button className="hover:text-indigo-600 transition">Overview</button>
            <button className="hover:text-indigo-600 transition">Reports</button>
            <button className="hover:text-indigo-600 transition">Settings</button>
            <button className="flex items-center text-red-500 hover:text-red-600 transition">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 space-y-12">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
          <span className="bg-gradient-to-r from-indigo-600 via-teal-400 to-pink-500 bg-clip-text text-transparent">
            Travel Feedback Insights
          </span>
        </h1>

        {/* ⭐ Overall Rating Card */}
        <div className="flex justify-center mb-10">
          <Card className="w-full md:w-1/3 bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Overall Rating</h2>
            <div className="flex items-center space-x-3">
              <p className="text-4xl font-bold">{overallRating.toFixed(1)}</p>
              <p className="text-xl opacity-90">/ 5.0</p>
            </div>
            <StarRating rating={overallRating} />
          </Card>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <FaUsers size={28} />, title: "Total Signups", value: stats.totalSignups, color: "bg-gradient-to-r from-blue-600 to-blue-500" },
            { icon: <FaComments size={28} />, title: "Online Users", value: stats.onlineUsers, color: "bg-gradient-to-r from-green-600 to-green-500" },
            { icon: <FaGlobe size={28} />, title: "Visitors", value: stats.totalVisitors, color: "bg-gradient-to-r from-purple-600 to-purple-500" },
            { icon: <FaCalendarCheck size={28} />, title: "Bookings Today", value: stats.todaysBookings, color: "bg-gradient-to-r from-pink-600 to-pink-500" },
          ].map((stat, i) => (
            <Card key={i} className={`p-4 flex items-center ${stat.color} text-white rounded-lg shadow-md hover:shadow-xl transition`}>
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Feedback Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(reviews).map(([key, reviewData], idx) => (
            <Card key={idx} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {key.charAt(0).toUpperCase() + key.slice(1)} Reviews
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={reviewData}
                    dataKey="value" nameKey="name"
                    cx="50%" cy="50%" outerRadius={80} label
                  >
                    {reviewData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          ))}
        </div>

        {/* Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Review Trends Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeline}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reviews" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitors Per Day</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeline}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" radius={[4, 4, 0, 0]} fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 shadow-inner py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Jharkhand Tourism Admin Panel</p>
          <p>Powered by Feedback Analytics System</p>
        </div>
      </footer>
    </div>
  );
}
