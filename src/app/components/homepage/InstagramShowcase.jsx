"use client";
import Image from "next/image";

export default function InstagramShowcase() {
  const baseImages = [
    "/images/districts/ranchi1.jpg",
    "/images/districts/ranchi2.jpg",
    "/images/districts/ranchi3.avif",
    "/images/districtgems/img1.jpg",
    "/images/districtgems/img2.jpg",
    "/images/districtgems/img3.jpg",
    "/images/districtgems/img4.jpg",
  ];
  const images = Array.from({ length: 9 }, (_, i) => baseImages[i % baseImages.length]);

  return (
    <section className="w-full" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:[grid-template-columns:0.9fr_1.6fr] gap-8 items-start">
        {/* Left copy */}
        <div className="text-white self-start pt-10 md:pt-24 md:sticky md:top-24 max-w-md">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Follow us on<br /> Instagram
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/90">
            Getaways, itineraries, events, tips... Even more ideas to Explore Jharkhand.
          </p>
          <a
            href="#"
            className="inline-block mt-6 px-6 py-2.5 rounded-full border text-white transition text-base tracking-wide"
            style={{ borderColor: 'var(--color-accent)' }}
          >
            <span style={{ color: 'var(--color-accent)' }}>#ExploreJharkhand</span>
          </a>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-3 gap-5 self-start pb-2">
          {images.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded overflow-hidden" style={{minHeight: 220}}>
              <Image src={src} alt={`instagram ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


