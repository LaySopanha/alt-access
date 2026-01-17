"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, CheckCircle2, Folder, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Game Item Type
type FileItem = {
  id: string
  name: string
  isTarget: boolean
  color: string
}

export default function LowVisionExperience() {
  const [started, setStarted] = useState(false)
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
    if (started && !success) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [started, success])

  const handleItemClick = (item: FileItem) => {
    if (item.isTarget) {
      setSuccess(true)
    } else {
      // Small shake or feedback could be added here
      // alert("Wrong file. Keep looking.") 
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
                Simulation 02 / Field Loss
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Low Vision.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light mb-8">
                Experience severe Myopia (nearsightedness) or Tunnel Vision.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <p className="text-lg leading-relaxed">Search the grid of files.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <p className="text-lg leading-relaxed">Move your mouse to <strong>focus</strong> on specific areas.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <p className="text-lg leading-relaxed">Find and click the file named <strong>"Project AltAccess"</strong>.</p>
                </div>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-wong-teal/10 border-l-4 border-wong-teal p-6 mb-12 rounded-r-lg">
              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Did you know?
              </h3>
              <p className="text-stone-700 italic">
                "Users with tunnel vision often experience <strong>visual fatigue</strong> quickly because their brain has to constantly piece together small fragments of visual information to build a complete picture."
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
            >
              <span>Start Search</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
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
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Found it!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed text-wong-teal-900">
            You pieced it together. But imagine doing that for every single link on a webpage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setSuccess(false)
                setStarted(false)
              }}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Try Again
            </Button>
            <Link href="/experience/color-blindness">
              <Button className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold">
                Next Lesson
              </Button>
            </Link>
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
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-6 py-2 rounded-full backdrop-blur-md pointer-events-none">
        <p className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <Search className="w-4 h-4" />
          Find: "Project AltAccess"
        </p>
      </div>

      {/* 
         LAYER 1: BLURRED (Underneath)
         This layer is always fully visible but heavily blurred.
      */}
      <div className="absolute inset-0 flex items-center justify-center p-12 filter blur-[20px] opacity-100 transition-all duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
          {items.map((item) => (
            <div key={`blur-${item.id}`} className={cn("aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-4 shadow-sm", item.color)}>
              <Folder className="w-16 h-16 text-black/50" />
              <span className="font-bold text-xl text-black/50">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 
         LAYER 2: SHARP (On Top)
         This layer is identical but sharp. It is MASKED so it only shows around the mouse.
      */}
      <div
        className="absolute inset-0 flex items-center justify-center p-12 pointer-events-auto"
        style={{
          maskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent) `,
          WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent)`,
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
          {items.map((item) => (
            <button
              key={`sharp-${item.id}`}
              onClick={() => handleItemClick(item)}
              className={cn(
                "aspect-[4/3] rounded-xl flex flex-col items-center justify-center gap-4 shadow-2xl transform transition-transform hover:scale-105 active:scale-95 cursor-none",
                item.color,
                "border-2 border-transparent hover:border-black"
              )}
            >
              <Folder className="w-16 h-16 text-black" />
              <span className="font-bold text-xl text-black">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

    </main>
  )
}
