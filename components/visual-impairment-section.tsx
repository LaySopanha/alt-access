"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function VisualImpairmentSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-gradient-to-b from-[#1351aa]/20 via-slate-50 to-white text-slate-900 py-24 lg:py-32 relative overflow-hidden">
      {/* Background Pattern with Smooth Fade-out Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        {/* The Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1351aa_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]" />

        {/* Ambient Glow for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1351aa]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT: Content */}
          <div className="relative z-10 space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] text-[#1351aa] drop-shadow-sm">
                {t.visualImpairment.mainTitle.split("...")[0]} <br />
                <span className=" bg-clip-text bg-gradient-to-r text-[#ff751f] to-orange-400">
                  {t.visualImpairment.mainTitle.split("...")[1]}
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light max-w-lg">
                {t.visualImpairment.description}
              </p>

              <div className="bg-[#1351aa]/5 border-l-2 border-[#ff751f] p-4 rounded-r-lg max-w-md">
                <p className="text-slate-700 font-medium text-sm flex gap-2">
                  <svg
                    className="w-5 h-5 text-[#ff751f] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  <span>{t.visualImpairment.codeExample}</span>
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-2">
              <div>
                <div className="text-4xl font-serif font-bold text-[#1351aa] mb-1">98%</div>
                <div className="text-sm text-slate-600 tracking-wide uppercase opacity-80">
                  {t.visualImpairment.webIncompatibility}
                </div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-[#ff751f]">120k+</div>
                <div className="text-sm text-slate-600 tracking-wide uppercase opacity-80">
                  {t.visualImpairment.usersImpacted}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/experience"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1351aa] text-white font-semibold hover:bg-[#ff751f] transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(19,81,170,0.4)]"
              >
                {t.visualImpairment.exploreCta}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT: The "DevTools Inspector" Visual */}
          <div className="relative perspective-1000 group">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[#ff751f]/20 blur-3xl rounded-full transform translate-x-10 translate-y-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-700" />

            {/* Main Browser Card */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 transform transition-transform duration-500 hover:scale-[1.01]">
              {/* Browser Header */}
              <div className="bg-[#1e1e2e] px-4 py-3 flex items-center gap-4 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-black/20 rounded-md h-6 flex items-center px-3">
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    localhost:3000/accessibility-demo
                  </span>
                </div>
              </div>

              {/* Viewport Area */}
              <div className="relative aspect-[4/3] bg-slate-100">
                <img
                  src="/blurred-vision-accessibility-simulation.jpg"
                  alt="Visual Impairment Illustration"
                  className="w-full h-full object-cover"
                />

                {/* The Code Panel (DevTools Style) */}
                <div className="absolute bottom-6 left-6 right-auto bg-[#1e1e2e]/95 backdrop-blur-md text-slate-300 p-4 rounded-lg shadow-2xl border-l-4 border-[#ff751f] max-w-sm transform transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                    <svg
                      className="w-4 h-4 text-[#ff751f]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {t.visualImpairment.inspector}
                    </span>
                  </div>
                  <div className="font-mono text-xs md:text-sm leading-relaxed">
                    <div>
                      <span className="text-purple-400">&lt;img</span> <span className="text-cyan-400">src</span>="..."
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">alt</span>=<span className="text-[#a5d6ff]">"</span>
                      <span className="text-green-400 font-semibold bg-green-400/10 px-1 rounded">
                        {t.visualImpairment.altTextExample}
                      </span>
                      <span className="text-[#a5d6ff]">"</span>
                    </div>
                    <div>
                      <span className="text-purple-400">/&gt;</span>
                    </div>
                  </div>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#1351aa] text-xs font-bold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {t.visualImpairment.voiceOverOutput}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
