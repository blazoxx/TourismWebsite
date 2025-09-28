"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const DistrictGems = () => {
  const tourismData = [
    {
      name: "Dassam Falls",
      image: "/images/districtgems/img1.jpg",
      profile: "https://jharkhandtourism.gov.in/destination/dassam-falls",
    },
    {
      name: "Netarhat Hills",
      image: "/images/districtgems/img2.jpg",
      profile: "https://jharkhandtourism.gov.in/destination/netarhat",
    },
    {
      name: "Hundru Falls",
      image: "/images/districtgems/img3.jpg",
      profile: "https://jharkhandtourism.gov.in/destination/hundru-falls",
    },
    {
      name: "Betla National Park",
      image: "/images/districtgems/img4.jpg",
      profile: "https://jharkhandtourism.gov.in/destination/betla-national-park",
    },
    {
      name: "Jonha Falls",
      image: "/images/districtgems/img5.heic",
      profile: "https://jharkhandtourism.gov.in/destination/jonha-falls",
    },
    {
      name: "Jonha Falls",
      image: "/images/districtgems/img9.heic",
      profile: "https://jharkhandtourism.gov.in/destination/jonha-falls",
    },
    {
      name: "Jonha Falls",
      image: "/images/districtgems/img8.heic",
      profile: "https://jharkhandtourism.gov.in/destination/jonha-falls",
    },
    {
      name: "Jonha Falls",
      image: "/images/districtgems/img6.heic",
      profile: "https://jharkhandtourism.gov.in/destination/jonha-falls",
    },
    {
      name: "Jonha Falls",
      image: "/images/districtgems/img7.heic",
      profile: "https://jharkhandtourism.gov.in/destination/jonha-falls",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5); // default desktop

  // 🔹 Responsive handling
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3); // tablet
      } else {
        setVisibleCount(5); // desktop
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="w-[100vw] mx-auto py-10 relative">
      {/* 🔹 Background Image */}
      <Image
        src="/images/bg-nature.jpg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover -z-20 filter grayscale saturate-50"
        priority
      />

      {/* 🔹 Black Overlay */}
      <div className="absolute inset-0 bg-white/60 -z-10" />

      {/* Heading */}
      <h2 className="text-2xl text-black sm:text-3xl font-bold text-center mb-10">
        Discover Jharkhand’s Untold Wonders
      </h2>

      {/* Carousel */}
      <div className="relative flex justify-center items-center perspective-[2000px] h-[480px] overflow-visible">
        {tourismData.map((place, index) => {
          const position =
            (index - activeIndex + tourismData.length) % tourismData.length;

          let style = {};
          const gap = visibleCount === 1 ? 0 : 240; // spacing
          const scale = visibleCount === 1 ? 1 : 0.9;

          if (position === 0) {
            style = {
              transform: "translateX(0) scale(1) rotateY(0deg)",
              zIndex: 50,
              opacity: 1,
            };
          } else if (position === 1 && visibleCount > 1) {
            style = {
              transform: `translateX(${gap}px) scale(${scale}) rotateY(-25deg)`,
              zIndex: 40,
              opacity: 1,
            };
          } else if (position === tourismData.length - 1 && visibleCount > 1) {
            style = {
              transform: `translateX(-${gap}px) scale(${scale}) rotateY(25deg)`,
              zIndex: 40,
              opacity: 1,
            };
          } else if (position === 2 && visibleCount > 3) {
            style = {
              transform: `translateX(${gap * 1.75}px) scale(0.8) rotateY(-40deg)`,
              zIndex: 20,
              opacity: 1,
            };
          } else if (
            position === tourismData.length - 2 &&
            visibleCount > 3
          ) {
            style = {
              transform: `translateX(-${gap * 1.75}px) scale(0.8) rotateY(40deg)`,
              zIndex: 20,
              opacity: 1,
            };
          } else {
            style = { transform: "scale(0.6)", zIndex: 10, opacity: 0 };
          }

          return (
            <div
              key={index}
              style={style}
              className="absolute w-[360px] h-[480px] rounded-xl shadow-lg transition-all duration-700 ease-in-out overflow-hidden group"
            >
              {/* Background Image */}
              <Image
                src={place.image}
                alt={place.name}
                width={360}
                height={480}
                className="object-contain rounded-xl"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Link
                  href={place.profile}
                  target="_blank"
                  className="text-white font-semibold text-lg underline underline-offset-4"
                >
                  Explore →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-8 mt-6">
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === 0 ? tourismData.length - 1 : prev - 1
            )
          }
          className="text-3xl text-black hover:text-[#f6ff00] transition"
        >
          &#8592;
        </button>
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % tourismData.length)
          }
          className="text-3xl text-black hover:text-[#f6ff00] transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default DistrictGems;
