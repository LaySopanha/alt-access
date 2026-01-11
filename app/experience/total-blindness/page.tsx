"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Keyboard, MousePointerClick, Ear, Volume2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

export default function TotalBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  // --- TTS Logic ---
  useEffect(() => {
    if (started) {
      // Small delay to ensure audio context is ready
      setTimeout(() => speak(t.screenReader.welcome), 500)
    }
  }, [started, language])

  useEffect(() => {
    if (!started) return

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      let label = ""

      // Logic to determine what to read
      if (target.getAttribute("aria-label")) {
        label = target.getAttribute("aria-label") || ""
      } else if (target.textContent && target.tagName !== "SCRIPT") {
        // Limit text length for better UX
        label = target.textContent.trim().slice(0, 150)
      } else if (target.tagName === "A" && target.getAttribute("href")) {
        label =
          language === "km"
            ? `តំណភ្ជាប់ទៅកាន់ ${target.getAttribute("href")}`
            : `Link to ${target.getAttribute("href")}`
      } else if (target.tagName === "BUTTON") {
        label = language === "km" ? "ប៊ូតុង" : "Button"
      }

      if (label) {
        setFocusedElement(label)
        speak(label)

        // Show visual caption if accessibility mode is ON (Cheating mode)
        if (accessibilityMode) {
          setShowPopup(true)
          // Hide popup after a delay, but keep focus state
          const timer = setTimeout(() => setShowPopup(false), 4000)
          return () => clearTimeout(timer)
        }
      }
    }

    document.addEventListener("focusin", handleFocusIn)
    return () => document.removeEventListener("focusin", handleFocusIn)
  }, [started, accessibilityMode, language])

  const speak = async (text: string) => {
    if (!text) return

    try {
      // Cancel existing speech
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.speechSynthesis.cancel()

      // Attempt API call (Optional: Replace with your preferred TTS provider)
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      })

      const contentType = response.headers.get("content-type")

      if (response.ok && contentType?.includes("audio")) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audioRef.current = audio

        audio.onended = () => URL.revokeObjectURL(audioUrl)
        audio.onerror = () => fallbackSpeak(text)

        await audio.play()
      } else {
        fallbackSpeak(text)
      }
    } catch (error) {
      fallbackSpeak(text)
    }
  }

  const fallbackSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)

      // Attempt to find a Khmer voice if needed, otherwise default
      const voices = window.speechSynthesis.getVoices()
      if (language === "km") {
        const khmerVoice = voices.find((v) => v.lang.includes("km") || v.lang.includes("KH"))
        if (khmerVoice) utterance.voice = khmerVoice
      }

      utterance.rate = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  // --- START SCREEN UI ---
  if (!started) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(#1351aa_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff751f]/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl w-full space-y-8 relative z-10">
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
                <Ear className="w-4 h-4" />
                <span>Visual Simulation 01</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1351aa]">
                Total Blindness Lab
              </h1>
            </div>

            <div className="space-y-6 border-l-4 border-[#ff751f] pl-6 py-2">
              <h2 className="text-xl font-bold text-slate-900">Mission</h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                Experience the web as a screen reader user.
                Your screen will go <strong>black</strong>. You must navigate using only your keyboard and audio cues.
              </p>
            </div>

            {/* Instruction Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-[#1351aa]/10 text-[#1351aa] rounded-xl flex items-center justify-center mb-4">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">TAB Key</h3>
                <p className="text-sm text-slate-500">
                  Press <strong>Tab</strong> to jump between interactive elements (buttons, links, inputs).
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-[#1351aa]/10 text-[#1351aa] rounded-xl flex items-center justify-center mb-4">
                  <MousePointerClick className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">ENTER Key</h3>
                <p className="text-sm text-slate-500">
                  Press <strong>Enter</strong> to click/activate the element you are currently focused on.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-[#ff751f]/10 text-[#ff751f] rounded-xl flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Cheat Mode</h3>
                <p className="text-sm text-slate-500">
                  Getting lost? Toggle the <strong>Eye Icon</strong> (top right) to peek at the screen.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="bg-[#ff751f] hover:bg-[#e06519] text-white rounded-xl px-10 py-7 text-lg font-semibold shadow-xl shadow-orange-900/10 transition-all hover:-translate-y-1 w-full md:w-auto"
            >
              Start Experience
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION ---
  return (
    <div className="relative min-h-screen bg-white">

      {/* 1. The "Blindness" Overlay */}
      {/* We keep the underlying DOM accessible (no display:none) but visually hidden */}
      <div
        className="fixed inset-0 z-[100] bg-[#0B0F19] transition-opacity duration-700 pointer-events-none"
        style={{ opacity: accessibilityMode ? 0 : 1 }}
        aria-hidden="true"
      >
        {!accessibilityMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-slate-500/50 space-y-4">
            <Volume2 className="w-16 h-16 mx-auto animate-pulse" />
            <p className="text-sm font-mono tracking-widest uppercase">Audio Navigation Active</p>
          </div>
        )}
      </div>

      {/* 2. Floating Toggle Button (Always visible/accessible) */}
      <button
        onClick={() => {
          setAccessibilityMode(!accessibilityMode)
          speak(accessibilityMode ? t.screenReader.accessibilityDisabled : t.screenReader.accessibilityEnabled)
        }}
        className={cn(
          "fixed top-6 right-6 z-[110] p-4 rounded-full shadow-2xl border-2 transition-all duration-300 group",
          accessibilityMode
            ? "bg-white border-slate-200 text-slate-400 hover:text-[#1351aa]"
            : "bg-[#1351aa] border-[#1351aa] text-white hover:bg-[#1a5dc0]"
        )}
        title={accessibilityMode ? "Disable Visuals" : "Enable Visuals"}
      >
        {accessibilityMode ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
      </button>

      {/* 3. Screen Reader Caption (Cheat Mode / Visual Aid) */}
      {showPopup && focusedElement && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-lg">
          <div className="bg-[#1e1e2e] text-slate-200 p-6 rounded-2xl shadow-2xl border-l-4 border-[#ff751f] animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/10 rounded-lg shrink-0">
                <Volume2 className="w-5 h-5 text-[#ff751f]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">VoiceOver Output</div>
                <p className="text-lg font-medium leading-relaxed font-mono">
                  "{focusedElement}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. The Actual Website Content (This is what is being navigated) */}
      {/* We wrap it in a container that allows focus but is visually hidden by the overlay above */}
      <div ref={containerRef} className="relative z-0">
        <Navbar />
        <HeroSection />
        <ExperienceCards />
        <VideoSeriesSection />
        <VisualImpairmentSection />

        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <p className="opacity-60 text-sm">
              © {new Date().getFullYear()} Project Lima Clone. Built for accessibility awareness.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
