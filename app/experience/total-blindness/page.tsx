"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceCards } from "@/components/experience-cards"
import { VideoSeriesSection } from "@/components/video-series-section"
import { VisualImpairmentSection } from "@/components/visual-impairment-section"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function TotalBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (started) {
      speak(t.screenReader.welcome)
    }
  }, [started, language])

  useEffect(() => {
    if (!started) return

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      let label = ""

      if (target.getAttribute("aria-label")) {
        label = target.getAttribute("aria-label") || ""
      } else if (target.textContent) {
        label = target.textContent.trim().slice(0, 100)
      } else if (target.tagName === "A" && target.getAttribute("href")) {
        label =
          language === "km" ? `តំណភ្ជាប់ទៅកាន់ ${target.getAttribute("href")}` : `Link to ${target.getAttribute("href")}`
      } else if (target.tagName === "BUTTON") {
        label = language === "km" ? "ប៊ូតុង" : "Button"
      }

      if (label) {
        setFocusedElement(label)
        speak(label)

        if (accessibilityMode) {
          setShowPopup(true)
          setTimeout(() => {
            setShowPopup(false)
          }, 2000)
        }
      }
    }

    document.addEventListener("focusin", handleFocusIn)
    return () => document.removeEventListener("focusin", handleFocusIn)
  }, [started, accessibilityMode, language])

  const speak = async (text: string) => {
    try {
      // Stop any ongoing speech
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.speechSynthesis.cancel()

      console.log("[v0] Requesting TTS for:", text.slice(0, 50) + "...")

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (errorData.useClientSynthesis) {
          console.log("[v0] API unavailable, using browser fallback")
          fallbackSpeak(text)
          return
        }
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      audio.onerror = () => {
        console.log("[v0] Audio playback error, using fallback")
        URL.revokeObjectURL(audioUrl)
        fallbackSpeak(text)
      }

      await audio.play()
      console.log("[v0] Playing AiVOOV audio")
    } catch (error) {
      console.log("[v0] TTS API error, using fallback:", error)
      fallbackSpeak(text)
    }
  }

  const fallbackSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0
      utterance.lang = language === "km" ? "km-KH" : "en-US"

      const voices = window.speechSynthesis.getVoices()
      if (language === "km") {
        const khmerVoice = voices.find((voice) => voice.lang.includes("km") || voice.lang.includes("KH"))
        if (khmerVoice) {
          utterance.voice = khmerVoice
          console.log("[v0] Using browser Khmer voice:", khmerVoice.name)
        } else {
          console.log("[v0] No Khmer voice available, using default with km-KH lang")
        }
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
          <Link href="/" className="text-sm underline hover:text-lima-blue transition-colors">
            ← Back to main menu
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Total Blindness Experience</h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              During this experience, we would like you to imagine yourself as a blind person and try to navigate our
              website using only the keyboard and a screen reader.
            </p>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="font-semibold text-lg">How to Navigate</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-lima-blue">Tab</div>
                  <p className="text-sm">Move between interactive elements</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-lima-blue">Enter</div>
                  <p className="text-sm">Activate links and buttons</p>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-lima-blue">👁️</div>
                  <p className="text-sm">Toggle to see what you're focusing on</p>
                </div>
              </div>
            </div>

            <Button size="lg" onClick={() => setStarted(true)} className="w-full md:w-auto">
              Start Experience
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black z-40 pointer-events-none transition-opacity duration-300"
        style={{ opacity: accessibilityMode ? 0 : 0.98 }}
        aria-hidden="true"
      />

      <button
        onClick={() => {
          setAccessibilityMode(!accessibilityMode)
          speak(accessibilityMode ? t.screenReader.accessibilityDisabled : t.screenReader.accessibilityEnabled)
        }}
        className="fixed top-4 right-4 z-50 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg border-2 border-gray-300 transition-colors"
        aria-label={accessibilityMode ? t.screenReader.disableAccessibility : t.screenReader.enableAccessibility}
      >
        {accessibilityMode ? <Eye className="w-6 h-6 text-gray-900" /> : <EyeOff className="w-6 h-6 text-gray-900" />}
      </button>

      {showPopup && focusedElement && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
          <div className="text-center space-y-4">
            <div className="text-5xl">🔊</div>
            <h2 className="text-2xl font-bold text-gray-900">Screen Reader Says:</h2>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">{focusedElement}</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative z-30">
        <main className="min-h-screen flex flex-col">
          <Navbar />
          <HeroSection />
          <ExperienceCards />
          <VideoSeriesSection />
          <VisualImpairmentSection />

          <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-6 md:px-10 text-center">
              <p className="opacity-60">
                © {new Date().getFullYear()} Project Lima Clone. Built for accessibility awareness.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
