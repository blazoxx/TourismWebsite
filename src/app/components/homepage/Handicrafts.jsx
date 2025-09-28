"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Handicrafts() {
  const baseCrafts = [
    {
      state: "Jharkhand",
      title: "Dokra Art",
      img: "/images/crafts/jharkhand-dokra.jpg",
    },
    {
      state: "Jharkhand",
      title: "Sohrai Painting",
      img: "/images/crafts/jharkhand-sohrai.jpg",
    },
    {
      state: "Jharkhand",
      title: "Bamboo Crafts",
      img: "/images/crafts/jharkhand-bamboo.jpg",
    },
    {
      state: "Jharkhand",
      title: "Paitkar Painting",
      img: "/images/crafts/jharkhand-paitkar.jpg",
    },
    {
      state: "Jharkhand",
      title: "Kohvar Painting",
      img: "/images/crafts/jharkhand-kohvar.jpg",
    },
    {
      state: "Jharkhand",
      title: "Stone Carving",
      img: "/images/crafts/jharkhand-stone.jpg",
    },
    {
      state: "Jharkhand",
      title: "Jadopatia Painting",
      img: "/images/crafts/jharkhand-jadopatia.jpg",
    },
    {
      state: "Jharkhand",
      title: "Ganju Art",
      img: "/images/crafts/jharkhand-ganju.jpg",
    },
  ];

  // Duplicate the array for infinite loop effect
  const loopedCrafts = [...baseCrafts, ...baseCrafts];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionTimeoutRef = useRef(null);

  const next = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prev = () => {
    // This logic is a bit more complex for seamless reverse,
    // for now we focus on the forward loop as it's most common.
    // A simple prev for now:
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    // When we reach the start of the duplicated items...
    if (currentIndex === baseCrafts.length) {
      // ...wait for the transition to finish...
      transitionTimeoutRef.current = setTimeout(() => {
        // ...then disable transitions and jump back to the start.
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // This duration must match the CSS transition duration
    }

    // Re-enable transitions after the jump has been processed by the browser
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }

    return () => clearTimeout(transitionTimeoutRef.current);
  }, [currentIndex, baseCrafts.length]);

  return (
    <section className="relative bg-gray-50 pb-16">
      {/* Red Header Section */}
      <div className="bg-red-500 text-white pt-16 pb-32 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-wider mb-4">
            EXQUISITE CRAFTS
          </h2>
          <p className="text-xl md:text-2xl font-light opacity-90">
            — of timeless tradition —
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative -mt-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Carousel Wrapper with overflow hidden */}
          <div className="overflow-hidden relative">
            {/* Carousel Track that moves */}
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
              }}
            >
              {loopedCrafts.map((craft, idx) => (
                <div key={`${craft.title}-${idx}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 p-4">
                  <div
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative h-56">
                      <Image
                        src={craft.img}
                        alt={craft.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="text-sm font-medium text-red-500 mb-2">
                        {craft.state}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {craft.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-8 mt-12">
            <button
              onClick={prev}
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={next}
              className="text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Discover More Button */}
          <div className="text-center mt-8">
            <Link
              href="/handicrafts"
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Discover More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


