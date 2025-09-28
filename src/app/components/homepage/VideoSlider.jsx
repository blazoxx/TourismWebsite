"use client";
import { useRef, useState, useMemo, useEffect } from "react";

export default function VideoSlider() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  const categories = useMemo(
    () => ["Jharkhand 360", "Adventure", "Nature", "Wildlife", "Heritage", "Spiritual"],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

const categoryToVideo = useMemo(
  () => ({
    "Jharkhand 360": "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
    Adventure: "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
    Nature: "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
    Wildlife: "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
    Heritage: "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
    Spiritual: "https://drive.google.com/uc?export=download&id=1uAYo0bZ6K471icEnnHQH9kgCbda8XzPr",
  }),
  []
);


  const currentVideoSrc = categoryToVideo[categories[activeIndex]];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);

      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  // Measure fixed navbar height to fit hero to viewport
  useEffect(() => {
    const measure = () => {
      const utility = document.querySelector('[data-nav-utility]');
      const mainbar = document.querySelector('[data-nav-main]');
      const h = (utility?.offsetHeight || 0) + (mainbar?.offsetHeight || 0);
      setNavHeight(h);
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, []);

  // Auto-advance categories every 6 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 6000);
    return () => clearInterval(id);
  }, [categories.length]);

  const heroStyle = { minHeight: `100vh`, paddingTop: navHeight };

  return (
    <div className="relative w-full font-sans overflow-hidden" style={heroStyle}>
      {/* Video Background */}
<video
  ref={videoRef}
  key={currentVideoSrc}
  src={currentVideoSrc}
  type="video/mp4"
  autoPlay
  loop
  muted={isMuted}
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
/>



      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4 pt-6 md:pt-10">
        <p className="uppercase tracking-wider font-medium mb-2" style={{color: 'var(--color-accent)'}}>
          Step into the allure of Jharkhand
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold italic drop-shadow-lg">
          Incredible Wonders
        </h1>
        <p className="mt-3 max-w-2xl text-white/90">
          Discover waterfalls, sacred forests, living heritage, and raw adventure across the heart of India.
        </p>
      </div>

      {/* Categories */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 text-sm text-white font-medium">
        {categories.map((item, i) => (
          <button
            key={item}
            onClick={() => setActiveIndex(i)}
            className={`relative transition-colors ${
              i === activeIndex ? "" : "hover:text-white/80"
            }`}
            style={i === activeIndex ? { color: 'var(--color-accent)' } : {}}
          >
            {item}
            {i < categories.length - 1 && (
              <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-px h-4 bg-white/50" />
            )}
          </button>
        ))}
      </div>

      {/* Prev / Next Controls */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-4 text-white">
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length)
          }
          className="p-2 bg-black/40 rounded-full"
        >
          ←
        </button>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % categories.length)}
          className="p-2 bg-black/40 rounded-full"
        >
          →
        </button>
      </div>

      {/* Mute / Unmute Floating Button */}
      <div className="absolute bottom-24 right-6 z-30">
        <button
          id="unmuteBtn"
          onClick={toggleMute}
          className={`w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-lg transition-transform duration-300 ${
            animate ? "scale-110" : "scale-100"
          }`}
          style={{backgroundColor: 'var(--color-secondary)'}}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}
