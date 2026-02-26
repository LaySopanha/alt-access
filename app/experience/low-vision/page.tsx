"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, CheckCircle2, Folder, Search, FileText, Settings, X, ShieldAlert } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Game Item Type (Scenario 1)
type FileItem = {
  id: string
  name: string
  isTarget: boolean
  color: string
}

// Scenarios
type Scenario = 1 | 2 | null

export default function LowVisionExperience() {
  const [scenario, setScenario] = useState<Scenario>(null)
  const [success, setSuccess] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Generate Items (Static for consistency)
  const [items] = useState<FileItem[]>([
    { id: "1", name: "Tax Returns 2023", isTarget: false, color: "bg-blue-100" },
    { id: "2", name: "Holiday Photos", isTarget: false, color: "bg-yellow-100" },
    { id: "3", name: "Project Alpha", isTarget: false, color: "bg-red-100" },
    { id: "4", name: "Medical Records", isTarget: false, color: "bg-green-100" },
    { id: "5", name: "Project Beta", isTarget: false, color: "bg-purple-100" },
    { id: "6", name: "Project AltAccess", isTarget: true, color: "bg-wong-orange" }, // Target
    { id: "7", name: "Invoice #9921", isTarget: false, color: "bg-gray-100" },
    { id: "8", name: "Design Assets", isTarget: false, color: "bg-pink-100" },
    { id: "9", name: "Legal Docs", isTarget: false, color: "bg-indigo-100" },
    { id: "10", name: "Meeting Notes", isTarget: false, color: "bg-orange-100" },
    { id: "11", name: "Budget Q1", isTarget: false, color: "bg-teal-100" },
    { id: "12", name: "User Research", isTarget: false, color: "bg-cyan-100" },
    { id: "13", name: "Project Delta", isTarget: false, color: "bg-emerald-100" },
    { id: "14", name: "Project Gamma", isTarget: false, color: "bg-rose-100" },
    { id: "15", name: "Client List", isTarget: false, color: "bg-sky-100" },
    { id: "16", name: "Annual Report", isTarget: false, color: "bg-amber-100" },
  ])

  // Mouse Tracking
  useEffect(() => {
    if (scenario !== null && !success) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [scenario, success])

  const handleItemClick = (item: FileItem) => {
    if (item.isTarget) {
      setSuccess(true)
    } else {
      // Small shake or feedback could be added here
      // alert("Wrong file. Keep looking.") 
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
                Simulation 02 / Field Loss
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Low Vision.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light mb-8">
                Experience severe Myopia (nearsightedness) or Tunnel Vision. How hard is it to find what you're looking for?
              </p>
            </div>

            {/* Scenario Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Scenario 1 */}
              <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl flex flex-col justify-between hover:border-black transition-colors group">
                <div>
                  <div className="bg-wong-teal/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <Search className="w-8 h-8 text-wong-teal relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M1: The Folder Grid</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Search a grid of blurred files for "Project AltAccess". Move your mouse to focus on specific areas.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setScenario(1)}
                  className="w-full bg-black hover:bg-stone-800 text-white border-2 border-transparent hover:border-black px-8 py-6 text-lg font-bold uppercase tracking-wider transition-all flex items-center justify-between group-hover:scale-[1.02]"
                >
                  <span>Play Mission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Scenario 2 */}
              <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl flex flex-col justify-between hover:border-black transition-colors group">
                <div>
                  <div className="bg-wong-orange/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <ShieldAlert className="w-8 h-8 text-wong-orange relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M2: Unsubscribe Trap</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Try to cancel your recurring subscription on a settings page designed with poor contrast and deceptive layouts.
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setScenario(2)}
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

  // --- SUCCESS SCREEN ---
  if (success) {
    return (
      <main className="min-h-screen bg-wong-teal text-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="light" showLogo={true} />
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-wong-teal" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Success!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed text-wong-teal-900">
            {scenario === 1
              ? "You pieced it together. But imagine doing that for every single link on a webpage."
              : "You found the hidden button. Low contrast text is one of the most common accessibility failures on the web."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setSuccess(false)
                setScenario(null)
              }}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Menu
            </Button>
            <Button
              onClick={() => setSuccess(false)}
              className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Play Again
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION ---
  return (
    <main className="min-h-screen bg-stone-200 relative overflow-hidden font-sans cursor-none select-none">
      <Navbar theme="light" showLogo={true} />

      {/* Target Hint Overlay */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-6 py-2 rounded-full backdrop-blur-md pointer-events-none shadow-xl">
        <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          {scenario === 1 ? (
            <><Search className="w-4 h-4" /> Find: "Project AltAccess"</>
          ) : (
            <><Search className="w-4 h-4" /> Goal: Cancel Subscription</>
          )}
        </p>
      </div>

      {/* 
         LAYER 1: BLURRED (Underneath)
         This layer is always fully visible but heavily blurred.
      */}
      <div className="absolute inset-0 flex items-center justify-center p-8 filter blur-[20px] opacity-100 transition-all duration-300">
        {scenario === 1 ? <GameOneContent items={items} onFocus={() => { }} /> : <GameTwoContent onFocus={() => { }} />}
      </div>

      {/* 
         LAYER 2: SHARP (On Top)
         This layer is identical but sharp. It is MASKED so it only shows around the mouse.
      */}
      <div
        className="absolute inset-0 flex items-center justify-center p-8 pointer-events-auto"
        style={{
          maskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent) `,
          WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent)`,
        }}
      >
        {scenario === 1 ? (
          <GameOneContent items={items} onFocus={handleItemClick} isInteractive />
        ) : (
          <GameTwoContent onFocus={() => setSuccess(true)} isInteractive />
        )}
      </div>

    </main>
  )
}

// --- SUBCOMPONENTS FOR SCENARIOS --- 

function GameOneContent({ items, onFocus, isInteractive = false }: { items: FileItem[], onFocus: (item: FileItem) => void, isInteractive?: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onFocus(item)}
          className={cn(
            "aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-4 shadow-sm",
            item.color,
            isInteractive ? "border-2 border-transparent hover:border-black cursor-none hover:scale-105 transition-transform" : ""
          )}
          disabled={!isInteractive}
        >
          <Folder className={cn("w-16 h-16", isInteractive ? "text-black" : "text-black/50")} />
          <span className={cn("font-bold text-xl", isInteractive ? "text-black" : "text-black/50")}>{item.name}</span>
        </button>
      ))}
    </div>
  )
}

