"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Eye, FileText, CheckCircle2, ScanEye } from "lucide-react"

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
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(#1351aa_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1351aa]/5 rounded-full blur-[100px]" />

        <div className="max-w-3xl w-full space-y-8 relative z-10">
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
                <Eye className="w-4 h-4" />
                <span>Visual Simulation 02</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1351aa]">
                Low Vision Lab
              </h1>
            </div>

            <div className="space-y-6 border-l-4 border-[#ff751f] pl-6 py-2">
              <h2 className="text-xl font-bold text-slate-900">Mission</h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                Experience <strong>Scotomas (Blind Spots)</strong> with Peripheral Loss.
                <br /><br />
                In this simulation, your peripheral vision is blurred (Glaucoma), and your central focus is obstructed by <strong>dark floating blobs</strong> (Diabetic Retinopathy).
                <br />
                <strong>Goal:</strong> Read the text <em>around</em> the blobs to find the inputs and sign the petition.
              </p>
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

  // --- SUCCESS SCREEN ---
  if (signed) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(#1351aa_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

        <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-200 text-center relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1351aa] mb-4">Mission Complete</h1>

          <div className="space-y-4 mb-8 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Lab Report</h3>
            <p className="text-slate-600 leading-relaxed">
              That was frustrating, wasn't it? The "blobs" forced you to constantly move your mouse to read simple text.
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <span className="text-[#ff751f]">•</span>
                <span><strong>Impact:</strong> Users with scotomas cannot "scan" a page. They read letter-by-letter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff751f]">•</span>
                <span><strong>Solution:</strong> Large, bold typography and clear proximity between labels and inputs reduces the mental mapping required.</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/experience">
              <Button variant="outline" size="lg" className="rounded-xl h-12 px-8 border-slate-300">
                Exit Lab
              </Button>
            </Link>
            <Button
              onClick={() => { setSigned(false); setStarted(false); }}
              size="lg"
              className="bg-[#1351aa] hover:bg-[#0f4291] text-white rounded-xl h-12 px-8"
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
