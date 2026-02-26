"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

type DeficiencyType = "deuteranopia" | "protanopia" | "tritanopia"

export default function ColorBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [gameState, setGameState] = useState<"playing" | "won" | "lost" | "idle">("idle")
  const [timeLeft, setTimeLeft] = useState(15)
  const [patternsEnabled, setPatternsEnabled] = useState(false)
  const [wires, setWires] = useState<Wire[]>([])
  const [deficiencyType, setDeficiencyType] = useState<DeficiencyType>("deuteranopia")
  const [targetLabel, setTargetLabel] = useState("Target: Green")
  const [targetColor, setTargetColor] = useState("bg-green-500")

  const router = useRouter()

  // Initialize Game based on Deficiency Type
  const initGame = (type: DeficiencyType = deficiencyType) => {
    let newWires: Wire[] = []

    if (type === "deuteranopia") {
      newWires = [
        { id: "1", color: "stroke-[#DC2626]", type: "boom", label: "Red", pattern: "url(#red-pattern)" },
        { id: "2", color: "stroke-[#16A34A]", type: "safe", label: "Green", pattern: "url(#green-pattern)" },
        { id: "3", color: "stroke-[#B45309]", type: "boom", label: "Brown", pattern: "url(#brown-pattern)" },
        { id: "4", color: "stroke-[#EAB308]", type: "boom", label: "Yellow", pattern: "url(#yellow-pattern)" },
      ]
      setTargetLabel("Target: Green")
      setTargetColor("bg-green-500")
    } else if (type === "protanopia") {
      // Protanopia (Red-blind). Deep red vs dark green confusion.
      newWires = [
        { id: "1", color: "stroke-[#991B1B]", type: "boom", label: "Dark Red", pattern: "url(#red-pattern)" },
        { id: "2", color: "stroke-[#166534]", type: "boom", label: "Dark Green", pattern: "url(#green-pattern)" },
        { id: "3", color: "stroke-[#C2410C]", type: "safe", label: "Orange", pattern: "url(#brown-pattern)" }, // Target
        { id: "4", color: "stroke-[#B45309]", type: "boom", label: "Brown", pattern: "url(#yellow-pattern)" },
        { id: "5", color: "stroke-[#F59E0B]", type: "boom", label: "Amber", pattern: "url(#red-pattern)" },
      ]
      setTargetLabel("Target: Orange")
      setTargetColor("bg-[#C2410C]")
    } else if (type === "tritanopia") {
      // Tritanopia (Blue-blind). Blue vs Green confusion, Yellow vs Pink/Grey.
      newWires = [
        { id: "1", color: "stroke-[#2563EB]", type: "boom", label: "Blue", pattern: "url(#red-pattern)" },
        { id: "2", color: "stroke-[#059669]", type: "boom", label: "Emerald", pattern: "url(#green-pattern)" },
        { id: "3", color: "stroke-[#EAB308]", type: "safe", label: "Yellow", pattern: "url(#yellow-pattern)" }, // Target
        { id: "4", color: "stroke-[#EC4899]", type: "boom", label: "Pink", pattern: "url(#brown-pattern)" },
        { id: "5", color: "stroke-[#9CA3AF]", type: "boom", label: "Grey", pattern: "url(#red-pattern)" },
        { id: "6", color: "stroke-[#3B82F6]", type: "boom", label: "Light Blue", pattern: "url(#green-pattern)" },
      ]
      setTargetLabel("Target: Yellow")
      setTargetColor("bg-yellow-500")
    }

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

  // Setup game on initial mount so it's ready behind the overlay
  useEffect(() => {
    if (wires.length === 0) {
      initGame(deficiencyType);
    }
  }, []);

  // --- GAME OVERS ---
  if (gameState === "won") {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="dark" showLogo={false} gameMode={true} />

        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000 zoom-in-95 ease-out">
          <div className="mb-12">
            <CheckCircle2 className="w-20 h-20 text-white/90 mx-auto" strokeWidth={1} />
          </div>

          <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Defused.
          </h2>

          <p className="text-xl md:text-3xl font-light mb-16 max-w-2xl mx-auto leading-relaxed text-stone-300">
            You found the safe wire. Adding patterns or labels makes color completely irrelevant for safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Button
              onClick={() => initGame(deficiencyType)}
              variant="outline"
              className="border-stone-700 bg-transparent text-white hover:bg-white hover:text-black h-16 px-10 text-lg uppercase tracking-widest font-bold transition-all"
            >
              Play Again
            </Button>
            <Link href="/success">
              <Button className="bg-white text-black hover:bg-stone-200 h-16 px-10 text-lg uppercase tracking-widest font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
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
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden">
        <Navbar theme="dark" showLogo={false} gameMode={true} />
        {/* Explosion Effect BG */}
        <div className="absolute inset-0 bg-red-600 animate-in fade-in fade-out duration-[2000ms] mix-blend-overlay opacity-30 pointer-events-none" />

        <div className="max-w-3xl relative z-10 animate-in zoom-in-90 duration-500 ease-out">
          <div className="mb-12">
            <Bomb className="w-20 h-20 text-red-500 mx-auto" strokeWidth={1} />
          </div>

          <h2 className="text-7xl md:text-9xl font-bold mb-8 font-serif tracking-tighter text-red-500">
            BOOM.
          </h2>

          <p className="text-xl md:text-3xl font-light mb-16 max-w-2xl mx-auto leading-relaxed text-stone-300">
            You cut the wrong wire. Without patterns or labels, <span className="font-bold underline text-white">Red and Green looked identical</span> through their eyes.
          </p>

          <Button
            onClick={() => initGame(deficiencyType)}
            variant="outline"
            className="border-stone-700 bg-transparent text-white hover:bg-white hover:text-black h-16 px-12 text-lg uppercase tracking-widest font-bold transition-all shadow-xl"
          >
            Retry Mission
          </Button>
        </div>
      </main>
    )
  }
  {/* --- ACTIVE SIMULATION --- */ }
  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center relative overflow-hidden font-sans select-none">
      <Navbar theme="light" showLogo={false} gameMode={true} />



      {/* BACK BUTTON (In Game) */}
      <button
        onClick={() => {
          // Native browser back maintains scroll position beautifully
          if (window.history.length > 2) {
            router.back()
          } else {
            router.push('/#chapter-5')
          }
        }}
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 group px-5 py-2.5 bg-white text-black hover:bg-stone-200 rounded-full font-mono text-lg uppercase tracking-widest font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer"
        title="Go Back"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>BACK</span>
      </button>

      {/* CVD SIMULATION FILTER APPLY TO WRAPPER */}
      <div
        className="w-full h-full flex flex-col items-center justify-center relative p-4 max-w-4xl mx-auto"
        style={{ filter: patternsEnabled ? "none" : `url('#${deficiencyType}')` }} // Apply Filter dynamically
      >
        {/* SVG Defs for wire patterns */}
        <svg className="w-0 h-0 absolute pointer-events-none">
          <defs>
            <pattern id="red-pattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="6" />
            </pattern>
            <pattern id="green-pattern" patternUnits="userSpaceOnUse" width="12" height="12">
              <circle cx="6" cy="6" r="3" fill="#000" />
            </pattern>
            <pattern id="brown-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
              <rect width="10" height="5" fill="#000" />
            </pattern>
            <pattern id="yellow-pattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#000" strokeWidth="6" />
            </pattern>
          </defs>
        </svg>

        {/* Bomb Timer & Display */}
        <div className="mb-4 md:mb-8 text-center space-y-2 relative z-10 w-full max-w-md mx-auto bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl border-4 border-[#333] flex flex-col items-center">
          {/* Screws */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-stone-500 flex items-center justify-center"><div className="w-2 h-0.5 bg-stone-800 rotate-45" /></div>
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-stone-500 flex items-center justify-center"><div className="w-2 h-0.5 bg-stone-800 rotate-12" /></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-stone-500 flex items-center justify-center"><div className="w-2 h-0.5 bg-stone-800 -rotate-45" /></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-stone-500 flex items-center justify-center"><div className="w-2 h-0.5 bg-stone-800 rotate-90" /></div>

          <div className="bg-[#050505] text-[#FF2A2A] font-mono text-6xl md:text-8xl font-black tracking-widest px-8 py-4 rounded-xl shadow-[inset_0_4px_20px_rgba(0,0,0,1)] border-2 border-[#111] leading-none mb-4 w-full text-center" style={{ textShadow: "0 0 15px rgba(255,42,42,0.6)" }}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 bg-[#222] border-2 border-stone-800 rounded px-4 py-2 text-[#4ADE80] font-mono text-sm uppercase tracking-widest text-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              {targetLabel}
            </div>
            <div className="w-4 h-4 rounded-full bg-red-600 mt-2 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" />
          </div>
        </div>

        {/* Inline Objective (Between Timer and Wires) */}
        {started && gameState === "playing" && (
          <div className="mb-8 z-20 relative bg-[#1A1A1A] border-4 border-[#333] shadow-[8px_8px_0_rgba(0,0,0,0.8)] rounded-xl py-3 px-6 text-white text-center max-w-md w-full mx-auto">
            <p className="text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FEF08A]" /> Objective: Cut the <span className={cn("inline-block px-2 py-0.5 rounded text-black", targetColor)}>{targetLabel.replace('Target: ', '')}</span> Wire
            </p>
          </div>
        )}

        {/* Dynamic SVG Bomb Chassis */}
        <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 -mt-8 perspective-1000 z-0 drop-shadow-2xl">
          <svg viewBox="0 0 800 400" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            {/* Deuteranopia Layout (4 wires, standard rectangular) */}
            {deficiencyType === "deuteranopia" && (
              <>
                <rect x="50" y="50" width="700" height="300" rx="20" fill="#292524" stroke="#1C1917" strokeWidth="8" />
                <rect x="60" y="60" width="680" height="280" rx="12" fill="none" stroke="#44403C" strokeWidth="2" />
                <rect x="80" y="80" width="640" height="240" rx="8" fill="#1C1917" />
                {wires.map((wire, index) => {
                  const spacing = 640 / (wires.length + 1)
                  const startX = 80 + spacing * (index + 1)
                  const endX = 80 + spacing * (((index + 1) % wires.length) + 1)
                  const pathD = `M ${startX} 80 C ${startX} 160, ${endX} 240, ${endX} 320`
                  return <WirePath key={wire.id} wire={wire} pathD={pathD} startX={startX} endX={endX} cutWire={cutWire} patternsEnabled={patternsEnabled} />
                })}
              </>
            )}

            {/* Protanopia Layout (5 wires, angled/sweeping) */}
            {deficiencyType === "protanopia" && (
              <>
                <path d="M 50 100 L 750 50 L 700 350 L 100 300 Z" fill="#292524" stroke="#1C1917" strokeWidth="8" className="drop-shadow-lg" />
                <path d="M 60 110 L 730 65 L 685 330 L 110 285 Z" fill="none" stroke="#44403C" strokeWidth="2" />
                <path d="M 80 120 L 710 80 L 670 310 L 120 270 Z" fill="#1C1917" />
                {wires.map((wire, index) => {
                  const xOffsets = [150, 270, 390, 510, 630] // Predefined spread
                  const startX = xOffsets[index]
                  const startY = 115 - (index * 8) // Angle match top
                  const endX = xOffsets[(index + 2) % 5] - 20
                  const endY = 275 + (index * 7) // Angle match bottom
                  const pathD = `M ${startX} ${startY} C ${startX - 50} 200, ${endX + 50} 200, ${endX} ${endY}`
                  return <WirePath key={wire.id} wire={wire} pathD={pathD} startX={startX} startTop={startY} endX={endX} endBottom={endY} cutWire={cutWire} patternsEnabled={patternsEnabled} />
                })}
              </>
            )}

            {/* Tritanopia Layout (6 wires, circular/bomb core style) */}
            {deficiencyType === "tritanopia" && (
              <>
                <circle cx="400" cy="200" r="160" fill="#292524" stroke="#1C1917" strokeWidth="8" className="drop-shadow-2xl" />
                <circle cx="400" cy="200" r="148" fill="none" stroke="#44403C" strokeWidth="2" />
                <circle cx="400" cy="200" r="130" fill="#1C1917" />
                {/* Center Core */}
                <circle cx="400" cy="200" r="40" fill="#111" stroke="#333" strokeWidth="4" />
                {wires.map((wire, index) => {
                  const angle = (index * 60) * (Math.PI / 180)
                  const startR = 130
                  const endR = 40
                  const startX = 400 + Math.cos(angle) * startR
                  const startY = 200 + Math.sin(angle) * startR
                  // Re-route to completely opposite side of core for tangles
                  const oppositeAngle = ((index + 3) * 60) * (Math.PI / 180)
                  const endX = 400 + Math.cos(oppositeAngle) * endR
                  const endY = 200 + Math.sin(oppositeAngle) * endR

                  // Swirling bezier control points
                  const cp1X = 400 + Math.cos(angle + 1) * 80
                  const cp1Y = 200 + Math.sin(angle + 1) * 80

                  const pathD = `M ${startX} ${startY} Q ${cp1X} ${cp1Y}, ${endX} ${endY}`
                  return <WirePath key={wire.id} wire={wire} pathD={pathD} startX={startX} startTop={startY} endX={endX} endBottom={endY} cutWire={cutWire} patternsEnabled={patternsEnabled} hideBlocks={true} />
                })}
              </>
            )}
          </svg>
        </div>

      </div>

      {/* --- START OVERLAY --- */}
      {
        !started && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl w-full flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
                Color Deficiency
              </h1>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-md">
                A bomb is ticking. Can you trust your eyes to find the safe green wire when the colors begin to merge?
              </p>
              <Button
                onClick={() => {
                  setStarted(true)
                  if (wires.length > 0) {
                    setGameState("playing") // Resume immediately if already initialized
                  } else {
                    initGame(deficiencyType)
                  }
                }}
                className="bg-black text-white hover:bg-stone-800 h-14 px-12 text-lg uppercase tracking-wider font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                Start Defusal
              </Button>

              <p className="text-sm text-stone-400 mt-6 max-w-sm italic">
                "Approximately 8% of men have Color Vision Deficiency. Relying solely on color is a critical accessibility failure."
              </p>
            </div>
          </div>
        )
      }

      {/* CONTROLS (Outside Filter) */}
      <div className="fixed bottom-10 z-50 flex flex-col md:flex-row gap-4 items-center">
        {/* Color Blindness Extent Picker */}
        <div className="flex bg-white rounded-full shadow-lg border border-stone-200 p-1">
          <button
            onClick={() => { setDeficiencyType("deuteranopia"); initGame("deuteranopia"); }}
            className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all", deficiencyType === "deuteranopia" ? "bg-black text-white" : "hover:bg-stone-100 text-stone-600")}
          >
            Deuteranopia (Red/Green)
          </button>
          <button
            onClick={() => { setDeficiencyType("protanopia"); initGame("protanopia"); }}
            className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all", deficiencyType === "protanopia" ? "bg-black text-white" : "hover:bg-stone-100 text-stone-600")}
          >
            Protanopia (Red/Green)
          </button>
          <button
            onClick={() => { setDeficiencyType("tritanopia"); initGame("tritanopia"); }}
            className={cn("px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all", deficiencyType === "tritanopia" ? "bg-black text-white" : "hover:bg-stone-100 text-stone-600")}
          >
            Tritanopia (Blue/Yellow)
          </button>
        </div>

        {/* Accessibility Toggle */}
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

      {/* SVG Filter Definition (Color Blindness Matrices) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" />
          </filter>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
    </main>
  )
}

// Helper component for drawing a wire consistently
function WirePath({ wire, pathD, startX, startTop = 80, endX, endBottom = 320, cutWire, patternsEnabled, hideBlocks = false }: any) {
  return (
    <g className="group/wire cursor-crosshair" onClick={() => cutWire(wire)}>
      {/* Top Connection Block */}
      {!hideBlocks && (
        <>
          <path d={`M ${startX - 15} ${startTop - 15} L ${startX + 15} ${startTop - 15} L ${startX + 15} ${startTop + 5} L ${startX - 15} ${startTop + 5} Z`} fill="#A16207" />
          <circle cx={startX} cy={startTop - 5} r="4" fill="#FEF08A" />
        </>
      )}

      {/* Background shadow for realistic depth */}
      <path d={pathD} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="18" className="transform translate-y-2 blur-[2px]" />

      {/* Main Wire - Using standard stroke class for specific colors */}
      <path d={pathD} fill="none" strokeWidth="16" className={cn("transition-all duration-200 group-hover/wire:-translate-y-1 group-hover/wire:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]", wire.color)} />

      {/* Highlight line to give 3D gloss to the wire */}
      <path d={pathD} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 6" className="pointer-events-none transform -translate-x-1" />

      {/* Active Pattern Overlay */}
      {patternsEnabled && (
        <path d={pathD} fill="none" stroke={wire.pattern} strokeWidth="16" className="pointer-events-none transition-all duration-200 group-hover/wire:-translate-y-1" />
      )}

      {/* Accessibility Label attached to wire curve roughly halfway */}
      {patternsEnabled && (
        <g className="pointer-events-none transition-all duration-200" transform={`translate(${(startX + endX) / 2}, ${(startTop + endBottom) / 2})`}>
          <rect x="-24" y="-12" width="48" height="24" rx="4" fill="rgba(0,0,0,0.8)" stroke="#444" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="white" className="font-sans font-bold text-[10px] uppercase tracking-wider">{wire.label}</text>
        </g>
      )}

      {/* Bottom Connection Block */}
      {!hideBlocks && (
        <>
          <path d={`M ${endX - 15} ${endBottom - 5} L ${endX + 15} ${endBottom - 5} L ${endX + 15} ${endBottom + 15} L ${endX - 15} ${endBottom + 15} Z`} fill="#A16207" />
          <circle cx={endX} cy={endBottom + 5} r="4" fill="#FEF08A" />
        </>
      )}

      {/* Hitbox area (larger invisible path for easier clicking) */}
      <path d={pathD} fill="none" stroke="transparent" strokeWidth="40" className="opacity-0" />
    </g>
  )
}
