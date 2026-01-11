"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Info, ScanEye, GripVertical, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

// --- SUB-COMPONENT: SLIDER ---
function ImageComparisonSlider({
  imageSrc,
  filterType,
  label,
}: {
  imageSrc: string
  filterType: string
  label: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleInteractionStart = () => setIsDragging(true)
  const handleInteractionEnd = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const getFilterStyle = () => {
    switch (filterType) {
      case "protanopia": return "url('#protanopia')"
      case "deuteranopia": return "url('#deuteranopia')"
      case "tritanopia": return "url('#tritanopia')"
      case "monochromacy": return "grayscale(100%)"
      default: return "none"
    }
  }

  return (
    <div className="space-y-3 group/slider">
      <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
        <div className="w-1.5 h-4 bg-[#ff751f] rounded-full" />
        {label}
      </h3>

      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-200 shadow-sm transition-shadow group-hover/slider:shadow-md hover:border-[#1351aa]/30"
        onMouseMove={handleMouseMove}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleInteractionEnd}
        onClick={handleClick}
      >
        {/* Original (Left) */}
        <div className="absolute inset-0">
          <img src={imageSrc} alt="Original" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none">
            Normal
          </div>
        </div>

        {/* Filtered (Right) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            filter: getFilterStyle(),
          }}
        >
          <img src={imageSrc} alt="Simulated" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute top-3 right-3 bg-[#1351aa]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider pointer-events-none shadow-sm">
            {filterType}
          </div>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-none z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff751f] rounded-full shadow-lg flex items-center justify-center border-[3px] border-white text-white">
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN PAGE ---

export default function ColorBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [filterType, setFilterType] = useState("deuteranopia")
  const [activeTab, setActiveTab] = useState<"abstract" | "real">("abstract")

  const filters = [
    { value: "normal", label: "Normal", desc: "Standard Vision" },
    { value: "deuteranopia", label: "Deuteranopia", desc: "Green-Blind (Common)" },
    { value: "protanopia", label: "Protanopia", desc: "Red-Blind" },
    { value: "tritanopia", label: "Tritanopia", desc: "Blue-Blind (Rare)" },
    { value: "monochromacy", label: "Monochromacy", desc: "Total Grayscale" },
  ]

  const getFilterClass = () => {
    switch (filterType) {
      case "protanopia": return "[filter:url('#protanopia')]"
      case "deuteranopia": return "[filter:url('#deuteranopia')]"
      case "tritanopia": return "[filter:url('#tritanopia')]"
      case "monochromacy": return "grayscale"
      default: return ""
    }
  }

  // --- INTRO SCREEN ---
  if (!started) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Brand Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1351aa_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff751f]/5 rounded-full blur-[100px]" />

        <div className="max-w-3xl w-full space-y-8 relative z-10">
          <Link
            href="/experience"
            className="text-sm font-medium text-slate-500 hover:text-[#1351aa] transition-colors flex items-center gap-2 group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to main menu
          </Link>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#ff751f] font-bold text-xs uppercase tracking-widest">
                <ScanEye className="w-4 h-4" />
                <span>Visual Simulation 03</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1351aa]">
                Color Blindness Lab
              </h1>
            </div>

            <div className="space-y-6 border-l-4 border-[#ff751f] pl-6 py-2">
              <h2 className="text-xl font-bold text-slate-900">Mission</h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                Colors convey meaning, but not everyone sees them the same way.
                In this lab, you will analyze standard UI components through the eyes of the
                <strong> 8% of men</strong> and <strong>0.5% of women</strong> who have Color Vision Deficiency (CVD).
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="bg-[#ff751f] hover:bg-[#e06519] text-white rounded-xl px-10 py-7 text-lg font-semibold shadow-xl shadow-orange-900/10 transition-all hover:-translate-y-1"
            >
              Enter Laboratory
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- LAB INTERFACE ---
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#ff751f] selection:text-white">

      {/* Sticky Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/experience" className="flex items-center gap-2 text-slate-500 hover:text-[#1351aa] transition-colors group">
            <div className="bg-slate-100 p-1.5 rounded-md group-hover:bg-[#1351aa]/10">
              <ArrowLeft className="w-4 h-4 group-hover:text-[#1351aa]" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wide hidden sm:inline">Exit</span>
          </Link>

          <div className="font-serif font-bold text-[#1351aa] text-lg">CVD Simulator</div>

          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Filter Controls */}
        <div className="border-t border-slate-100 bg-white">
          <div className="container mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max mx-auto justify-center">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilterType(f.value)}
                  className={cn(
                    "flex flex-col items-start px-4 py-2.5 rounded-lg border-2 transition-all min-w-[140px]",
                    filterType === f.value
                      ? "border-[#1351aa] bg-[#1351aa]/5"
                      : "border-transparent hover:bg-slate-50"
                  )}
                >
                  <span className={cn(
                    "text-sm font-bold",
                    filterType === f.value ? "text-[#1351aa]" : "text-slate-600"
                  )}>{f.label}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-5xl">

        {/* Mode Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm inline-flex gap-1">
            <button
              onClick={() => setActiveTab("abstract")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === "abstract"
                  ? "bg-[#1351aa] text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              UI Components
            </button>
            <button
              onClick={() => setActiveTab("real")}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                activeTab === "real"
                  ? "bg-[#1351aa] text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              Real World
            </button>
          </div>
        </div>

        <div className="space-y-12">

          {/* --- UI COMPONENTS MODE --- */}
          {activeTab === "abstract" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* Traffic Light */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#1351aa]">Signal Identification</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Colorblind users often rely on <strong>position</strong> or icons rather than color alone.
                    If you only use color to indicate status (Error/Success), they might miss critical warnings.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff751f] bg-[#ff751f]/10 px-3 py-1.5 rounded-full">
                    <Info className="w-3.5 h-3.5" />
                    <span>Best Practice: Always use icons alongside color</span>
                  </div>
                </div>

                <div className="flex justify-center bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                  <div className={cn("bg-slate-800 p-5 rounded-[2rem] shadow-2xl flex flex-col gap-4 border-4 border-slate-700 transition-all duration-500", getFilterClass())}>
                    {/* Red Light */}
                    <div className="w-20 h-20 rounded-full bg-red-500 border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] relative flex items-center justify-center">
                      {/* Only visible symbol for colorblind accessible design */}
                      <X className="w-10 h-10 text-red-900/40" strokeWidth={3} />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/20 rounded-full blur-sm" />
                    </div>
                    {/* Yellow Light */}
                    <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] opacity-30 relative flex items-center justify-center">
                      <div className="w-8 h-1 bg-yellow-900/40 rounded-full" />
                    </div>
                    {/* Green Light */}
                    <div className="w-20 h-20 rounded-full bg-green-500 border-4 border-black/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)] opacity-30 relative flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-900/40" strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Viz */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 h-72 w-full bg-slate-50/50 rounded-2xl border border-slate-100 p-8 flex items-end gap-4 md:gap-6">
                  {/* Bars */}
                  <div className={cn("w-full bg-blue-500 rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "60%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">A</span>
                  </div>
                  <div className={cn("w-full bg-purple-500 rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "80%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">B</span>
                  </div>
                  <div className={cn("w-full bg-green-500 rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "40%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">C</span>
                  </div>
                  <div className={cn("w-full bg-red-500 rounded-t-lg transition-all duration-500 relative group", getFilterClass())} style={{ height: "90%" }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">D</span>
                  </div>
                </div>
                <div className="order-1 md:order-2 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-[#1351aa]">Data Visualization</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Charts relying solely on a color legend become unreadable.
                    Notice how the bars might blend together in Protanopia mode.
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff751f] bg-[#ff751f]/10 px-3 py-1.5 rounded-full">
                    <Info className="w-3.5 h-3.5" />
                    <span>Best Practice: Use patterns or direct labels</span>
                  </div>
                </div>
              </div>

              {/* Palette */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-[#1351aa] mb-2">Design System Contrast</h3>
                  <p className="text-slate-600">Common accessible color pairings can become indistinguishable.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { color: "bg-red-500", name: "Error", hex: "#EF4444" },
                    { color: "bg-green-500", name: "Success", hex: "#22C55E" },
                    { color: "bg-blue-600", name: "Link", hex: "#2563EB" },
                    { color: "bg-purple-600", name: "Visited", hex: "#9333EA" },
                    { color: "bg-orange-500", name: "Warning", hex: "#F97316" },
                    { color: "bg-yellow-400", name: "Caution", hex: "#FACC15" },
                    { color: "bg-pink-500", name: "Accent", hex: "#EC4899" },
                    { color: "bg-cyan-500", name: "Info", hex: "#06B6D4" },
                  ].map((swatch, i) => (
                    <div key={i} className="group cursor-default">
                      <div className={cn("h-28 rounded-xl shadow-inner transition-all duration-500 mb-3", swatch.color, getFilterClass())} />
                      <div className="px-1">
                        <div className="font-bold text-slate-700 text-sm">{swatch.name}</div>
                        <div className="text-xs font-mono text-slate-400">{swatch.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* --- REAL WORLD SCENES (IMAGES) --- */}
          {activeTab === "real" && (
            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Nature & Scenery"
                  imageSrc="/vibrant-nature-landscape-with-flowers-trees-sky.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Fresh Produce (Red/Green)"
                  imageSrc="/colorful-fresh-fruits-and-vegetables-assortment.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Dashboard UI"
                  imageSrc="/colorful-user-interface-dashboard-with-buttons-cha.jpg"
                  filterType={filterType}
                />
              </div>
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <ImageComparisonSlider
                  label="Urban Night Lights"
                  imageSrc="/city-street-with-colorful-neon-signs-traffic-light.jpg"
                  filterType={filterType}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SVG Filters Definition (Hidden) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </main>
  )
}
