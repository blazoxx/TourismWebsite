"use client";
import Image from "next/image";

export default function GovPartners() {
  const logos = [
    { src: "/images/newlogo.png", alt: "Partner 1" },
    { src: "/images/newlogo.png", alt: "Partner 2" },
    { src: "/images/newlogo.png", alt: "Partner 3" },
    { src: "/images/newlogo.png", alt: "Partner 4" },
    { src: "/images/newlogo.png", alt: "Partner 5" },
  ];

  return (
    <section className="w-full" style={{backgroundColor: '#FFFFFF'}}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-14">
        <h3 className="text-center text-xl md:text-2xl font-semibold tracking-wide uppercase mb-10" style={{color: 'var(--color-primary)'}}>Important Websites</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-8">
          {logos.map((logo, i) => (
            <div key={i} className="relative h-10 sm:h-12 md:h-14 w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


