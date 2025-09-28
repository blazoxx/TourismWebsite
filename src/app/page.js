import Chatbot from "./components/Chatbot";
import VideoSlider from "./components/homepage/VideoSlider";
import DistrictGems from "./components/homepage/District-gems";
import Footer from "./components/homepage/Footer";
import TourismLeaders from "./components/homepage/Message";
import JharkhandMap from "./components/homepage/JharkhandMap";
import Handicrafts from "./components/homepage/Handicrafts";
import Navbar from "./components/homepage/Navbar";
import PlanTripForm from "./components/homepage/PlanTripForm";
import GovPartners from "./components/homepage/GovPartners";
import InstagramShowcase from "./components/homepage/InstagramShowcase";
import LiveInfoWidget from "./components/homepage/LiveInfoWidget";

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* Hero Section with Background Video/Slider */}
      <Navbar />
      <VideoSlider />
      
      {/* Floating Chatbot (stays available on every page) */}
      <Chatbot />
      
      {/* Discover Jharkhand (Top Spots & Festivals) */}
      <DistrictGems />
      
      {/* Marketplace Spotlight (Handicrafts & Homestays) */}
      <Handicrafts />
      
      {/* AI Itinerary Planner */}
      <PlanTripForm />
      
      {/* Live Info Widget (Transport + Weather) */}
      <LiveInfoWidget />
      
      {/* Tourism Leaders Message */}
      <TourismLeaders />
      
      {/* Interactive Jharkhand Map */}
      <JharkhandMap />
      
      {/* Instagram Showcase */}
      <InstagramShowcase />
      
      {/* Government Partners */}
      <GovPartners />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

