"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Map file in public folder
const geoUrl = "/jharkhand.json";

// All 24 Jharkhand Districts → Photos mapping
const districtImages = {
  RANCHI: [
    "/images/districts/ranchi1.jpg",
    "/images/districts/ranchi2.jpg",
    "/images/districts/ranchi3.avif",
  ],
  DHANBAD: [
    "/districts/dhanbad1.jpg",
    "/districts/dhanbad2.jpg",
  ],
  "SARAIKELA-KHARSAWAN": [
    "/districts/saraikela1.jpg",
    "/districts/saraikela2.jpg",
  ],
  SIMDEGA: [
    "/districts/simdega1.jpg",
    "/districts/simdega2.jpg",
    "/districts/simdega3.jpg",
  ],
  SAHIBGANJ: [
    "/districts/sahibganj1.jpg",
    "/districts/sahibganj2.jpg",
  ],
  BOKARO: [
    "/districts/bokaro1.jpg",
    "/districts/bokaro2.jpg",
  ],
  DEOGHAR: [
    "/districts/deoghar1.jpg",
    "/districts/deoghar2.jpg",
  ],
  DUMKA: [
    "/districts/dumka1.jpg",
    "/districts/dumka2.jpg",
  ],
  "EAST SINGHBHUM": [
    "/districts/east-singhbhum1.jpg",
    "/districts/east-singhbhum2.jpg",
  ],
  GARHWA: [
    "/districts/garhwa1.jpg",
    "/districts/garhwa2.jpg",
  ],
  GIRIDIH: [
    "/districts/giridih1.jpg",
    "/districts/giridih2.jpg",
  ],
  GODDA: [
    "/districts/godda1.jpg",
    "/districts/godda2.jpg",
  ],
  GUMLA: [
    "/districts/gumla1.jpg",
    "/districts/gumla2.jpg",
  ],
  HAZARIBAGH: [
    "/districts/hazaribagh1.jpg",
    "/districts/hazaribagh2.jpg",
  ],
  JAMTARA: [
    "/districts/jamtara1.jpg",
    "/districts/jamtara2.jpg",
  ],
  KHUNTI: [
    "/districts/khunti1.jpg",
    "/districts/khunti2.jpg",
  ],
  KODARMA: [
    "/districts/koderma1.jpg",
    "/districts/koderma2.jpg",
  ],
  LATEHAR: [
    "/districts/latehar1.jpg",
    "/districts/latehar2.jpg",
  ],
  LOHARDAGA: [
    "/districts/lohardaga1.jpg",
    "/districts/lohardaga2.jpg",
  ],
  PAKUR: [
    "/districts/pakur1.jpg",
    "/districts/pakur2.jpg",
  ],
  PALAMU: [
    "/districts/palamu1.jpg",
    "/districts/palamu2.jpg",
  ],
  RAMGARH: [
    "/districts/ramgarh1.jpg",
    "/districts/ramgarh2.jpg",
  ],
  "WEST SINGHBHUM": [
    "/districts/west-singhbhum1.jpg",
    "/districts/west-singhbhum2.jpg",
  ],
  CHATRA: [
    "/districts/chatra1.jpg",
    "/districts/chatra2.jpg",
  ],
};