function GameTwoContent({ onFocus, isInteractive = false }: { onFocus: () => void, isInteractive?: boolean }) {
  return (
    <div className="w-full max-w-4xl bg-white min-h-[600px] border border-stone-200 p-12 flex flex-col shadow-xl">

      {/* Fake Webpage Header */}
      <div className="border-b border-stone-200 pb-8 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-serif font-bold text-black mb-2">Account Settings</h1>
          <p className="text-stone-500 text-lg">Manage your premium membership</p>
        </div>
        <Settings className="w-8 h-8 text-stone-300" />
      </div>

      {/* Good visual contrast area (distraction) */}
      <div className="bg-wong-blue/10 border border-wong-blue/20 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">Premium Plan (Active)</h2>
        <p className="text-black/80 mb-6 text-lg">Next billing date: <strong>October 15, 2025</strong> ($99.99/mo)</p>
        <button className="bg-black text-white px-8 py-4 font-bold rounded hover:bg-stone-800 transition-colors cursor-none text-lg">
          Upgrade to Platinum Level
        </button>
      </div>

      {/* Lots of text to scan through */}
      <div className="space-y-6 mb-12 flex-1">
        <h3 className="text-xl font-bold border-b pb-2">Billing History</h3>
        <div className="flex justify-between py-4 border-b border-stone-100 text-black/70">
          <span>Sept 15, 2025</span>
          <span>$99.99</span>
          <span className="text-green-600 font-bold">Paid</span>
        </div>
        <div className="flex justify-between py-4 border-b border-stone-100 text-black/70">
          <span>Aug 15, 2025</span>
          <span>$99.99</span>
          <span className="text-green-600 font-bold">Paid</span>
        </div>
        <div className="flex justify-between py-4 text-black/70">
          <span>Jul 15, 2025</span>
          <span>$99.99</span>
          <span className="text-green-600 font-bold">Paid</span>
        </div>
      </div>

      {/* The trap: Very low contrast text, positioned far away from the relevant section */}
      <div className="mt-auto pt-12 border-t border-stone-100 text-right">
        <p className="text-[#E5E7EB] text-xs">
          If you wish to terminate your agreement please{" "}
          <button
            onClick={() => { if (isInteractive) onFocus() }}
            disabled={!isInteractive}
            className="underline hover:text-[#D1D5DB] cursor-none"
          >
            click here
          </button>{" "}
          to proceed. Note that this cannot be undone.
        </p>
      </div>

    </div>
  )
}
