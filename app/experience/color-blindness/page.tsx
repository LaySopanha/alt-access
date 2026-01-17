"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, CheckCircle2, Bomb, AlertTriangle, RefreshCcw } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Wire Type
type Wire = {
  id: string
  color: string // Tailwind class for color
  type: "safe" | "danger" | "boom"
  label: string // For barrier-free mode
  pattern: string // CSS pattern class
}

export default function ColorBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [gameState, setGameState] = useState<"playing" | "won" | "lost" | "idle">("idle")
  const [timeLeft, setTimeLeft] = useState(15)
  const [patternsEnabled, setPatternsEnabled] = useState(false)
  const [wires, setWires] = useState<Wire[]>([])

  // Initialize Game
  const initGame = () => {
    // We need wires that look confusing in Deuteranopia
    // Red and Green look very similar (yellowish-brown)
    const newWires: Wire[] = [
      { id: "1", color: "bg-red-600", type: "boom", label: "Red", pattern: "repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)" },
      { id: "2", color: "bg-green-600", type: "safe", label: "Green", pattern: "radial-gradient(circle, #000 2px, transparent 2.5px)" },
      { id: "3", color: "bg-amber-700", type: "boom", label: "Brown", pattern: "linear-gradient(90deg, #000 50%, transparent 50%)" },
      { id: "4", color: "bg-yellow-500", type: "boom", label: "Yellow", pattern: "repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_20px)" },
    ]
    // Shuffle
    setWires(newWires.sort(() => Math.random() - 0.5))
    setTimeLeft(15)
    setPatternsEnabled(false)
    setGameState("playing")
  }

  // Timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("lost")
    }
  }, [timeLeft, gameState])

  // Handle Cut
  const cutWire = (wire: Wire) => {
    if (gameState !== "playing") return

    if (wire.type === "safe") {
      setGameState("won")
    } else {
      setGameState("lost")
    }
  }

  // --- START SCREEN ---
  if (!started) {
    return (
      <main className="min-h-screen bg-[#FDFCF8] text-black relative flex flex-col font-sans selection:bg-wong-orange selection:text-black overflow-hidden">
        <Navbar theme="light" showLogo={true} />

        <div className="flex-1 flex flex-col justify-center py-10 px-6 md:px-24">
          <div className="max-w-4xl mx-auto w-full">
            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/#chapter-5"
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
                Experience Deuteranopia (Green-Blindness). Can you trust your eyes when safety is on the line?
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <p className="text-lg leading-relaxed">A bomb is ticking. You have 15 seconds.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <p className="text-lg leading-relaxed">Instructions: <span className="font-bold underline">"Cut the GREEN wire"</span>.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <p className="text-lg leading-relaxed">Be careful. The other wires will cause an explosion.</p>
                </div>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-wong-vermilion/10 border-l-4 border-wong-vermilion p-6 mb-12 rounded-r-lg">
              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Did you know?
              </h3>
              <p className="text-stone-700 italic">
                "Approximately <strong>8% of men</strong> have Color Vision Deficiency. Relying solely on 'Red for Stop' and 'Green for Go' is a critical accessibility failure."
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setStarted(true)
                initGame()
              }}
              className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
            >
              <span>Start Mission</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
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
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Defused!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed text-wong-teal-900">
            You found the safe wire. Adding patterns or labels makes color irrelevant for safety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={initGame}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Play Again
            </Button>
            <Link href="/success">
              <Button className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold">
                Finish Course
              </Button>
            </Link>
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
            <Bomb className="w-12 h-12 text-wong-vermilion" />
          </div>
          <h2 className="text-6xl md:text-9xl font-bold mb-6 font-serif tracking-tighter">BOOM.</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed opacity-90">
            You cut the wrong wire. Without patterns/labels, Red and Green looked identical.
          </p>
          <Button
            onClick={initGame}
            className="bg-white text-black hover:bg-stone-200 border-2 border-transparent h-14 px-12 text-lg uppercase tracking-wide font-bold shadow-xl"
          >
            Retry Mission
          </Button>
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
        style={{ filter: "url('#deuteranopia')" }} // Apply Filter
      >

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

      </div>

      {/* CONTROLS (Outside Filter) */}
      <div className="fixed bottom-10 z-50 flex gap-4">
        <Button
          onClick={() => setPatternsEnabled(!patternsEnabled)}
          className={cn(
            "h-14 px-8 rounded-full shadow-xl border-2 uppercase font-bold tracking-wide transition-all",
            patternsEnabled
              ? "bg-wong-blue text-white border-wong-blue hover:bg-wong-blue/90"
              : "bg-white text-black border-stone-300 hover:border-black"
          )}
        >
          {patternsEnabled ? (
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Patterns ON</span>
          ) : (
            <span className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Accessibility OFF</span>
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
