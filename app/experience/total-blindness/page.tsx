"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Volume2, Lock, Unlock, DoorOpen, Search, Key, ShoppingCart, CreditCard } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

// Interactive Items Type (Scenario 1)
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

// Scenarios
type Scenario = 1 | 2 | null

export default function TotalBlindnessExperience() {
  const [scenario, setScenario] = useState<Scenario>(null)
  const [isBlackout, setIsBlackout] = useState(true) // Default to Blindness ON

  // Scenario 1 State
  const [hasKey, setHasKey] = useState(false)

  // Scenario 2 State
  const [formStep, setFormStep] = useState(1)

  // Shared State
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
    if (scenario !== null && !gameFinished) {
      setTimeout(() => {
        if (scenario === 1) {
          speak("You have entered a dark room. Use Tab to find objects. Press Enter to interact. Find the key to escape.")
        } else {
          speak("Checkout form loaded. Please enter your name and shipping details. Use Tab to navigate fields. Press Enter to submit.")
        }
      }, 1000)
    }
  }, [scenario, gameFinished])

  // --- INTERACTION LOGIC ---

  // TTS Feedback
  const handleItemFocus = (text: string) => {
    setFocusedItem(text)
    speak(text)
  }

  // Scenario 1 Logic
  const handleRoomInteraction = (item: GameItem) => {
    if (item.isKey) {
      if (hasKey) {
        speak("You already have the key. Use it on the door.")
      } else {
        setHasKey(true)
        speak(item.actionResult)
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

  // Scenario 2 Logic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formStep === 1) {
      speak("Step 1 complete. Proceeding to payment details.")
      setFormStep(2)
    } else {
      speak("Payment successful. Your order is confirmed.")
      setGameFinished(true)
    }
  }

  // --- START SCREEN ---
  if (scenario === null) {
    return (
      <main className="min-h-screen bg-[#FDFCF8] text-black relative flex flex-col font-sans selection:bg-wong-orange selection:text-black overflow-hidden">
        <Navbar theme="light" showLogo={true} />

        <div className="flex-1 flex flex-col justify-center py-10 px-6 md:px-24">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-8">
              <Link
                href="/#simulations"
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
                Experience the web without a screen. Navigate entirely using keyboard inputs and audio cues.
              </p>
            </div>

            {/* Scenario Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Scenario 1 */}
              <div className="bg-white p-8 border-2 border-stone-200 rounded-2xl flex flex-col justify-between hover:border-black transition-colors group">
                <div>
                  <div className="bg-wong-yellow/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <Search className="w-8 h-8 text-wong-yellow relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M1: The Dark Room</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    A conceptual exercise. Tab through a dark room, listen to descriptions, and find the key to escape.
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
                  <div className="bg-wong-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden relative">
                    <ShoppingCart className="w-8 h-8 text-wong-blue relative z-10" />
                  </div>
                  <h3 className="text-3xl font-bold font-serif mb-4">M2: The Checkout</h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    Try to buy a product using a form that fails to associate labels with inputs properly. A common real-world barrier.
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
  if (gameFinished) {
    return (
      <main className="min-h-screen bg-wong-yellow text-black flex flex-col items-center justify-center p-6 text-center font-sans">
        <Navbar theme="light" showLogo={true} />
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <DoorOpen className="w-24 h-24 mx-auto mb-8 text-black" />
          <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">Success!</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-lg mx-auto leading-relaxed">
            {scenario === 1
              ? "You successfully navigated the dark room using only screen reader cues."
              : "You successfully completed the checkout process despite the inaccessible form."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setScenario(null)
                setGameFinished(false)
                setHasKey(false)
                setFormStep(1)
                setIsBlackout(true)
              }}
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Menu
            </Button>
            <Button
              onClick={() => {
                setGameFinished(false)
                setHasKey(false)
                setFormStep(1)
              }}
              className="bg-black text-white hover:bg-gray-900 border-2 border-transparent h-14 px-8 text-lg uppercase tracking-wide font-bold"
            >
              Play Again
            </Button>
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

      {/* 3. GAME CONTENT (The DOM Structure) */}
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 pt-32 pb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-2">
            {scenario === 1 ? "The Locked Room" : "Secure Checkout"}
          </h2>
          <p className="text-muted-foreground">Tab to navigate. Enter to interact.</p>
        </div>

        {scenario === 1 ? (
          <GameOneContent
            roomItems={roomItems}
            hasKey={hasKey}
            onFocus={(item) => handleItemFocus(item.name + ". " + item.description)}
            onInteract={handleRoomInteraction}
          />
        ) : (
          <GameTwoContent
            step={formStep}
            isBlackout={isBlackout}
            onFocus={handleItemFocus}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>

    </div>
  )
}

// --- SUBCOMPONENTS FOR SCENARIOS ---

function GameOneContent({ roomItems, hasKey, onFocus, onInteract }: { roomItems: GameItem[], hasKey: boolean, onFocus: (item: GameItem) => void, onInteract: (item: GameItem) => void }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {roomItems.map((item) => (
          <button
            key={item.id}
            className="group relative h-48 bg-white border-2 border-stone-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-black focus:border-wong-orange focus:ring-4 focus:ring-wong-orange/20 transition-all outline-none"
            onFocus={() => onFocus(item)}
            onClick={() => onInteract(item)}
            aria-hidden="true" // Hide from actual screen readers so our fake TTS handles it
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

      <div className="mt-12 p-4 bg-white rounded-lg border border-stone-200 max-w-lg w-full text-center" aria-hidden="true">
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
    </>
  )
}

function GameTwoContent({ step, isBlackout, onFocus, onSubmit }: { step: number, isBlackout: boolean, onFocus: (str: string) => void, onSubmit: (e: React.FormEvent) => void }) {
  // Simulated form that is poorly accessible
  // When blackout is true (simulating TTS), the focus events read unhelpful text
  // When blackout is false (cheating), visual labels are shown, BUT the actual TTS strings still read badly unless accessibility was 'fixed' (for scope, we just let them cheat visually)

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full border border-stone-200">

      <div className="flex justify-between items-center mb-8 pb-4 border-b">
        <h3 className="text-2xl font-serif font-bold">Checkout</h3>
        <span className="text-stone-500 font-mono text-sm">Step {step} of 2</span>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={cn("block font-medium", isBlackout ? "invisible" : "")}>First Name</label>
            <input
              type="text"
              required
              className="w-full border-2 border-stone-200 rounded-lg p-3 focus:outline-none focus:border-black"
              onFocus={() => onFocus(isBlackout ? "Input text field." : "First Name input.")}
            />
          </div>
          <div className="space-y-2">
            <label className={cn("block font-medium", isBlackout ? "invisible" : "")}>Last Name</label>
            <input
              type="text"
              required
              className="w-full border-2 border-stone-200 rounded-lg p-3 focus:outline-none focus:border-black"
              onFocus={() => onFocus(isBlackout ? "Input text field." : "Last Name input.")}
            />
          </div>
          <div className="space-y-2">
            <label className={cn("block font-medium drop-shadow-sm", isBlackout ? "invisible" : "")}>Shipping Address</label>
            <textarea
              required
              className="w-full border-2 border-stone-200 rounded-lg p-3 focus:outline-none focus:border-black min-h-[100px]"
              onFocus={() => onFocus(isBlackout ? "Text area." : "Shipping Address area.")}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={cn("block font-medium", isBlackout ? "invisible" : "")}>Credit Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3.5 text-stone-400 w-5 h-5" aria-hidden="true" />
              <input
                type="text"
                required
                className="w-full border-2 border-stone-200 rounded-lg p-3 pl-10 focus:outline-none focus:border-black"
                onFocus={() => onFocus(isBlackout ? "Input text field." : "Credit Card Number input.")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={cn("block font-medium", isBlackout ? "invisible" : "")}>Expiry (MM/YY)</label>
              <input
                type="text"
                required
                className="w-full border-2 border-stone-200 rounded-lg p-3 focus:outline-none focus:border-black"
                onFocus={() => onFocus(isBlackout ? "Input text field." : "Expiry date input.")}
              />
            </div>
            <div className="space-y-2">
              <label className={cn("block font-medium", isBlackout ? "invisible" : "")}>CVC</label>
              <input
                type="text"
                required
                className="w-full border-2 border-stone-200 rounded-lg p-3 focus:outline-none focus:border-black"
                onFocus={() => onFocus(isBlackout ? "Input text field." : "Security code input.")}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-12 px-8 uppercase font-bold tracking-wider"
          onFocus={() => onFocus(isBlackout ? "Button. Blank." : "Cancel button.")}
        >
          {isBlackout ? "" : "Cancel"}
        </Button>
        <Button
          type="submit"
          className="h-12 px-8 uppercase font-bold tracking-wider bg-black text-white hover:bg-stone-800"
          onFocus={() => onFocus(isBlackout ? "Button. Submit form." : "Next Step button.")}
        >
          {step === 1 ? "Next Step" : "Pay Now"}
        </Button>
      </div>

    </form>
  )
}
