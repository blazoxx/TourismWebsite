"use client";
import { useState, useEffect } from "react";
import { Menu, Search, User, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top utility bar */}
      <div
        className={`w-full text-white ${
          scrolled ? "border-b-0" : "border-b border-white/10"
        } overflow-hidden transition-[max-height,opacity,border] duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`} style={{backgroundColor: 'rgba(71,85,105,0.9)'}}
        data-nav-utility
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-2 hover:underline">
              <span className="inline-block w-4 h-4 rounded-[4px] bg-white/20" />
              <span>Access Screen Reader</span>
            </a>
            <a href="#main" className="hover:underline">Skip to main Content</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20">A-</button>
              <button className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20">A</button>
              <button className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20">A+</button>
            </div>
            <span className="hidden md:inline">ENG / हिन्दी</span>
            <a href="#login" className="px-4 py-1 rounded font-semibold" style={{backgroundColor: 'var(--color-secondary)', color: 'var(--color-white)'}}>LOGIN</a>
          </div>
        </div>
      </div>

      {/* Main dark navbar */}
      <div className={`w-full backdrop-blur-lg text-white ${scrolled ? "shadow-lg" : ""}`} style={{backgroundColor: 'rgba(71,85,105,0.9)'}} data-nav-main>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between py-2">
            {/* Left: Jharkhand Tourism logo */}
            <div className="flex items-center gap-4 relative">
              <div className="relative h-14 flex items-center justify-center overflow-visible">
                <Image
                  src="/images/newlogo.png"
                  alt="Jharkhand Tourism Logo"
                  width={150}
                  height={150}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Center links */}
            <nav className={`hidden md:flex items-center gap-6 text-sm font-medium`}>
              <Link href="/" className="relative group hover:text-white">
                Home
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/places" className="relative group hover:text-white">
                Places
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/handicrafts" className="relative group hover:text-white">
                Handicrafts
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/artifacts" className="relative group hover:text-white">
                Artifacts
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/tribes" className="relative group hover:text-white">
                Tribes
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/ecotourism" className="relative group hover:text-white">
                Ecotourism
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/events" className="relative group hover:text-white">
                Events
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link href="/homestays" className="relative group hover:text-white">
                Homestays
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              {[
                { label: "About us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="relative group hover:text-white">
                  {link.label}
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right: search + department title + burger */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-white/10 hover:bg-white/20">
                <Search size={16} />
              </button>
              <div className="hidden md:flex flex-col leading-tight text-right">
                <span className="text-base font-semibold">Tourism Department</span>
                <span className="text-[11px] text-white/80">Government of Jharkhand</span>
              </div>
              <button
                className="md:hidden p-2 rounded-md hover:bg-white/10"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden absolute left-0 right-0 top-full bg-[#2F2F3A]/90 backdrop-blur-lg border-t border-white/10 overflow-hidden transition-[max-height,opacity] duration-300 ${
              mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 pt-2 px-6 space-y-3">
              <Link href="/" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Home
              </Link>
              <Link href="/places" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Places
              </Link>
              <Link href="/handicrafts" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Handicrafts
              </Link>
              <Link href="/artifacts" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Artifacts
              </Link>
              <Link href="/tribes" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Tribes
              </Link>
              <Link href="/ecotourism" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Ecotourism
              </Link>
              <Link href="/events" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Events
              </Link>
              <Link href="/homestays" className="block px-2 py-2 rounded-md hover:bg-white/10">
                Homestays
              </Link>
              {[
                { label: "About us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="block px-2 py-2 rounded-md hover:bg-white/10">
                  {link.label}
                </a>
              ))}
              <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20">
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
