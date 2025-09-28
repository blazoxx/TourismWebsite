"use client";
import { useState, useEffect, useRef } from "react";
import { MapPin, Plane, Train, Car, Cloud, Sun, CloudRain, Navigation } from "lucide-react";

export default function LiveInfoWidget() {
  const [activeTab, setActiveTab] = useState("transport");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTourismPlace, setSelectedTourismPlace] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);


  // Data for dropdowns
  const jharkhandData = {
    "Ranchi": {
      cities: ["Ranchi City", "Bundu", "Tamar", "Sonahatu", "Angara"]
    },
    "Dhanbad": {
      cities: ["Dhanbad City", "Jharia", "Sindri", "Nirsa", "Govindpur"]
    },
    "Jamshedpur": {
      cities: ["Jamshedpur City", "Mango", "Jugsalai", "Bistupur", "Kadma"]
    },
    "Bokaro": {
      cities: ["Bokaro Steel City", "Chas", "Bermo", "Jaridih"]
    },
    "Deoghar": {
      cities: ["Deoghar City", "Madhupur", "Sarwan", "Mohanpur"]
    },
    "Hazaribagh": {
      cities: ["Hazaribagh City", "Chouparan", "Barhi", "Ichak"]
    }
  };

  const tourismPlaces = [
    "Hundru Falls", "Dassam Falls", "Jonha Falls", "Netarhat Hills", "Betla National Park",
    "Maithon Dam", "Panchet Dam", "Dimna Lake", "Dalma Wildlife Sanctuary", "Parasnath Hills",
    "Rock Garden", "Jagannath Temple", "Birsa Zoological Park", "Jubilee Park", "Tata Steel Zoological Park",
    "Baidyanath Temple", "Trikut Hills", "Massanjore Dam", "Koderma", "Rajrappa Temple"
  ];

  // Location-specific transport and weather data
  const getLocationData = (location) => {
    const locationMap = {
      // Districts
      "Ranchi": { airport: "Ranchi Airport (IXR)", railway: "Ranchi Railway Station", highways: "NH-33, NH-23" },
      "Dhanbad": { airport: "Nearest: Ranchi Airport (120km)", railway: "Dhanbad Railway Station", highways: "NH-2, NH-32" },
      "Jamshedpur": { airport: "Nearest: Ranchi Airport (140km)", railway: "Tatanagar Railway Station", highways: "NH-33, NH-18" },
      "Bokaro": { airport: "Nearest: Ranchi Airport (110km)", railway: "Bokaro Steel City Station", highways: "NH-23, NH-32" },
      "Deoghar": { airport: "Nearest: Ranchi Airport (250km)", railway: "Jasidih Railway Station", highways: "NH-114A" },
      "Hazaribagh": { airport: "Nearest: Ranchi Airport (90km)", railway: "Hazaribagh Road Station", highways: "NH-33" },
      
      // Cities inherit from their districts
      "Ranchi City": { airport: "Ranchi Airport (IXR)", railway: "Ranchi Railway Station", highways: "NH-33, NH-23" },
      "Dhanbad City": { airport: "Nearest: Ranchi Airport (120km)", railway: "Dhanbad Railway Station", highways: "NH-2, NH-32" },
      "Jamshedpur City": { airport: "Nearest: Ranchi Airport (140km)", railway: "Tatanagar Railway Station", highways: "NH-33, NH-18" },
      
      // Tourism places
      "Hundru Falls": { airport: "Ranchi Airport (35km)", railway: "Ranchi Railway Station", highways: "Via NH-33" },
      "Dassam Falls": { airport: "Ranchi Airport (40km)", railway: "Ranchi Railway Station", highways: "Via NH-33" },
      "Betla National Park": { airport: "Ranchi Airport (170km)", railway: "Daltonganj Station", highways: "Via NH-75" },
      "Maithon Dam": { airport: "Nearest: Ranchi Airport (120km)", railway: "Dhanbad Railway Station", highways: "Via NH-2" },
      "Baidyanath Temple": { airport: "Nearest: Ranchi Airport (250km)", railway: "Jasidih Railway Station", highways: "Via NH-114A" }
    };
    
    return locationMap[location] || { airport: "Ranchi Airport (IXR)", railway: "Ranchi Railway Station", highways: "NH-33, NH-23" };
  };

  // Get current selected location for display
  const currentLocation = selectedTourismPlace || selectedCity || selectedDistrict || "Ranchi";
  const locationData = getLocationData(currentLocation);

  // Dynamic transport options based on selected location
  const getTransportOptions = () => {
    return [
      {
        type: "flight",
        icon: Plane,
        title: "By Air",
        info: locationData.airport,
        details: currentLocation === "Ranchi" || currentLocation === "Ranchi City" ? 
          "Direct flights from Delhi, Mumbai, Kolkata" : 
          "Connect via major cities",
        time: currentLocation === "Ranchi" || currentLocation === "Ranchi City" ? 
          "2-3 hours from major cities" : 
          "3-5 hours including connections",
        status: "Available"
      },
      {
        type: "train",
        icon: Train,
        title: "By Train",
        info: locationData.railway,
        details: "Well connected to all major cities",
        time: currentLocation.includes("Ranchi") ? 
          "8-12 hours from Delhi/Mumbai" : 
          "6-14 hours from major cities",
        status: "Available"
      },
      {
        type: "road",
        icon: Car,
        title: "By Road",
        info: locationData.highways,
        details: "Good connectivity via highways",
        time: currentLocation.includes("Ranchi") ? 
          "6-8 hours from Kolkata" : 
          "4-10 hours depending on location",
        status: "Available"
      }
    ];
  };

  const weatherData = {
    location: currentLocation,
    temperature: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
    forecast: [
      { day: "Today", temp: "24°C", condition: "Partly Cloudy", icon: Cloud },
      { day: "Tomorrow", temp: "26°C", condition: "Sunny", icon: Sun },
      { day: "Day 3", temp: "22°C", condition: "Light Rain", icon: CloudRain }
    ]
  };

  // Custom Dropdown for Tourism Places
  function TourismDropdown({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    return (
      <div className="relative w-full max-w-xs mx-auto">
        <button
          ref={buttonRef}
          type="button"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left"
          onClick={() => setOpen((o) => !o)}
        >
          {value || "Select Tourism Place"}
        </button>
        {open && (
          <div
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-56 overflow-y-auto"
          >
            <div
              className="cursor-pointer px-3 py-2 hover:bg-gray-100"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Select Tourism Place
            </div>
            {options.map((place) => (
              <div
                key={place}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${value === place ? "bg-blue-50" : ""}`}
                onClick={() => {
                  onChange(place);
                  setOpen(false);
                }}
              >
                {place}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            How to get here right now?
          </h2>
          <p className="text-gray-600">Live transport and weather information</p>
        </div>

        {/* Dropdown Selection Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Your Destination</h3>
          
          {/* Custom grid for OR separator */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - District and City Section */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center mb-4 justify-center">
                  <h4 className="text-md font-medium text-gray-800 text-center">Option 1: Select by District & City</h4>
                  {(selectedDistrict || selectedCity) && (
                    <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Active</span>
                  )}
                </div>
                <div className="space-y-4 w-full max-w-xs mx-auto">
                  {/* District Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">District</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedCity(""); // Reset city when district changes
                        setSelectedTourismPlace(""); // Clear tourism place when district is selected
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select District</option>
                      {Object.keys(jharkhandData).map((district) => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                        setSelectedTourismPlace(""); // Clear tourism place when city is selected
                      }}
                      disabled={!selectedDistrict}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {selectedDistrict && jharkhandData[selectedDistrict].cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* OR Vertical Separator for large screens */}
            <div className="hidden lg:flex flex-col items-center justify-center relative">
              <div className="h-32 w-px bg-gray-300"></div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-500 text-sm font-medium z-10">
                OR
              </span>
            </div>

            {/* Mobile Horizontal Separator */}
            <div className="lg:hidden flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Right Side - Tourism Places Section */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center mb-4 justify-center">
                  <h4 className="text-md font-medium text-gray-800 text-center">Option 2: Select by Tourism Place</h4>
                  {selectedTourismPlace && (
                    <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  )}
                </div>
                <div className="space-y-4 w-full max-w-xs mx-auto">
                  {/* Tourism Places Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Tourism Places</label>
                    <TourismDropdown
                      value={selectedTourismPlace}
                      onChange={(val) => {
                        setSelectedTourismPlace(val);
                        if (val) {
                          setSelectedDistrict("");
                          setSelectedCity("");
                        }
                      }}
                      options={tourismPlaces}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("transport")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === "transport"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Navigation className="w-5 h-5 mx-auto mb-1" />
              Transport
            </button>
            <button
              onClick={() => setActiveTab("weather")}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === "weather"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Cloud className="w-5 h-5 mx-auto mb-1" />
              Weather
            </button>
          </div>

          {/* Transport Tab Content */}
          {activeTab === "transport" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {getTransportOptions().map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <div key={option.type} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{option.title}</h3>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-green-600">{option.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">{option.info}</p>
                          <p className="text-sm text-gray-600">{option.details}</p>
                          <p className="text-sm text-blue-600 font-medium">{option.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Current Travel Advisory</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Road Conditions:</span>
                      <span className="text-green-600 ml-2">Good</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Flight Status:</span>
                      <span className="text-green-600 ml-2">On Time</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Train Services:</span>
                      <span className="text-green-600 ml-2">Normal</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Last Updated:</span>
                      <span className="text-gray-600 ml-2">{currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Tab */}
            {activeTab === "weather" && (
              <div className="space-y-6">
                {/* Current Weather */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Current Weather</h3>
                        <p className="text-blue-100">{weatherData.location}</p>
                      </div>
                      <Cloud className="w-12 h-12 text-blue-200" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{weatherData.temperature}</div>
                    <p className="text-blue-100 mb-4">{weatherData.condition}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-200">Humidity</span>
                        <div className="font-medium">{weatherData.humidity}</div>
                      </div>
                      <div>
                        <span className="text-blue-200">Wind Speed</span>
                        <div className="font-medium">{weatherData.windSpeed}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">3-Day Forecast</h3>
                    <div className="space-y-3">
                      {weatherData.forecast.map((day, index) => {
                        const IconComponent = day.icon;
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                              <span className="font-medium text-gray-900">{day.day}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{day.temp}</div>
                              <div className="text-sm text-gray-600">{day.condition}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Travel Recommendations */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Travel Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Perfect weather for outdoor activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Great visibility for sightseeing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Carry light jacket for evenings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Ideal for trekking and photography</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
