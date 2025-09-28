"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function TourismLeaders() {
  const leaders = [
    {
      name: "Sudivya Kumar",
      title: "Hon'ble Tourism Minister",
      desc: `Gujarat offers diverse ecosystem for all kinds of tourists visiting the state.From exploring the towering Statue of Unity to the exotic Asiatic Lion reigning the forest of Gir, it opens a manifold of experiences to the visitors.Our Hon'ble Prime Minister Shri Narendra Modi has encouraged the development of tourism prospects in the state, and it is through his vision that Gujarat today boasts of a comfortable, safe Our Hon'ble Prime Minister Shri Narendra Modi has encouraged the development of tourism prospects in the state, and it is through his vision that Gujarat today boasts of a comfortable, safe
      `,
      image: "/images/message/Tourism_minister.png",
    },
    {
      name: "Shri Hemant Soren",
      title: "Hon'ble Chief_minister",
      desc: `Tourists from across India and abroad have visited the state to experience the essence of ‘Atithi Devo Bhavah’ while exploring the vibrant tribal traditions, natural beauty and cuisine of Jharkhand. The state has gained recognition at national and international platforms for its festivals like Sarhul, Karma, Tusu Parab, and Sohrai, which showcase its cultural richness. Tourists from across India and abroad have visited the state to experience the essence of ‘Atithi Devo Bhavah’ while exploring the vibrant tribal traditions, natural beauty and cuisine of Jharkhand. 
    
      `,
      image: "/images/message/Chief_minister.png",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevLeader = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? leaders.length - 1 : prev - 1));
  };

  const nextLeader = () => {
    setDirection(1);
    setIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <div className="flex justify-center items-center py-10 bg-black-100">
  <div className="relative flex w-[90%] max-w-6xl bg-blue rounded-2xl shadow-lg border overflow-hidden">
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={index}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col md:flex-row w-full h-[400px]"
      >
        {/* Left Section - Text */}
        <div className="md:w-1/2 w-full p-8 md:p-13 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600">
            {leaders[index].name}
          </h2>
          <p className="text-gray-700 mt-2 text-lg">{leaders[index].title}</p>
          <p className="text-gray-600 mt-4 text-justify leading-relaxed whitespace-pre-line">
            {leaders[index].desc}
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 w-full flex justify-center items-center bg-white p-6">
          <Image
            src={leaders[index].image}
            alt={leaders[index].name}
            width={400}
            height={400}
            className="object-contain rounded-xl "
          />
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Navigation Arrows */}
    {/* Navigation Arrows at Bottom Center */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6">
      <button
        onClick={prevLeader}
        className="text-2xl md:text-3xl font-bold text-gray-500 hover:text-orange-600 
                     p-2  "
      >
        ←
      </button>
      <button
        onClick={nextLeader}
        className="text-2xl md:text-3xl font-bold text-gray-500 hover:text-orange-600 
                    p-2 "
      >
        →
      </button>
    </div>
  </div>
</div>

  );
}
