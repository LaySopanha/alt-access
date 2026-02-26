"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Folder, Search, MousePointer2, Settings, HardDrive, Monitor, Image as ImageIcon, FileText, File } from "lucide-react"
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
  const [hasStarted, setHasStarted] = useState(false) // True when passed overlay
  const [success, setSuccess] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate Items (Static for consistency)
  const [items] = useState<FileItem[]>([
    { id: "1", name: "Tax Returns 2023", isTarget: false, color: "text-blue-500" },
    { id: "2", name: "Holiday Photos", isTarget: false, color: "text-yellow-500" },
    { id: "3", name: "Project Alpha", isTarget: false, color: "text-red-500" },
    { id: "4", name: "Medical Records", isTarget: false, color: "text-green-500" },
    { id: "5", name: "Project Beta", isTarget: false, color: "text-purple-500" },
    { id: "7", name: "Invoice #9921", isTarget: false, color: "text-gray-500" },
    { id: "8", name: "Design Assets", isTarget: false, color: "text-pink-500" },
    { id: "9", name: "Legal Docs", isTarget: false, color: "text-indigo-500" },
    { id: "10", name: "Meeting Notes", isTarget: false, color: "text-orange-500" },
    { id: "11", name: "Budget Q1", isTarget: false, color: "text-teal-500" },
    { id: "12", name: "User Research", isTarget: false, color: "text-cyan-500" },
    { id: "6", name: "Project AltAccess", isTarget: true, color: "text-wong-orange" }, // Target
    { id: "13", name: "Project Delta", isTarget: false, color: "text-emerald-500" },
    { id: "14", name: "Project Gamma", isTarget: false, color: "text-rose-500" },
    { id: "15", name: "Client List", isTarget: false, color: "text-sky-500" },
    { id: "16", name: "Annual Report", isTarget: false, color: "text-amber-500" },
    { id: "17", name: "Q4 Presentation", isTarget: false, color: "text-blue-600" },
    { id: "18", name: "Passwords.txt", isTarget: false, color: "text-gray-400" },
    { id: "19", name: "Marketing Plan", isTarget: false, color: "text-purple-400" },
    { id: "20", name: "Team Retreat", isTarget: false, color: "text-green-400" },
  ])

  // Mouse Tracking
  useEffect(() => {
    if (hasStarted && !success) {
      const handleMouseMove = (e: MouseEvent) => {
        // Adjust mouse position relative to container for precise masking
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          })
        }
      }
      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [hasStarted, success])

  const handleItemClick = (item: FileItem) => {
    if (item.isTarget) {
      setSuccess(true)
    }
  }

  // --- NATIVE SVG BLACKOUT OVERLAY ---
  const NativeBlackoutOverlay = () => {
    if (!hasStarted || success) return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 transition-opacity duration-500">
        <defs>
          {/* Radial gradient: perfectly clear in the center, getting darker and tearing into patches at the edge */}
          <radialGradient id="hole-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="25%" stopColor="black" />
            <stop offset="95%" stopColor="white" />
          </radialGradient>

          <filter id="macular-degeneration" x="-50%" y="-50%" width="200%" height="200%">
            {/* 1. Generate very large, slow-moving blotchy noise */}
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="largeNoise" />

            {/* 2. Generate smaller noise for edges */}
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="fineNoise" />

            {/* 3. Blend them together so big blobs have rough edges */}
            <feBlend mode="multiply" in="largeNoise" in2="fineNoise" result="combinedNoise" />

            {/* 4. EXTREME contrast. This forces the noise to become solid black blobs floating in white space */}
            <feColorMatrix type="matrix" values="
              1 0 0 0 0, 
              0 1 0 0 0, 
              0 0 1 0 0, 
              0 0 0 18 -7"
              in="combinedNoise" result="highContrastNoise" />

            {/* 5. Mask the original circle (now a gradient) with these blobs. */}
            <feComposite operator="in" in="SourceGraphic" in2="highContrastNoise" result="maskedCircle" />

            {/* 6. Displace the edges so the blobs aren't perfectly circular around the rim */}
            <feDisplacementMap in="maskedCircle" in2="largeNoise" scale="100" xChannelSelector="R" yChannelSelector="G" result="warpedCircle" />

            {/* 7. Blur heavily to create the optical out-of-focus look from the reference image */}
            <feGaussianBlur in="warpedCircle" stdDeviation="16" result="finalBlur" />

            {/* 8. Slightly boost the alpha of the blurred result */}
            <feColorMatrix type="matrix" values="
              1 0 0 0 0, 
              0 1 0 0 0, 
              0 0 1 0 0, 
              0 0 0 3 0"
              in="finalBlur" />
          </filter>

          <mask id="vision-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            {/* Start with everything blacked out (white mask) */}
            <rect width="100%" height="100%" fill="white" />

            {/* The "hole" which we filter. The filter will drag the white edges inward and black center outward into floating patches. */}
            <circle
              cx={mousePos.x}
              cy={mousePos.y}
              r="240"
              fill="url(#hole-gradient)"
              filter="url(#macular-degeneration)"
              className="transition-[cx,cy] duration-[50ms] ease-out"
            />
          </mask>
        </defs>

        {/* The blackout rectangle using the mask, solid pitch black outside the view area */}
        <rect width="100%" height="100%" fill="#000000" mask="url(#vision-mask)" />
      </svg>
    )
  }

  // --- SUCCESS SCREEN ---
  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="dark" showLogo={false} gameMode={true} />

        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000 zoom-in-95 ease-out">
          <div className="mb-12">
            <CheckCircle2 className="w-20 h-20 text-white/90 mx-auto" strokeWidth={1} />
          </div>

          <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Found it.
          </h2>

          <p className="text-xl md:text-3xl font-light mb-16 max-w-2xl mx-auto leading-relaxed text-stone-300">
            You pieced it together. Imagine doing that for every single link on a webpage, <span className="italic">every single day.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Button
              onClick={() => {
                setSuccess(false)
                setHasStarted(false)
              }}
              variant="outline"
              className="border-stone-700 bg-transparent text-white hover:bg-white hover:text-black h-16 px-10 text-lg uppercase tracking-widest font-bold transition-all"
            >
              Try Again
            </Button>
            <Link href="/experience/total-blindness">
              <Button className="bg-white text-black hover:bg-stone-200 h-16 px-10 text-lg uppercase tracking-widest font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Next Lesson
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION (Includes Overlays) ---
  return (
    <main className="h-screen w-full bg-stone-900 relative overflow-hidden font-sans flex flex-col items-center justify-center select-none p-4 md:p-12">
      {/* Background UI for realism */}
      <div className="absolute inset-0 pattern-dots pattern-stone-800 pattern-opacity-20 pattern-size-4 pointer-events-none" />

      {/* Persistent Objective HUD */}
      {hasStarted && !success && (
        <div className="fixed top-6 right-6 z-50 bg-[#1A1A1A] border-4 border-[#333] shadow-[8px_8px_0_rgba(0,0,0,0.8)] rounded-xl p-5 text-white max-w-[320px]">
          <h4 className="flex items-center gap-2 text-[11px] font-black text-[#FEF08A] uppercase tracking-[0.2em] mb-2 border-b-2 border-[#FEF08A]/30 pb-2">
            <Search className="w-4 h-4 text-[#FEF08A]" /> Current Objective
          </h4>
          <p className="text-base font-bold leading-relaxed">
            Navigate the OS environment.<br />
            Locate and open <span className="inline-block px-1.5 rounded uppercase tracking-wider font-black text-black ml-1 bg-[#FEF08A]">Project AltAccess</span>.
          </p>
        </div>
      )}

      {/* Back Button Outside Monitor */}
      <button
        onClick={() => {
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

      {/* THE MONITOR CONTAINER */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full max-w-5xl aspect-[16/10] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-row border-[12px] border-stone-800",
          hasStarted && !success ? "cursor-none" : ""
        )}
      >
        <NativeBlackoutOverlay />
        {/* OS SIDEBAR (Decoration) */}
        <div className="w-64 bg-[#F3F3F3] border-r border-stone-300 h-full flex flex-col py-6 px-4 hidden md:flex shrink-0">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4 px-2">Favorites</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-stone-700 hover:bg-stone-200 cursor-default">
              <Monitor className="w-4 h-4" /> <span className="text-sm">Desktop</span>
            </div>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-stone-700 bg-stone-200 font-medium cursor-default">
              <Folder className="w-4 h-4 text-blue-500" /> <span className="text-sm">Documents</span>
            </div>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-stone-700 hover:bg-stone-200 cursor-default">
              <ImageIcon className="w-4 h-4 text-yellow-500" /> <span className="text-sm">Pictures</span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-8 mb-4 px-2">Locations</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-md text-stone-700 hover:bg-stone-200 cursor-default">
              <HardDrive className="w-4 h-4 text-stone-400" /> <span className="text-sm">Local Disk (C:)</span>
            </div>
          </div>
        </div>

        {/* OS MAIN CONTENT AREA */}
        <div className="flex-1 bg-white h-full flex flex-col relative overflow-hidden">

          {/* Redesigned Subtle Objective Notification */}
          <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-md border border-stone-200 shadow-lg px-4 py-3 rounded-lg pointer-events-none flex items-start gap-4 max-w-[280px]">
            <div className="bg-wong-orange/10 p-2 rounded-md shrink-0 mt-0.5">
              <Search className="w-4 h-4 text-wong-orange" />
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-0.5">System Task</h4>
              <p className="text-sm md:text-sm font-medium text-stone-800 leading-snug">
                Locate and open <span className="text-wong-orange font-bold">"Project AltAccess"</span>
              </p>
            </div>
          </div>

          {/* Breadcrumbs / Toolbar */}
          <div className="h-14 border-b border-stone-200 flex items-center px-6 gap-4 bg-stone-50/50 shrink-0">
            <div className="flex gap-1 border border-stone-300 rounded p-1">
              <div className="w-6 h-6 rounded bg-stone-200" />
              <div className="w-6 h-6 rounded hover:bg-stone-200 transition-colors" />
            </div>
            <div className="flex-1 bg-white border border-stone-300 rounded px-3 py-1.5 text-sm text-stone-600 flex items-center gap-2 shadow-inner">
              <Monitor className="w-4 h-4" /> &gt; Users &gt; Admin &gt; Documents
            </div>
          </div>

          {/* File Grid */}
          <div className="flex-1 p-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4 content-start overflow-y-auto w-full mx-auto pb-32">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group flex flex-col items-center gap-2 rounded-lg p-2 hover:bg-blue-50 focus:bg-blue-100 transition-colors focus:outline-none pointer-events-auto"
                tabIndex={-1}
              >
                {parseInt(item.id) % 3 === 0 ? (
                  <FileText className={cn("w-14 h-14 md:w-16 md:h-16", item.color)} strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                ) : parseInt(item.id) % 5 === 0 ? (
                  <File className={cn("w-14 h-14 md:w-16 md:h-16", item.color)} strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                ) : (
                  <Folder className={cn("w-14 h-14 md:w-16 md:h-16", item.color)} strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                )}

                <span className="text-xs md:text-sm text-stone-700 font-medium text-center line-clamp-2 px-1 group-hover:text-black">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- START OVERLAY --- */}
        {!hasStarted && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-black/95 backdrop-blur-md flex flex-col items-center justify-center text-white px-6 pointer-events-auto">
              <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8">
                Tunnel Vision
              </h1>

              <p className="text-xl md:text-2xl font-light text-stone-300 max-w-2xl text-center leading-relaxed mb-12">
                During this experience, we would like you to imagine yourself as a person who has severe field loss.
                With these limitations, try to find the target file successfully.
              </p>

              {/* Animated Instruction Graphic */}
              <div className="relative mb-8 h-32 w-full flex justify-center items-center">
                {/* Orbiting Circle */}
                <div className="absolute w-24 h-24 border-2 border-dashed border-white/40 rounded-full animate-[spin_4s_linear_infinite]" />
                <div className="absolute w-24 h-24 border-2 border-white rounded-full scale-90" />

                {/* Animated Cursor */}
                <MousePointer2 className="w-10 h-10 text-white absolute animate-bounce" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }} />
              </div>

              <p className="text-lg md:text-xl font-medium mb-8 uppercase tracking-widest text-wong-orange">
                Move your cursor to see the content
              </p>

              <Button
                onClick={() => setHasStarted(true)}
                className="bg-white text-black hover:bg-stone-200 h-14 px-12 text-lg uppercase tracking-wider font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

      </div>

    </main>
  )
}
