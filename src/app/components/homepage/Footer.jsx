"use client";
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, ChevronRight, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
   <footer className="relative footer-font pt-12 pb-6 mt-10 overflow-hidden text-[#ffd9a1]" style={{backgroundColor:'var(--color-secondary-dark)'}}>
  {/* Solid brown background to match reference */}
  <div className="absolute inset-0 -z-10" />

      {/* Heading removed to match reference layout */}

      {/* Five-column layout like reference */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 z-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4" style={{color:'var(--color-accent)', borderColor:'#6b4a31'}}>Contact Info</h3>
          <div className="space-y-3 text-[16px]">
            <p className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#ffbf66] mt-0.5" />
              <span>
                Directorate of Tourism, Jharkhand,<br />
                5th Floor, FFP Building,<br />
                Dhurwa, Ranchi – 834004
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#ffbf66]" />
              (+91) 123 456 7890
            </p>
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#ffbf66]" />
              tourism@jharkhand.gov.in
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* About Jharkhand */}
        <div>
          <h3 className="text-xl font-semibold text-[#ffbf66] border-b border-[#6b4a31] pb-2 mb-4">About Jharkhand</h3>
          <ul className="space-y-2">
            {[
              "History",
              "Key Facts",
              "Geography",
              "People & Language",
              "Administration & Economy",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-[#ffbf66]" />
                <Link href="#" className="hover:text-white">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Share */}
        <div>
          <h3 className="text-xl font-semibold text-[#ffbf66] border-b border-[#6b4a31] pb-2 mb-4">Share</h3>
          <ul className="space-y-2">
            {[
              "Photo Gallery",
              "Video Gallery",
              "360° Virtual Tour",
              "Posters",
              "Radio Jingles",
              "Feedback",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-[#ffbf66]" />
                <Link href="#" className="hover:text-white">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold text-[#ffbf66] border-b border-[#6b4a31] pb-2 mb-4">Policies</h3>
          <ul className="space-y-2">
            {[
              "Terms & Conditions",
              "Copyright Policy",
              "Privacy Policy",
              "Hyperlinking Policy",
              "Help",
              "Disclaimer",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-[#ffbf66]" />
                <Link href="#" className="hover:text-white">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#ffbf66] border-b border-[#6b4a31] pb-2 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              "Press & Media",
              "News Letter",
              "Map",
              "Weather",
              "E-Brochure",
              "FAQs",
              "DOs & Don'ts",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-1 text-[#ffbf66]" />
                <Link href="#" className="hover:text-white">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider line across width */}
      <div className="relative max-w-7xl mx-auto px-6 mt-6 z-10">
        <div className="h-px w-full" style={{backgroundColor:'#6b4a31'}} />
      </div>

      {/* Two-section lower footer: left notice, right feedback capsule */}
      <div className="relative mt-8 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:[grid-template-columns:2fr_1fr] gap-8 items-start">
          {/* Left: notice text block */}
          <div className="rounded-xl/none pr-8">
            <p className="text-base leading-7">
              This is the official website of Department of Tourism, Jharkhand, India. Content on this website is published and managed by Department of Tourism, Jharkhand, India. For any query regarding this website, please contact the <span style={{color:'var(--color-accent)'}}>"Web Information Manager"</span>.
            </p>
            <p className="mt-6 text-sm">Last Updated On: 04 September 2025 | 02:36 PM</p>
          </div>

          {/* Right: feedback pill and visitor number */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <button
              aria-label="Feedback"
              className="flex items-center gap-3 px-7 py-3 rounded-full border backdrop-blur-md shadow-sm ring-1 transition-colors"
              style={{
                borderColor: '#6b4a31',
                backgroundColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              <MessageSquare className="w-6 h-6" style={{color:'#ffbf66'}} />
              <span className="font-semibold tracking-wide uppercase text-[#ffe0b3]">Feedback</span>
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span>Visitor No. :</span>
              <span className="px-3 py-1 rounded-sm bg-black/60 font-mono tracking-widest">000008432423</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
