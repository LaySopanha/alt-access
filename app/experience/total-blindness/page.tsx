"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Keyboard, MousePointerClick, Ear, Volume2 } from "lucide-react"
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
            <div className="mb-16 border-b-2 border-black pb-8">
              <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
                Simulation 01 / Audio Interface
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Total Blindness.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light">
                Experience the web without a screen. Navigate a pitch-black interface using only audio cues and keyboard commands.
              </p>
            </div>

            {/* Content Layout */}
            <div className="grid md:grid-cols-12 gap-12 mb-16">

              {/* Left Column: Context */}
              <div className="md:col-span-12 lg:col-span-5 space-y-8">
                <div>
                  <div className="w-16 pt-1 border-t-4 border-wong-orange mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Context</span>
                  </div>
                  <p className="text-lg font-serif italic text-stone-800 leading-relaxed">
                    "Screen reader users don't 'scan' a page visually. They traverse it linearly, relying on structure, headings, and semantic landmarks to build a mental model."
                  </p>
                </div>

                <div className="bg-stone-100 p-6 border-l-4 border-black">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    <span>Controls</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-stone-600 font-mono">
                    <li><span className="font-bold text-black">[TAB]</span> ... Next Element</li>
                    <li><span className="font-bold text-black">[ENTER]</span> . Activate</li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Mission & CTA */}
              <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between">
                <div className="mb-8 lg:mb-0">
                  <div className="w-16 pt-1 border-t-4 border-wong-dark-blue mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Mission</span>
                  </div>
                  <p className="text-lg text-stone-700 leading-relaxed mb-8">
                    Your goal is to <strong>find the secret link</strong> hidden in the dark.
                    You must listen carefully to the Voice synthesis to understand where you are.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
                >
                  <span>Enter Simulation</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION ---
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar theme="light" showLogo={true} />

      {/* 1. The "Blindness" Overlay */}
      {/* We keep the underlying DOM accessible (no display:none) but visually hidden */}
      <div
        className="fixed inset-0 z-[100] bg-black transition-opacity duration-700 pointer-events-none"
        style={{ opacity: accessibilityMode ? 0 : 1 }}
        aria-hidden="true"
      >
        {!accessibilityMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white/50 space-y-4">
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
            ? "bg-background border-border text-muted-foreground hover:text-wong-dark-blue"
            : "bg-wong-dark-blue border-wong-dark-blue text-white hover:bg-wong-dark-blue/90"
        )}
        title={accessibilityMode ? "Disable Visuals" : "Enable Visuals"}
      >
        {accessibilityMode ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
      </button>

      {/* 3. Screen Reader Caption (Cheat Mode / Visual Aid) */}
      {showPopup && focusedElement && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-lg">
          <div className="bg-popover text-popover-foreground p-6 rounded-2xl shadow-2xl border-l-4 border-wong-orange animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-muted rounded-lg shrink-0">
                <Volume2 className="w-5 h-5 text-wong-orange" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">VoiceOver Output</div>
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
