"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Volume2, VolumeX, Search, Menu, Play, Home, Flame, PlaySquare, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

export default function TotalBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [isBlackout, setIsBlackout] = useState(true)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [gameFinished, setGameFinished] = useState(false)
  const [focusedItem, setFocusedItem] = useState<string | null>(null)

  const router = useRouter()

  // TTS Helper
  const speak = (text: string) => {
    if ("speechSynthesis" in window && ttsEnabled) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  // Initial prompt
  useEffect(() => {
    if (started && !gameFinished) {
      setTimeout(() => {
        speak("Screen reader active. You are on Video Stream. Use Tab to navigate. Find and play the video titled Neon Dreams.")
      }, 1000)
    }
  }, [started, gameFinished])

  // Global focus interception for screen reader simulation
  const handleGlobalFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!started || gameFinished) return
    const el = e.target as HTMLElement
    const role = el.getAttribute('data-role') || el.tagName.toLowerCase()
    const name = el.getAttribute('aria-label') || el.innerText || el.title || "Interactive Element"

    setFocusedItem(`${name} (${role})`)
    speak(`${name}. ${role}.`)
  }

  const handleWin = () => {
    if (gameFinished) return
    speak("Video loading... Neon Dreams by The Synthwave Boyz. Congratulations, you successfully navigated the web using only a screen reader.")
    setGameFinished(true)
  }

  const handleWrongVideo = () => {
    if (gameFinished) return
    speak("This is not the requested video. Keep searching for Neon Dreams.")
  }

  // --- SUCCESS SCREEN ---
  if (gameFinished) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="dark" showLogo={false} gameMode={true} />
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-12 duration-1000 zoom-in-95 ease-out">
          <div className="mb-12">
            <CheckCircle2 className="w-20 h-20 text-white/90 mx-auto" strokeWidth={1} />
          </div>

          <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Task Complete.
          </h2>

          <p className="text-xl md:text-3xl font-light mb-16 max-w-2xl mx-auto leading-relaxed text-stone-300">
            You successfully navigated a complex web layout using only screen reader audio cues. Proper semantic HTML and ARIA labels are essential.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <Button
              onClick={() => {
                setStarted(false)
                setGameFinished(false)
                setIsBlackout(true)
                setFocusedItem(null)
              }}
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

  // --- ACTIVE GAME LOOP ---
  return (
    <div className="min-h-screen relative font-sans select-none overflow-hidden bg-stone-50">
      <Navbar theme="light" showLogo={false} gameMode={true} />

      {/* BACK BUTTON (Globally visible) */}
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

      {/* 1. BLACKOUT OVERLAY (The visual impairment) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black transition-opacity duration-[1500ms] pointer-events-none",
          isBlackout ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Hint when completely in the dark */}
        {isBlackout && started && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-center animate-in fade-in duration-1000 delay-500">
            <Volume2 className="w-16 h-16 mx-auto mb-4 animate-pulse opacity-50" />
            <p className="uppercase tracking-[0.2em] text-sm font-bold">Screen Reader Active</p>
          </div>
        )}
      </div>

      {/* --- START OVERLAY --- */}
      {!started && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl w-full flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
              Total Blindness
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-md">
              Experience navigating the web without a screen. Find and play the music video <strong>"Neon Dreams"</strong> using only auditory feedback.
            </p>

            <div className="grid grid-cols-2 gap-4 w-full mb-8 text-left max-w-sm mx-auto">
              <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                <span className="font-bold bg-white border border-stone-300 shadow-sm px-2 py-1 rounded text-sm mb-2 inline-block">TAB / SHIFT+TAB</span>
                <p className="text-sm font-medium text-stone-600">Navigate Links/Buttons</p>
              </div>
              <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                <span className="font-bold bg-white border border-stone-300 shadow-sm px-2 py-1 rounded text-sm mb-2 inline-block">ENTER</span>
                <p className="text-sm font-medium text-stone-600">Interact/Play</p>
              </div>
            </div>

            <Button
              onClick={() => {
                // Requires user gesture to initiate SpeechSynthesis reliably
                setTimeout(() => setStarted(true), 100)
              }}
              className="bg-black text-white hover:bg-stone-800 h-14 px-12 text-lg uppercase tracking-wider font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Start Web Browsing
            </Button>
            <p className="text-sm text-stone-400 mt-6 max-w-sm italic">
              "Without semantic HTML and ARIA labels, a screen reader sees nothing but pure chaos."
            </p>
          </div>
        </div>
      )}

      {/* 2. CONTROLS (Cheat Mode & TTS Toggle & Objective) */}
      {started && (
        <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {/* TTS Toggle */}
            <button
              onClick={() => {
                const newState = !ttsEnabled
                setTtsEnabled(newState)
                if (!newState && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel()
                }
              }}
              className="h-14 px-6 bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all flex items-center justify-center font-bold shadow-2xl"
              title="Toggle Text-to-Speech"
            >
              {ttsEnabled ? <Volume2 className="w-5 h-5 text-wong-orange" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
            </button>

            {/* Cheat Mode */}
            <button
              onClick={() => {
                const newState = !isBlackout
                setIsBlackout(newState)
                if (started && ttsEnabled) speak(newState ? "Screen blanked. Audio only." : "Screen revealed. Cheat mode active.")
              }}
              className="h-14 px-6 md:px-8 bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all flex items-center gap-3 font-mono text-sm uppercase tracking-widest font-bold shadow-2xl"
              title="Toggle Vision (Cheat Mode)"
            >
              {isBlackout ? (
                <><Eye className="w-5 h-5" /><span className="hidden md:inline">Turn Screen On</span></>
              ) : (
                <><EyeOff className="w-5 h-5" /><span className="hidden md:inline">Turn Screen Off</span></>
              )}
            </button>
          </div>

          {/* Persistent Objective */}
          <div className="bg-[#1A1A1A] border-4 border-[#333] shadow-[8px_8px_0_rgba(0,0,0,0.8)] rounded-xl p-5 text-white mt-2 w-[320px]">
            <h4 className="flex items-center gap-2 text-[11px] font-black text-[#FEF08A] uppercase tracking-[0.2em] mb-2 border-b-2 border-[#FEF08A]/30 pb-2">
              <Volume2 className="w-4 h-4 text-[#FEF08A]" /> Current Objective
            </h4>
            <p className="text-base font-bold leading-relaxed">
              Navigate using <span className="inline-block px-1 rounded uppercase tracking-wider font-black text-black bg-white/80">TAB</span> and <span className="inline-block px-1 rounded uppercase tracking-wider font-black text-black bg-white/80">ENTER</span>.<br />
              Find and play <span className="inline-block px-1.5 rounded uppercase tracking-wider font-black text-black mt-1 bg-[#FEF08A]">Neon Dreams</span>.
            </p>
          </div>
        </div>
      )}

      {/* 3. SIMULATED WEBSITE DOM */}
      <div
        className="pt-24 min-h-screen w-full flex flex-col items-center p-6 relative"
        onFocusCapture={handleGlobalFocus} // This captures all focus events underneath
      >
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden min-h-[70vh]">

          {/* Header */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 border-b border-stone-200 gap-4">
            <div className="flex items-center gap-4">
              <button tabIndex={0} data-role="button" aria-label="Main Menu" className="p-2 hover:bg-stone-100 rounded-full focus:ring-4 focus:ring-wong-orange outline-none transition-all">
                <Menu className="w-6 h-6 text-stone-700" />
              </button>
              <h1 tabIndex={0} data-role="heading level 1" aria-label="Video Stream Home" className="text-2xl font-bold flex items-center gap-2 focus:ring-4 focus:ring-wong-orange outline-none rounded-md px-2 py-1">
                <PlaySquare className="w-8 h-8 text-red-500" /> VideoStream
              </h1>
            </div>
            <div className="w-full md:flex-1 max-w-xl mx-0 md:mx-8 flex items-center">
              <input
                tabIndex={0}
                data-role="search box"
                type="text"
                placeholder="Search"
                aria-label="Search for videos"
                className="w-full px-6 py-3 border border-stone-300 rounded-l-full bg-stone-50 focus:bg-white focus:ring-2 focus:ring-wong-orange outline-none transition-all"
              />
              <button
                tabIndex={0}
                data-role="button"
                aria-label="Submit Search"
                className="px-8 py-3 bg-stone-100 border border-l-0 border-stone-300 rounded-r-full hover:bg-stone-200 focus:ring-4 focus:ring-wong-orange outline-none transition-all"
              >
                <Search className="w-5 h-5 text-stone-600" />
              </button>
            </div>
            <div className="hidden lg:block w-32" /> {/* Spacer */}
          </header>

          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar */}
            <nav className="w-full md:w-64 border-r border-stone-200 flex flex-col gap-1 p-4 shrink-0">
              <button tabIndex={0} data-role="link" aria-label="Home" className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-100 focus:ring-4 focus:ring-wong-orange outline-none bg-stone-100 font-bold w-full text-left transition-all">
                <Home className="w-5 h-5" /> Home
              </button>
              <button tabIndex={0} data-role="link" aria-label="Trending" className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-100 focus:ring-4 focus:ring-wong-orange outline-none font-medium text-stone-700 w-full text-left transition-all">
                <Flame className="w-5 h-5 text-red-500" /> Trending
              </button>
              <button tabIndex={0} data-role="link" aria-label="Subscriptions" className="flex items-center gap-4 p-4 rounded-xl hover:bg-stone-100 focus:ring-4 focus:ring-wong-orange outline-none font-medium text-stone-700 w-full text-left transition-all">
                <PlaySquare className="w-5 h-5" /> Subscriptions
              </button>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 bg-stone-50/50">
              <h2 tabIndex={0} data-role="heading level 2" aria-label="Recommended Videos" className="text-2xl font-bold mb-8 focus:ring-4 focus:ring-wong-orange outline-none rounded-md px-2 py-1 inline-block">
                Recommended for You
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Video 1 */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-video bg-stone-200 rounded-xl relative overflow-hidden group-hover:shadow-md transition-all">
                    <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">Lo-Fi Beats to Relax/Study to</h3>
                    <p className="text-sm text-stone-500 mt-1">ChilledCow • 10M views</p>
                    <button
                      tabIndex={0}
                      data-role="button"
                      aria-label="Play Lo-Fi Beats to Relax/Study to by ChilledCow"
                      className="mt-3 w-full py-3 px-4 bg-stone-100 border border-stone-200 hover:bg-stone-200 rounded-xl text-sm font-bold flex justify-center items-center gap-2 focus:ring-4 focus:ring-wong-orange outline-none transition-all"
                      onClick={handleWrongVideo}
                    >
                      <Play className="w-4 h-4" /> Play Video
                    </button>
                  </div>
                </div>

                {/* Video 2 (Target) */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-video bg-indigo-900 rounded-xl relative overflow-hidden flex items-center justify-center group-hover:shadow-lg transition-all shadow-indigo-900/20">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-purple-800/80" />
                    <div className="w-16 h-16 border-[6px] border-white/20 border-t-white rounded-full animate-spin absolute" />
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 text-indigo-900">Neon Dreams - Official Music Video</h3>
                    <p className="text-sm text-stone-500 mt-1">The Synthwave Boyz • 2.5M views</p>
                    <button
                      tabIndex={0}
                      data-role="button"
                      aria-label="Play Neon Dreams by The Synthwave Boyz"
                      className="mt-3 w-full py-3 px-4 bg-wong-orange text-white border border-transparent hover:bg-orange-600 rounded-xl text-sm font-bold flex justify-center items-center gap-2 focus:ring-4 focus:ring-black outline-none transition-all shadow-md shadow-wong-orange/20 hover:shadow-lg hover:-translate-y-0.5"
                      onClick={handleWin}
                    >
                      <Play className="w-4 h-4 fill-white" /> Play Target
                    </button>
                  </div>
                </div>

                {/* Video 3 */}
                <div className="flex flex-col gap-3 group">
                  <div className="aspect-video bg-stone-200 rounded-xl relative overflow-hidden group-hover:shadow-md transition-all">
                    <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">10 Hour Ultimate EDM Mix</h3>
                    <p className="text-sm text-stone-500 mt-1">RetroMusic • 500K views</p>
                    <button
                      tabIndex={0}
                      data-role="button"
                      aria-label="Play 10 Hour Ultimate EDM Mix by RetroMusic"
                      className="mt-3 w-full py-3 px-4 bg-stone-100 border border-stone-200 hover:bg-stone-200 rounded-xl text-sm font-bold flex justify-center items-center gap-2 focus:ring-4 focus:ring-wong-orange outline-none transition-all"
                      onClick={handleWrongVideo}
                    >
                      <Play className="w-4 h-4" /> Play Video
                    </button>
                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>

        {/* HUD: Screen Reader Display (For Sighted Reference) */}
        {started && !gameFinished && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-10 py-5 bg-white backdrop-blur-md rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-stone-200 pointer-events-none z-50">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-1">TTS Engine Output</span>
              <span className="font-mono font-bold text-sm text-black min-w-[250px] text-center bg-stone-100 px-4 py-2 rounded-lg border border-stone-200">
                {focusedItem ? focusedItem : "Awaiting Focus..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
