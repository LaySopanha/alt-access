"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ImageComparisonSlider({
  imageSrc,
  filterType,
}: {
  imageSrc: string
  filterType: "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "monochromacy"
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

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
    if (filterType === "protanopia") {
      return "url('#protanopia')"
    } else if (filterType === "deuteranopia") {
      return "url('#deuteranopia')"
    } else if (filterType === "tritanopia") {
      return "url('#tritanopia')"
    } else if (filterType === "monochromacy") {
      return "grayscale(100%)"
    }
    return "none"
  }

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
    >
      {/* Original Image (Background - Full) */}
      <div className="absolute inset-0">
        <img src={imageSrc || "/placeholder.svg"} alt="" className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Filtered Image (Overlay - Clipped from right) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
          filter: getFilterStyle(),
        }}
      >
        <img src={imageSrc || "/placeholder.svg"} alt="" className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-400" />
            <div className="w-0.5 h-4 bg-gray-400" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
        {filterType === "normal"
          ? "Normal"
          : filterType === "protanopia"
            ? "Protanopia"
            : filterType === "deuteranopia"
              ? "Deuteranopia"
              : filterType === "tritanopia"
                ? "Tritanopia"
                : "Monochromacy"}
      </div>
    </div>
  )
}

export default function ColorBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [filterType, setFilterType] = useState<
    "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "monochromacy"
  >("protanopia")
  const [viewMode, setViewMode] = useState<"examples" | "images">("examples")

  const filters = [
    { value: "normal", label: "Normal Vision", description: "How most people see colors" },
    { value: "protanopia", label: "Protanopia (Red-Blind)", description: "Difficulty distinguishing red and green" },
    { value: "deuteranopia", label: "Deuteranopia (Green-Blind)", description: "Most common form of color blindness" },
    { value: "tritanopia", label: "Tritanopia (Blue-Blind)", description: "Difficulty distinguishing blue and yellow" },
    { value: "monochromacy", label: "Monochromacy (Total Color Blind)", description: "See only in shades of gray" },
  ]

  if (!started) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
          <Link href="/" className="text-sm underline hover:text-lima-blue transition-colors">
            ← Back to main menu
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Color Blindness Experience</h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              During this experience, we would like you to view an infographic about color blindness and toggle to see
              how colors appear to a colorblind person.
            </p>

            <Button size="lg" onClick={() => setStarted(true)} className="w-full md:w-auto">
              Start Experience
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 space-y-8">
        <Link href="/" className="text-sm underline hover:text-lima-blue transition-colors inline-block">
          ← Back to main menu
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Understanding Color Blindness</h1>

          <p className="text-lg text-muted-foreground max-w-3xl">
            Use the slider to compare how colors appear with different types of color vision deficiency. About 8% of men
            and 0.5% of women have some form of color blindness.
          </p>

          {/* Filter Controls */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value as any)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  filterType === filter.value
                    ? "border-lima-blue bg-lima-blue/5"
                    : "border-border hover:border-lima-blue/50"
                }`}
              >
                <div className="font-semibold text-sm">{filter.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{filter.description}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
            <Button variant={viewMode === "examples" ? "default" : "outline"} onClick={() => setViewMode("examples")}>
              View Examples
            </Button>
            <Button variant={viewMode === "images" ? "default" : "outline"} onClick={() => setViewMode("images")}>
              View Images
            </Button>
          </div>

          <div className="space-y-8">
            {viewMode === "examples" ? (
              <div className={`space-y-8 transition-all duration-300`}>
                {/* Traffic Light Example */}
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Traffic Light Challenge</h2>
                  <p className="text-sm text-muted-foreground">
                    Without position cues, colorblind individuals struggle to identify signals
                  </p>
                  <div className="flex gap-4 items-center justify-center py-8">
                    <div className="w-20 h-20 rounded-full bg-red-500" />
                    <div className="w-20 h-20 rounded-full bg-yellow-400" />
                    <div className="w-20 h-20 rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Color Palette Example */}
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Common Color Confusion</h2>
                  <p className="text-sm text-muted-foreground">
                    These colors are often indistinguishable for colorblind users
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-red-600" />
                      <p className="text-xs text-center">Red</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-green-600" />
                      <p className="text-xs text-center">Green</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-blue-600" />
                      <p className="text-xs text-center">Blue</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-orange-500" />
                      <p className="text-xs text-center">Orange</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-purple-600" />
                      <p className="text-xs text-center">Purple</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full aspect-square rounded-lg bg-yellow-400" />
                      <p className="text-xs text-center">Yellow</p>
                    </div>
                  </div>
                </div>

                {/* Chart Example */}
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Data Visualization Issues</h2>
                  <p className="text-sm text-muted-foreground">
                    Red-green charts are nearly impossible to read for colorblind users
                  </p>
                  <div className="flex gap-2 h-64 items-end">
                    <div className="flex-1 bg-red-500 rounded-t" style={{ height: "70%" }} />
                    <div className="flex-1 bg-green-500 rounded-t" style={{ height: "85%" }} />
                    <div className="flex-1 bg-blue-500 rounded-t" style={{ height: "60%" }} />
                    <div className="flex-1 bg-orange-500 rounded-t" style={{ height: "75%" }} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Nature Scene</h2>
                  <p className="text-sm text-muted-foreground">
                    Drag the slider to compare how different types of color blindness affect natural scenery
                  </p>
                  <ImageComparisonSlider
                    imageSrc="/vibrant-nature-landscape-with-flowers-trees-sky.jpg"
                    filterType={filterType}
                  />
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Colorful Food</h2>
                  <p className="text-sm text-muted-foreground">
                    See how fresh fruits and vegetables appear with color vision deficiency
                  </p>
                  <ImageComparisonSlider
                    imageSrc="/colorful-fresh-fruits-and-vegetables-assortment.jpg"
                    filterType={filterType}
                  />
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">UI Interface</h2>
                  <p className="text-sm text-muted-foreground">
                    Compare how color blindness affects user interface readability
                  </p>
                  <ImageComparisonSlider
                    imageSrc="/colorful-user-interface-dashboard-with-buttons-cha.jpg"
                    filterType={filterType}
                  />
                </div>

                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">City Lights</h2>
                  <p className="text-sm text-muted-foreground">
                    Urban scenes with neon signs and traffic signals shown side by side
                  </p>
                  <ImageComparisonSlider
                    imageSrc="/city-street-with-colorful-neon-signs-traffic-light.jpg"
                    filterType={filterType}
                  />
                </div>
              </>
            )}
          </div>

          <div className="bg-lima-blue/10 border border-lima-blue/20 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lima-blue">Design Tip</h3>
            <p className="text-sm">
              Never rely on color alone to convey information. Always use text labels, patterns, or icons alongside
              color to ensure accessibility for all users.
            </p>
          </div>
        </div>
      </div>

      {/* SVG Filters for Color Blindness Simulation */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0,     0, 0
                                                   0.558, 0.442, 0,     0, 0
                                                   0,     0.242, 0.758, 0, 0
                                                   0,     0,     0,     1, 0"
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0,   0, 0
                                                   0.7,   0.3,   0,   0, 0
                                                   0,     0.3,   0.7, 0, 0
                                                   0,     0,     0,   1, 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05,  0,     0, 0
                                                   0,    0.433, 0.567, 0, 0
                                                   0,    0.475, 0.525, 0, 0
                                                   0,    0,     0,     1, 0"
            />
          </filter>
        </defs>
      </svg>
    </main>
  )
}
