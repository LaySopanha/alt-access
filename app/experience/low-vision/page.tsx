"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LowVisionExperience() {
  const [started, setStarted] = useState(false)
  const [signed, setSigned] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (started && !signed) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [started, signed])

  if (!started) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8">
          <Link href="/" className="text-sm underline hover:text-lima-blue transition-colors">
            ← Back to main menu
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Low Vision Experience</h1>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                During this experience, we would like you to <em>imagine</em> yourself as a person who has{" "}
                <em>low vision with blurriness and reduced contrast</em>. With these limitations, try to read and sign a
                mock petition successfully.
              </p>
            </div>

            <Button size="lg" onClick={() => setStarted(true)} className="w-full md:w-auto">
              Start Experience
            </Button>

            <p className="text-sm text-muted-foreground">Move your cursor to see clearer areas</p>
          </div>
        </div>
      </main>
    )
  }

  if (signed) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Mission Complete!</h1>
          <p className="text-xl text-muted-foreground">
            You successfully read and signed the petition with limited vision. People with low vision face these
            challenges when text is too small or contrast is poor.
          </p>
          <Link href="/">
            <Button size="lg">Return Home</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-50 transition-all duration-100"
        style={{
          background: `
            radial-gradient(ellipse 160px 200px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.95) 100%),
            radial-gradient(ellipse 100px 140px at ${mousePos.x + 30}px ${mousePos.y - 20}px, rgba(0,0,0,0.5) 0%, transparent 50%)
          `,
          backdropFilter: "blur(1px)",
        }}
      >
        <div
          className="absolute w-0.5 h-0.5 bg-black/8 rounded-full"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y + 15}px`,
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-black/6 rounded-full"
          style={{
            left: `${mousePos.x - 30}px`,
            top: `${mousePos.y + 40}px`,
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-black/7 rounded-full"
          style={{
            left: `${mousePos.x + 45}px`,
            top: `${mousePos.y - 25}px`,
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-black/5 rounded-full"
          style={{
            left: `${mousePos.x - 15}px`,
            top: `${mousePos.y - 35}px`,
          }}
        />
        <div
          className="absolute w-0.5 h-0.5 bg-black/6 rounded-full"
          style={{
            left: `${mousePos.x + 35}px`,
            top: `${mousePos.y + 50}px`,
          }}
        />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 pointer-events-auto">
        <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-serif font-bold">Environmental Protection Petition</h1>

          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              We, the undersigned, call upon our government to take immediate and decisive action to combat climate
              change and protect our environment for future generations. The evidence is clear: rising global
              temperatures, extreme weather events, and biodiversity loss threaten our planet's ecosystems and our way
              of life.
            </p>
            <p>
              We demand comprehensive legislation that reduces carbon emissions by 50% within the next decade, invests
              in renewable energy infrastructure, and protects endangered habitats. The time for action is now.
            </p>
            <p className="text-xs opacity-60">
              By signing below, you agree to support environmental protection measures and allow your name to be
              included in this petition presented to government officials.
            </p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Full Name</label>
              <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-600">Email Address</label>
              <input type="email" className="w-full border rounded px-3 py-2 text-sm" placeholder="Enter your email" />
            </div>
            <Button onClick={() => setSigned(true)} className="w-full">
              Sign Petition
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
