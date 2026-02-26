"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, CheckCircle2, Bomb, AlertTriangle, RefreshCcw, Ticket, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Wire Type (Scenario 1)
type Wire = {
  id: string
  color: string // Tailwind class for color
  type: "safe" | "danger" | "boom"
  label: string // For barrier-free mode
  pattern: string // CSS pattern class
}

// Seat Type (Scenario 2)
type Seat = {
  id: string
  status: "available" | "booked"
  row: number
  col: number
}

// Scenarios
type Scenario = 1 | 2 | null

export default function ColorBlindnessExperience() {
  const [scenario, setScenario] = useState<Scenario>(null)
  const [gameState, setGameState] = useState<"playing" | "won" | "lost" | "idle">("idle")

  // Timer (Scenario 1)
  const [timeLeft, setTimeLeft] = useState(15)
  const [wires, setWires] = useState<Wire[]>([])

  // Seats (Scenario 2)
  const [seats, setSeats] = useState<Seat[]>([])

  // Shared state
  const [patternsEnabled, setPatternsEnabled] = useState(false)

  // Initialize Scenario 1 (Bomb)
  const initBombGame = () => {
    const newWires: Wire[] = [
      { id: "1", color: "bg-red-600", type: "boom", label: "Red", pattern: "repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)" },
      { id: "2", color: "bg-green-600", type: "safe", label: "Green", pattern: "radial-gradient(circle, #000 2px, transparent 2.5px)" },
      { id: "3", color: "bg-amber-700", type: "boom", label: "Brown", pattern: "linear-gradient(90deg, #000 50%, transparent 50%)" },
      { id: "4", color: "bg-yellow-500", type: "boom", label: "Yellow", pattern: "repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_20px)" },
    ]
    setWires(newWires.sort(() => Math.random() - 0.5))
    setTimeLeft(15)
    setPatternsEnabled(false)
    setGameState("playing")
  }

  // Initialize Scenario 2 (Seats)
  const initSeatsGame = () => {
    const newSeats: Seat[] = []
    const rows = 4
    const cols = 5
    // Ensure there is at least one available seat, mostly booked
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // ~15% chance of being available
        const isAvailable = Math.random() > 0.85
        newSeats.push({
          id: `r${r}c${c}`,
          status: isAvailable ? "available" : "booked",
          row: r,
          col: c
        })
      }
    }
    // Force at least 1 available if none were generated
    if (!newSeats.some(s => s.status === "available")) {
      const randomIndex = Math.floor(Math.random() * newSeats.length)
      newSeats[randomIndex].status = "available"
    }

    setSeats(newSeats)
    setPatternsEnabled(false)
    setGameState("playing")
  }

  // Timer (Only for Scenario 1)
  useEffect(() => {
    if (scenario === 1 && gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (scenario === 1 && timeLeft === 0 && gameState === "playing") {
      setGameState("lost")
    }
  }, [timeLeft, gameState, scenario])

  // Handle Cut (Scenario 1)
  const cutWire = (wire: Wire) => {
    if (gameState !== "playing" || scenario !== 1) return

    if (wire.type === "safe") {
      setGameState("won")
    } else {
      setGameState("lost")
    }
  }

  // Handle Seat Click (Scenario 2)
  const selectSeat = (seat: Seat) => {
    if (gameState !== "playing" || scenario !== 2) return

    if (seat.status === "available") {
      setGameState("won")
    } else {
      setGameState("lost")
    }
  }

  // --- START SCREEN ---
  if (scenario === null) {
    return (
      <main className="min-h-screen bg-[#FDFCF8] text-black relative flex flex-col font-sans selection:bg-wong-orange selection:text-black overflow-hidden">
        <Navbar theme="light" showLogo={true} />

        <div className="flex-1 flex flex-col justify-center py-10 px-6 md:px-24">
          <div className="max-w-5xl mx-auto w-full">
            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/#simulations"
                className="inline-flex items-center gap-2 group border-b-2 border-transparent hover:border-black transition-all pb-1 text-stone-600 hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-widest font-bold">Back to Curriculum</span>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-12 border-b-2 border-black pb-12">
              <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
                Simulation 03 / Color Spectrum
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Color Deficiency.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light mb-8">
                Experience Deuteranopia (Green-Blindness). How much do we rely on color alone to convey critical information?
              </p>
            </div>

            {/* Scenario Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Scenario 1 */}
              <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl flex flex-col justify-between hover:border-black transition-colors group">
                <div>
                  <div className="bg-wong-vermilion/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <Bomb className="w-8 h-8 text-wong-vermilion relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M1: The Wire</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    A bomb is ticking. You have 15 seconds to cut the Green wire. A classic trope that becomes a nightmare without color vision.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    setScenario(1)
                    initBombGame()
                  }}
                  className="w-full bg-black hover:bg-stone-800 text-white border-2 border-transparent hover:border-black px-8 py-6 text-lg font-bold uppercase tracking-wider transition-all flex items-center justify-between group-hover:scale-[1.02]"
                >
                  <span>Play Mission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Scenario 2 */}
              <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl flex flex-col justify-between hover:border-black transition-colors group">
                <div>
                  <div className="bg-wong-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <Ticket className="w-8 h-8 text-wong-teal relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M2: Final Tickets</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Book an available seat for the concert before it sells out. Available seats are green, booked seats are red. Easy, right?
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => {
                    setScenario(2)
                    initSeatsGame()
                  }}
                  className="w-full bg-black hover:bg-stone-800 text-white border-2 border-transparent hover:border-black px-8 py-6 text-lg font-bold uppercase tracking-wider transition-all flex items-center justify-between group-hover:scale-[1.02]"
                >
                  <span>Play Mission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }

  // --- GAME OVERS ---
  if (gameState === "won") {
    return (
      <main className="min-h-screen bg-wong-teal text-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="light" showLogo={true} />
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-wong-teal" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Success!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed text-wong-teal-900">
            Adding patterns, icons, or text labels ensures that color isn't the only way information is conveyed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setGameState("idle")
                setScenario(null)
              }}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Menu
            </Button>
            <Button
              onClick={scenario === 1 ? initBombGame : initSeatsGame}
              className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Play Again
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (gameState === "lost") {
    return (
      <main className="min-h-screen bg-wong-vermilion text-white flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden">
        <Navbar theme="dark" showLogo={true} />
        {/* Explosion Effect BG */}
        <div className="absolute inset-0 bg-red-600 animate-pulse mix-blend-overlay opacity-50 pointer-events-none" />

        <div className="max-w-2xl relative z-10 animate-in zoom-in duration-300">
          <div className="bg-black w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            {scenario === 1 ? <Bomb className="w-12 h-12 text-wong-vermilion" /> : <X className="w-12 h-12 text-wong-vermilion" />}
          </div>
          <h2 className="text-6xl md:text-9xl font-bold mb-6 font-serif tracking-tighter">
            {scenario === 1 ? "BOOM." : "ERROR."}
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed opacity-90">
            {scenario === 1
              ? "You cut the wrong wire. Without patterns/labels, Red and Green looked identical."
              : "That seat is already booked. You couldn't tell the difference because they only used color."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setGameState("idle")
                setScenario(null)
              }}
              className="bg-transparent text-white border-white hover:bg-white hover:text-black border-2 h-14 px-12 text-lg uppercase tracking-wide font-bold shadow-xl"
            >
              Menu
            </Button>
            <Button
              onClick={scenario === 1 ? initBombGame : initSeatsGame}
              className="bg-white text-black hover:bg-stone-200 border-2 border-transparent h-14 px-12 text-lg uppercase tracking-wide font-bold shadow-xl"
            >
              Retry Mission
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION ---
  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      <Navbar theme="light" showLogo={true} />

      {/* CVD SIMULATION FILTER APPLY TO WRAPPER */}
      <div
        className="w-full h-full flex flex-col items-center justify-center relative p-4"
        style={{ filter: patternsEnabled ? "none" : "url('#deuteranopia')" }} // Apply Filter unless Patterns (Access Mode) is ON
      >

        {scenario === 1 ? (
          <>
            <div className="mb-8 md:mb-12 text-center space-y-2">
              <div className="bg-black text-red-500 font-mono text-4xl md:text-6xl font-black tracking-widest px-8 py-4 rounded-xl shadow-2xl border-4 border-stone-800">
                00:{timeLeft.toString().padStart(2, '0')}
              </div>
              <p className="text-stone-500 font-bold uppercase tracking-widest text-sm bg-white/50 inline-block px-4 py-1 rounded-full backdrop-blur">
                Time Remaining
              </p>
            </div>

            {/* Bomb Interface */}
            <div className="bg-stone-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-3xl w-full border-t border-stone-600 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-700 via-stone-500 to-stone-700" />

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center perspective-1000">
                {wires.map((wire, idx) => (
                  <button
                    key={wire.id}
                    onClick={() => cutWire(wire)}
                    className="group/wire relative flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    {/* THE WIRE */}
                    <div className="relative h-48 w-12 md:w-16">
                      {/* Insulator */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),4px_4px_10px_rgba(0,0,0,0.3)] transition-all",
                          wire.color
                        )}
                      >
                        {/* Patterns Overlay */}
                        {patternsEnabled && (
                          <div
                            className="absolute inset-0 opacity-40 mix-blend-overlay"
                            style={{ backgroundImage: wire.pattern, backgroundSize: "20px 20px" }}
                          />
                        )}
                      </div>

                      {/* Copper ends */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-600 rounded" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-600 rounded" />
                    </div>

                    {/* Label (Only visible with patterns enabled) */}
                    <div className={cn(
                      "bg-black/90 text-white text-xs font-bold uppercase py-1 px-3 rounded transition-opacity duration-300",
                      patternsEnabled ? "opacity-100" : "opacity-0"
                    )}>
                      {wire.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 md:mb-12 text-center space-y-2">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-black bg-white/80 p-4 rounded-xl shadow-lg inline-block">
                Select an Available Seat
              </h2>
            </div>

            {/* Seating Grid */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full border border-stone-200">
              {/* Screen / Stage indicator */}
              <div className="w-full h-8 bg-stone-300 rounded-lg mb-12 flex items-center justify-center text-stone-500 font-mono text-sm uppercase tracking-widest font-bold shadow-inner">Stage</div>

              <div className="grid grid-cols-5 gap-4 md:gap-6 w-full justify-items-center">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => selectSeat(seat)}
                    className="group relative flex flex-col items-center transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                  >
                    {/* Sub-container for the chair graphic */}
                    <div className={cn(
                      "w-12 h-14 md:w-16 md:h-20 rounded-t-xl rounded-b-md shadow-md border-2",
                      seat.status === "available" ? "bg-green-500 border-green-600" : "bg-red-500 border-red-600"
                    )}>
                      {/* Pattern/Icon Overlay when Accessibility is ON */}
                      {patternsEnabled && seat.status === "booked" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <X className="w-8 h-8 text-black/60 drop-shadow" strokeWidth={3} />
                        </div>
                      )}
                      {patternsEnabled && seat.status === "available" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white drop-shadow" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className="w-10 h-2 md:w-14 md:h-3 bg-stone-800 rounded-b-xl opacity-20 -mt-1" /> {/* Shadow under seat */}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* CONTROLS (Outside Filter) */}
      <div className="fixed bottom-10 z-50 flex gap-4">
        <Button
          onClick={() => setPatternsEnabled(!patternsEnabled)}
          className={cn(
            "h-14 px-8 rounded-full shadow-xl border-2 uppercase font-bold tracking-wide transition-all",
            patternsEnabled
              ? "bg-wong-blue text-white border-wong-blue hover:bg-blue-700 hover:border-blue-700"
              : "bg-white text-black border-stone-300 hover:border-black hover:bg-stone-50"
          )}
        >
          {patternsEnabled ? (
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Accessibility ON (Real Color)</span>
          ) : (
            <span className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Accessibility OFF (Simulated)</span>
          )}
        </Button>
      </div>

      {/* SVG Filter Definition (Deuteranopia) */}
      {/* 
         This matrix simulates Deuteranopia (Green-Blindness).
         R stays R roughly.
         G is lost/merged into R/B.
       */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

    </main>
  )
}
