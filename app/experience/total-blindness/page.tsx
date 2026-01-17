"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Volume2, Lock, Unlock, DoorOpen, Search, Key } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

// Interactive Items Type
type GameItem = {
  id: string
  name: string
  description: string // Read on Focus
  actionResult: string // Read on Enter
  requiresKey?: boolean
  isKey?: boolean
  isExit?: boolean
  icon?: any
}

export default function TotalBlindnessExperience() {
  const [started, setStarted] = useState(false)
  const [isBlackout, setIsBlackout] = useState(true) // Default to Blindness ON
  const [hasKey, setHasKey] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [focusedItem, setFocusedItem] = useState<string | null>(null)

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Game Data
  const roomItems: GameItem[] = [
    {
      id: "table",
      name: "Old Wooden Table",
      description: "A dusty wooden table. There's a piece of paper on it.",
      actionResult: "You read the paper. It says 'The key is hidden where the cold air blows'.",
      icon: Search
    },
    {
      id: "vent",
      name: "Air Vent",
      description: "A metal air vent near the floor. You feel a cold breeze.",
      actionResult: "You carefully reach inside... You found a Rusty Key!",
      isKey: true,
      icon: Key
    },
    {
      id: "cabinet",
      name: "Filing Cabinet",
      description: "A tall metal filing cabinet.",
      actionResult: "It's locked tight. You can't open it.", // Red herring
      icon: Lock
    },
    {
      id: "door",
      name: "Heavy Iron Door",
      description: "Assuming this represents the exit. It has a sturdy keyhole.",
      actionResult: "You unlock the door. The heavy iron door creaks open...",
      requiresKey: true,
      isExit: true,
      icon: DoorOpen
    }
  ]

  // TTS Helper
  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      // Select voice if possible (not implemented here for brevity, referencing previous logic)
      window.speechSynthesis.speak(utterance)
    }
  }

  // Effect: Announce entry
  useEffect(() => {
    if (started && !gameFinished) {
      setTimeout(() => {
        speak("You have entered a dark room. Use Tab to find objects. Press Enter to interact. Find the key to escape.")
      }, 1000)
    }
  }, [started, gameFinished])

  // Interaction Logic
  const handleItemFocus = (item: GameItem) => {
    setFocusedItem(item.name)
    speak(item.name + ". " + item.description)
  }

  const handleItemInteraction = (item: GameItem) => {
    if (item.isKey) {
      if (hasKey) {
        speak("You already have the key. Use it on the door.")
      } else {
        setHasKey(true)
        speak(item.actionResult)
        // Sound Effect for Key Pickup?
      }
    } else if (item.isExit) {
      if (hasKey) {
        speak(item.actionResult)
        setGameFinished(true)
      } else {
        speak("It's locked. You need a key.")
      }
    } else {
      speak(item.actionResult)
    }
  }

  // --- START SCREEN ---
  if (!started) {
    return (
      <main className="min-h-screen bg-[#FDFCF8] text-black relative flex flex-col font-sans selection:bg-wong-orange selection:text-black overflow-hidden">
        <Navbar theme="light" showLogo={true} />

        <div className="flex-1 flex flex-col justify-center py-10 px-6 md:px-24">
          {/* Same Intro Design as before, just updated text */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <Link
                href="/#chapter-5"
                className="inline-flex items-center gap-2 group border-b-2 border-transparent hover:border-black transition-all pb-1 text-stone-600 hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-widest font-bold">Back to Curriculum</span>
              </Link>
            </div>

            <div className="mb-12 border-b-2 border-black pb-12">
              <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
                Simulation 01 / Audio Interface
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Total Blindness.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light mb-8">
                Experience the web without a screen. Navigate a dark room using only audio cues.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <p className="text-lg leading-relaxed">Turn on your audio. You will need it to navigate.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <p className="text-lg leading-relaxed">Use <span className="font-bold bg-stone-200 px-2 py-0.5 rounded">TAB</span> to move between objects.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <p className="text-lg leading-relaxed">Use <span className="font-bold bg-stone-200 px-2 py-0.5 rounded">ENTER</span> to interact.</p>
                </div>
              </div>
            </div>

            {/* Fun Fact Area */}
            <div className="bg-wong-yellow/10 border-l-4 border-wong-yellow p-6 mb-12 rounded-r-lg">
              <h3 className="font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Did you know?
              </h3>
              <p className="text-stone-700 italic">
                "Experienced screen reader users often listen to speech at <strong>2x or 3x speed</strong> (approx. 450 words per minute) to navigate quickly—much faster than visual scanning!"
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setStarted(true)}
              className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
            >
              <span>Enter Dark Room</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- SUCCESS SCREEN ---
  if (gameFinished) {
    return (
      <main className="min-h-screen bg-wong-yellow text-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="light" showLogo={true} />
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <DoorOpen className="w-24 h-24 mx-auto mb-8 text-black" />
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">You Escaped!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            You successfully navigated the dark room using only screen reader cues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setStarted(false)
                setGameFinished(false)
                setHasKey(false)
                setIsBlackout(true)
              }}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Try Again
            </Button>
            <Link href="/#chapter-5">
              <Button className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold">
                Next Lesson
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE GAME LOOP ---
  return (
    <div className="min-h-screen relative font-sans">
      <Navbar theme="light" showLogo={true} />

      {/* 1. BLACKOUT OVERLAY (The visual impairment) */}
      <div
        className={cn(
          "fixed inset-0 z-10 bg-black transition-opacity duration-500",
          isBlackout ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Only show this hint if completely in the dark */}
        {isBlackout && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-center pointer-events-none">
            <Volume2 className="w-16 h-16 mx-auto mb-4 animate-pulse opacity-50" />
            <p className="uppercase tracking-[0.2em] text-sm">Audio Only</p>
          </div>
        )}
      </div>

      {/* 2. CONTROLS (Always visible on top layer if cheating, or clickable if blind) */}
      <button
        onClick={() => {
          const newState = !isBlackout
          setIsBlackout(newState)
          speak(newState ? "Vision Disabled" : "Vision Enabled")
        }}
        className="fixed top-24 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
        title="Toggle Vision (Cheat Mode)"
      >
        {isBlackout ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6 text-black" />}
      </button>

      {/* 3. GAME ROOM (The DOM Structure) */}
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 pt-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-2">The Locked Room</h2>
          <p className="text-muted-foreground">Tab to navigate. Enter to inspect.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {roomItems.map((item) => (
            <button
              key={item.id}
              className="group relative h-48 bg-white border-2 border-stone-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-black focus:border-wong-orange focus:ring-4 focus:ring-wong-orange/20 transition-all outline-none"
              onFocus={() => handleItemFocus(item)}
              onClick={() => handleItemInteraction(item)}
            >
              <div className="bg-stone-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-stone-700" />
              </div>
              <span className="font-bold text-lg">{item.name}</span>

              {/* Visual Feedback for Sighted Users */}
              {item.isKey && hasKey && (
                <span className="absolute top-4 right-4 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">Collected</span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 p-4 bg-white rounded-lg border border-stone-200 max-w-lg w-full text-center">
          <h3 className="uppercase tracking-widest text-xs font-bold text-stone-400 mb-2">Inventory</h3>
          <div className="flex justify-center gap-4">
            {hasKey ? (
              <div className="flex items-center gap-2 text-wong-orange font-bold animate-in fade-in zoom-in">
                <Key className="w-5 h-5" />
                <span>Rusty Key</span>
              </div>
            ) : (
              <span className="text-stone-300 italic">Empty</span>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