const districtDescriptions = {
  RANCHI: "The capital city of Jharkhand, known for its waterfalls, hills, and rich cultural heritage.",
  DHANBAD: "The coal capital of India, famous for its mining industry and educational institutions.",
  "SARAIKELA-KHARSAWAN": "Known for its tribal culture, dance forms, and natural beauty.",
  SIMDEGA: "A picturesque district with lush green forests and tribal traditions.",
  SAHIBGANJ: "Located on the banks of river Ganga, known for its historical significance.",
  BOKARO: "Industrial hub known for steel production and modern infrastructure.",
  DEOGHAR: "Famous pilgrimage destination with ancient temples and spiritual significance.",
  DUMKA: "Tribal heartland with rich cultural heritage and natural beauty.",
  "EAST SINGHBHUM": "Industrial center with mining activities and urban development.",
  GARHWA: "Known for its forests, wildlife, and natural resources.",
  GIRIDIH: "Rich in coal deposits and known for its mining industry.",
  GODDA: "Agricultural district with scenic landscapes and rural charm.",
  GUMLA: "Tribal district with dense forests and traditional culture.",
  HAZARIBAGH: "Famous for its national park and wildlife sanctuary.",
  JAMTARA: "Known for its rural landscapes and agricultural activities.",
  KHUNTI: "Tribal district with rich cultural heritage and natural beauty.",
  KODARMA: "Known for mica mining and industrial activities.",
  LATEHAR: "Forested district with tribal communities and natural resources.",
  LOHARDAGA: "Tribal district known for its cultural traditions and forests.",
  PAKUR: "Agricultural district with scenic beauty and rural lifestyle.",
  PALAMU: "Known for its tiger reserve and wildlife conservation.",
  RAMGARH: "Industrial district with coal mining and urban development.",
  "WEST SINGHBHUM": "Tribal district with rich mineral resources and forests.",
  CHATRA: "Agricultural district with rural charm and natural beauty.",
};

