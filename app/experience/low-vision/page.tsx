"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Eye, FileText, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function LowVisionExperience() {
  const [started, setStarted] = useState(false)
  const [signed, setSigned] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [blobOffset, setBlobOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (started && !signed) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
        // Make blobs float slightly for realism (lag behind movement)
        setBlobOffset({ x: e.clientX * 0.08, y: e.clientY * 0.08 })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [started, signed])

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
            <div className="mb-16 border-b-2 border-black pb-8">
              <span className="font-mono text-sm uppercase tracking-widest text-stone-500 mb-4 block">
                Simulation 02 / Field Loss
              </span>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-black mb-6 tracking-tight">
                Low Vision.
              </h1>
              <p className="font-sans text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light">
                Experience Scotomas (blind spots) and peripheral loss. See how difficult it becomes to perform simple tasks like signing a petition.
              </p>
            </div>

            {/* Content Layout */}
            <div className="grid md:grid-cols-12 gap-12 mb-16">

              {/* Left Column: Context */}
              <div className="md:col-span-12 lg:col-span-5 space-y-8">
                <div>
                  <div className="w-16 pt-1 border-t-4 border-wong-orange mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Condition</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-black mb-2">Diabetic Retinopathy</h3>
                  <p className="text-stone-600 leading-relaxed">
                    Causes patchy vision, floating spots (floaters), and blurriness.
                  </p>
                </div>

                <div className="bg-stone-100 p-6 border-l-4 border-black">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>Challenge</span>
                  </h4>
                  <p className="text-sm text-stone-600 font-serif italic">
                    "You will have to read 'around' the blind spots. Moving your eyes (mouse) shifts the spots, requiring constant scanning."
                  </p>
                </div>
              </div>

              {/* Right Column: Mission & CTA */}
              <div className="md:col-span-12 lg:col-span-7 flex flex-col justify-between">
                <div className="mb-8 lg:mb-0">
                  <div className="w-16 pt-1 border-t-4 border-wong-dark-blue mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">Mission</span>
                  </div>
                  <p className="text-lg text-stone-700 leading-relaxed mb-8">
                    Your goal is to <strong>read the terms</strong> and <strong>sign the petition</strong>.
                    Navigate the form while your central vision is obscured by dynamic scotomas.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() => setStarted(true)}
                  className="w-full md:w-auto bg-black hover:bg-stone-800 text-white rounded-none border-2 border-transparent hover:border-black px-12 py-8 text-xl font-bold uppercase tracking-wider transition-all flex items-center justify-between group"
                >
                  <span>Start Experience</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }

  // --- SUCCESS SCREEN ---
  if (signed) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <Navbar theme="light" showLogo={true} />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-wong-dark-blue)_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

        <div className="max-w-2xl w-full bg-card p-10 rounded-3xl shadow-xl border border-border text-center relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-wong-dark-blue mb-4">Mission Complete</h1>

          <div className="space-y-4 mb-8 text-left bg-muted p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Lab Report</h3>
            <p className="text-muted-foreground leading-relaxed">
              That was frustrating, wasn't it? The "blobs" forced you to constantly move your mouse to read simple text.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-wong-orange">•</span>
                <span><strong>Impact:</strong> Users with scotomas cannot "scan" a page. They read letter-by-letter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wong-orange">•</span>
                <span><strong>Solution:</strong> Large, bold typography and clear proximity between labels and inputs reduces the mental mapping required.</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/experience">
              <Button variant="outline" size="lg" className="rounded-xl h-12 px-8 border-border">
                Exit Lab
              </Button>
            </Link>
            <Button
              onClick={() => { setSigned(false); setStarted(false); }}
              size="lg"
              className="bg-wong-dark-blue hover:bg-wong-dark-blue/90 text-white rounded-xl h-12 px-8"
            >
              Replay
            </Button>
          </div>
        </div>
      </main>
    )
  }

  // --- ACTIVE SIMULATION ---
  return (
    <main className="min-h-screen bg-slate-100 relative overflow-hidden font-sans cursor-none">
      <Navbar theme="light" showLogo={true} />

      {/* 
        LAYER 1: SURROUNDING TUNNEL (Toned Down)
        - Covers the whole screen.
        - Uses mask-image to cut a softer hole where the mouse is.
      */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(30, 40, 50, 0.75)",
          // Larger gradient fade for smoother edge
          maskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, black 80%)`,
          WebkitMaskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, black 80%)`
        }}
      />

      {/* 
        LAYER 2: THE "VISION SPOT" (Follows Mouse)
        - Contains the "Blobs" (Scotomas).
      */}
      <div
        className="fixed z-[70] pointer-events-none w-[400px] h-[400px] rounded-full"
        style={{

          top: mousePos.y,
          left: mousePos.x,
          transform: 'translate(-50%, -50%)',
          backdropFilter: "blur(2px)",
        }}
      >
        {/* 
           THE SCOTOMAS (Blind Spot Blobs) 
           - Increased opacity/contrast so they are clearly visible.
           - Moving slightly opposite to mouse for organic feel.
        */}

        {/* Large Central Blob (The annoying one) */}
        <div
          className="absolute w-28 h-24 bg-neutral-800/80 rounded-[40%_60%_70%_30%] blur-md mix-blend-multiply"
          style={{
            top: '35%', left: '35%',
            transform: `translate(${blobOffset.x * 0.1}px, ${blobOffset.y * 0.1}px)`
          }}
        />

        {/* Side Blob */}
        <div
          className="absolute w-20 h-20 bg-neutral-800/60 rounded-full blur-lg mix-blend-multiply"
          style={{
            top: '20%', right: '20%',
            transform: `translate(${-blobOffset.x * 0.2}px, ${blobOffset.y * 0.1}px)`
          }}
        />

        {/* Bottom Blob */}
        <div
          className="absolute w-24 h-16 bg-neutral-900/50 rounded-[30%] blur-md mix-blend-multiply"
          style={{
            bottom: '20%', left: '25%',
            transform: `translate(${blobOffset.x * 0.15}px, ${-blobOffset.y * 0.1}px)`
          }}
        />
      </div>

      {/* THE CONTENT */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 pointer-events-auto">

        {/* Sticky Exit Button (Top Left) */}
        <div className="absolute top-6 left-6 z-40">
          <Link href="/experience">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900 cursor-none">
              Exit Simulation
            </Button>
          </Link>
        </div>

        {/* The Petition Form */}
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-slate-900">Climate Action Petition</h1>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Official Document</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong>To the Legislative Council:</strong>
              </p>
              <p>
                We, the undersigned citizens, demand immediate legislative action to reduce carbon emissions by
                <span className="text-slate-400"> 50% </span> (hard to read low contrast) by the year 2030.
                The scientific consensus is clear: climate change represents an existential threat to our ecosystem
                and future generations.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs text-slate-500">
                <p className="mb-2 font-bold text-slate-700">Terms of Signature:</p>
                <p>
                  By signing this document, you acknowledge that your name will be entered into the public record
                  and may be displayed on the council website for verification purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#1351aa] focus:border-[#1351aa] outline-none transition-all cursor-none"
                placeholder="e.g. Sok Piseth"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-[#1351aa] focus:border-[#1351aa] outline-none transition-all cursor-none"
                placeholder="name@example.com"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setSigned(true)}
                className="w-full bg-[#1351aa] hover:bg-[#0f4291] text-white font-bold h-12 rounded-lg shadow-lg cursor-none"
              >
                Sign Petition
              </Button>
              <p className="text-[10px] text-center text-slate-400 mt-3">
                Secure transmission encrypted via 256-bit SSL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