export default function JharkhandMap() {
  const [selected, setSelected] = useState("RANCHI");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // ViewBox dimensions used by both SVG and absolute overlay
  const VIEW_W = 550;
  const VIEW_H = 450;
  const PILL_W = 110; // approximate pill width in px
  const PILL_H = 28;  // approximate pill height in px

  // Runtime-computed anchors to align leader lines exactly to pill edges
  const containerRef = useRef(null);
  const labelRefs = useRef({});
  const [anchors, setAnchors] = useState({});

  useEffect(() => {
    const computeAnchors = () => {
      const cn = containerRef.current;
      if (!cn) return;
      const cr = cn.getBoundingClientRect();
      const next = {};
      labelConfig.forEach((l) => {
        const el = labelRefs.current[l.name];
        if (!el) return;
        const r = el.getBoundingClientRect();
        let axPx = r.left, ayPx = r.top;
        switch (l.orient) {
          case "right":
            axPx = r.left - 6; // left edge just outside
            ayPx = r.top + r.height / 2;
            break;
          case "left":
            axPx = r.right + 6; // right edge just outside
            ayPx = r.top + r.height / 2;
            break;
          case "top":
            axPx = r.left + r.width / 2;
            ayPx = r.bottom + 6; // just below pill
            break;
          case "bottom":
            axPx = r.left + r.width / 2;
            ayPx = r.top - 6; // just above pill
            break;
          default:
            axPx = r.left; ayPx = r.top;
        }
        // Convert to viewBox coords
        const x2 = ((axPx - cr.left) / cr.width) * VIEW_W;
        const y2 = ((ayPx - cr.top) / cr.height) * VIEW_H;
        next[l.name] = { x2, y2 };
      });
      setAnchors(next);
    };

    // Compute on mount and resize
    computeAnchors();
    const ro = new ResizeObserver(() => computeAnchors());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", computeAnchors);
    return () => {
      window.removeEventListener("resize", computeAnchors);
      ro.disconnect();
    };
  }, []);

  // Label layout configuration: positions are in percentages (relative to container),
  // dot is in SVG viewBox coordinates. orient helps pick the line end offset.
  const labelConfig = [
    
    // Top row
    { name: "GARHWA", top: 15, left: 7, dot: [105, 160], orient: "left" },
    { name: "PALAMU", top: 12, left: 25, dot: [160, 155], orient: "top" },
    { name: "CHATRA", top: 4, left: 34, dot: [235, 159], orient: "top" },
    { name: "KODARMA", top: 2, left: 54, dot: [315, 128], orient: "top" },
    { name: "HAZARIBAGH", top: 12, left: 43.5, dot: [295, 170], orient: "top" },
    { name: "GIRIDIH", top: 12, left: 64, dot: [366, 150], orient: "top" },
    { name: "DEOGHAR", top: 7, left: 75, dot: [425, 140], orient: "top" },
    { name: "GODDA", top: 1, left: 85, dot: [485, 80], orient: "top" },
    { name: "SAHIBGANJ", top: 0, left: 95, dot: [525, 62], orient: "top" },

    // Right column
    { name: "PAKUR", top: 27, left: 99, dot: [525, 112], orient: "right" },
    { name: "DUMKA", top: 34, left: 98, dot: [485, 145], orient: "right" },
    { name: "JAMTARA", top: 41, left: 93, dot: [445, 185], orient: "right" },
    { name: "DHANBAD", top: 48, left: 87, dot: [400, 200], orient: "right" },

    // Center/bottom
    { name: "RAMGARH", top: 56, left: 67, dot: [302, 220], orient: "bottom" },
    { name: "BOKARO", top: 55, left: 81, dot: [350, 214], orient: "right" },
    { name: "RANCHI", top: 65, left: 80, dot: [288, 252], orient: "bottom" },
    { name: "KHUNTI", top: 92, left: 36, dot: [275, 295], orient: "left" },
    { name: "WEST SINGHBHUM", top: 95, left: 47, dot: [300, 361], orient: "bottom" },
    { name: "SARAIKELA-KHARSAWAN", top: 90, left: 65, dot: [350, 315], orient: "bottom" },
    { name: "EAST SINGHBHUM", top: 82, left: 86, dot: [395, 340], orient: "bottom" },

    // Left/bottom-left column
    { name: "LATEHAR", top: 50, left: 6, dot: [190, 205], orient: "left" },
    { name: "LOHARDAGA", top: 59, left: 7, dot: [210, 240], orient: "left" },
    { name: "GUMLA", top: 72, left: 12, dot: [195, 280], orient: "bottom" },
    { name: "SIMDEGA", top: 90, left: 24, dot: [200, 340], orient: "bottom" },
  ];

  // Get all available districts
  const availableDistricts = Object.keys(districtImages);
  const currentDistrictIndex = availableDistricts.indexOf(selected);

  const handleDistrictClick = (district) => {
    setSelected(district);
    setCurrentImageIndex(0);
  };

  const nextDistrict = () => {
    const nextIndex = (currentDistrictIndex + 1) % availableDistricts.length;
    setSelected(availableDistricts[nextIndex]);
    setCurrentImageIndex(0);
  };

  const prevDistrict = () => {
    const prevIndex = currentDistrictIndex === 0 ? availableDistricts.length - 1 : currentDistrictIndex - 1;
    setSelected(availableDistricts[prevIndex]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selected && districtImages[selected]) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % districtImages[selected].length
      );
    }
  };

  const prevImage = () => {
    if (selected && districtImages[selected]) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? districtImages[selected].length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">JHARKHAND</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Discover Jharkhand</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* MAP SECTION */}
          <div className="flex-1 relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 6000,
                center: [85.2799, 23.6102],
              }}
              width={550}
              height={450}
              className="w-full h-auto"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const district =
                      geo.properties?.District ||
                      geo.properties?.DISTRICT ||
                      geo.properties?.name;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleDistrictClick(district)}
                        style={{
                          default: {
                            fill: selected === district ? "#3b82f6" : "#e5e7eb",
                            stroke: "#ffffff",
                            strokeWidth: 1,
                            outline: "none",
                          },
                          hover: { 
                            fill: selected === district ? "#2563eb" : "#d1d5db", 
                            outline: "none",
                            cursor: "pointer"
                          },
                          pressed: { fill: "#1d4ed9", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* SVG for connecting lines and dots (data-driven) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
              {labelConfig.map((l) => {
                const [cx, cy] = l.dot;
                const fallbackAx = (l.left / 100) * VIEW_W;
                const fallbackAy = (l.top / 100) * VIEW_H;
                const anchor = anchors[l.name];
                let x2 = anchor?.x2 ?? fallbackAx;
                let y2 = anchor?.y2 ?? fallbackAy; // anchor near actual label edge
                let mx = cx, my = cy; // elbow point

                // Color logic for selected district
                const isSelected = selected === l.name;
                const lineColor = isSelected ? "#1e2a78" : "#60a0f0"; // navy blue or blue
                const dotColor = isSelected ? "#1e2a78" : "#3b82f6";

                switch (l.orient) {
                  case "right": {
                    if (!anchor) { x2 = fallbackAx - 8; y2 = fallbackAy + PILL_H / 2; }
                    mx = x2; // horizontal first, then vertical
                    my = cy;
                    break;
                  }
                  case "left": {
                    if (!anchor) { x2 = fallbackAx + PILL_W + 8; y2 = fallbackAy + PILL_H / 2; }
                    mx = x2; // horizontal first, then vertical
                    my = cy;
                    break;
                  }
                  case "top": {
                    if (!anchor) { x2 = fallbackAx + PILL_W / 2; y2 = fallbackAy + PILL_H + 6; }
                    mx = cx; // vertical first, then horizontal
                    my = y2;
                    break;
                  }
                  case "bottom": {
                    if (!anchor) { x2 = fallbackAx + PILL_W / 2; y2 = fallbackAy - 6; }
                    mx = cx; // vertical first, then horizontal
                    my = y2;
                    break;
                  }
                  default: {
                    if (!anchor) { x2 = fallbackAx; y2 = fallbackAy; }
                    mx = x2; my = y2;
                  }
                }

                return (
                  <g key={`lead-${l.name}`}>
                    {/* leader path: L-shaped with rounded caps, dashed */}
                    <path
                      d={`M ${cx} ${cy} L ${mx} ${my} L ${x2} ${y2}`}
                      stroke={lineColor}
                      strokeWidth="1.25"
                      strokeDasharray="2 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* soft glow */}
                    <circle cx={cx} cy={cy} r="8" fill="#93c5fd" opacity="0.25" />
                    {/* dot with subtle outline */}
                    <circle cx={cx} cy={cy} r="5" fill={dotColor} stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })}
            </svg>

            {/* District Names positioned outside the map (data-driven) */}
            <div ref={containerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {labelConfig.map((l) => (
                <button
                  key={`label-${l.name}`}
                  ref={(el) => { labelRefs.current[l.name] = el; }}
                  onClick={() => handleDistrictClick(l.name)}
                  className={`absolute pointer-events-auto text-xs font-semibold px-3 py-2 rounded-md border cursor-pointer transition-all whitespace-nowrap ${
                    selected === l.name
                      ? "text-white bg-blue-600 border-blue-600 shadow-lg"
                      : "text-blue-600 bg-white border-gray-300 hover:bg-blue-50"
                  }`}
                  style={{ top: `${l.top}%`, left: `${l.left}%` }}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="w-full lg:w-96 flex flex-col items-center">
            {/* District Navigation Arrows */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={prevDistrict}
                className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-sm text-gray-500 font-medium">
                {currentDistrictIndex + 1} of {availableDistricts.length}
              </span>
              <button
                onClick={nextDistrict}
                className="w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {selected ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full">
                {/* Image Display */}
                <div className="relative h-64 bg-gray-200">
                  {districtImages[selected] && districtImages[selected].length > 0 ? (
                    <>
                      <Image
                        src={districtImages[selected][currentImageIndex]}
                        alt={`${selected} ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Navigation Arrows for Images */}
                      {districtImages[selected].length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          </button>
                        </>
                      )}

                      {/* Image Indicators */}
                      {districtImages[selected].length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {districtImages[selected].map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentImageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No images available</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{selected}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {districtDescriptions[selected] || "Discover the beauty and culture of this amazing district."}
                  </p>

                  {/* Explore Button */}
                  <button
                    onClick={() => router.push(`/district/${selected.toLowerCase()}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Explore {selected} →
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center w-full">
                <p className="text-gray-500">Select a district on the map to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}