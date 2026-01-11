"use client"

import Image from "next/image"
import Link from "next/link"
import { Code2, Users, Lightbulb, GraduationCap } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-[#ff751f] selection:text-white">
      <Navbar theme="light" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#1351aa] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-[#ff751f] text-xs font-bold tracking-widest uppercase backdrop-blur-md mb-6">
              <span>Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Bridging the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff751f] to-orange-300">
                Digital Divide
              </span>{" "}
              in Cambodia.
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
              We are cultivating a national tech ecosystem where accessibility is standard practice—creating technology
              that serves all Cambodians, including the 120,000+ living with visual impairments.
            </p>
          </div>
        </div>

        {/* Diagonal Cut for dynamic transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 [clip-path:polygon(0_100%,100%_100%,100%_0)]" />
      </section>

      {/* --- THE PROBLEM (DATA) --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Data Viz */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1351aa]/10 to-[#ff751f]/10 rounded-3xl blur-2xl -z-10" />
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-[#1351aa]">120,000+</div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#1351aa] rounded-full" />
                    </div>
                    <p className="text-slate-500 font-medium">Visually impaired individuals in Cambodia</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-slate-800">600,000</div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-slate-800 rounded-full" />
                    </div>
                    <p className="text-slate-500 font-medium">Tech students graduated (2015-2025)</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-[#ff751f]">0</div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[5%] bg-[#ff751f] rounded-full" />
                    </div>
                    <p className="text-slate-500 font-medium">Standard lessons on accessibility</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Narrative */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1351aa]">The Knowledge Gap</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Despite a rapidly growing developer population in Phnom Penh, digital accessibility remains severely
                limited. Most Cambodian tech students have <strong>never received formal training</strong> in inclusive
                design.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This results in digital products that unintentionally exclude thousands of users from essential
                services, education, and daily life.
              </p>
              <div className="pt-4">
                <Link href="/experience">
                  <Button className="bg-[#1351aa] hover:bg-[#0f4291] text-white rounded-full px-8 h-12">
                    See the Impact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE PERSONA (NESTAR) --- */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#1351aa]/5 -skew-x-12" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#ff751f] font-bold uppercase tracking-widest text-xs">
                <Users className="w-4 h-4" />
                <span>Who we build for</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">Meet "Nestar"</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nestar represents our core audience: <strong>Young Cambodian tech students (18-25)</strong> based in
                Phnom Penh.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Inspired by a real team member, Nestar is capable, curious, and determined—but he realized during a
                hackathon that he had <strong>zero exposure</strong> to accessible design standards. He wants to build
                better products, he just needs the right tools.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              {/* Persona Card */}
              <div className="bg-white p-6 rounded-2xl shadow-2xl border-l-8 border-[#ff751f] max-w-sm w-full rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl">
                    👨‍💻
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">Nestar</h3>
                    <p className="text-slate-500 text-sm">CS Senior • Phnom Penh</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">Goal</p>
                    <p className="text-slate-700 font-medium">To become a senior full-stack developer.</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-400 uppercase font-bold">Frustration</p>
                    <p className="text-slate-700 font-medium">
                      "I want to make my app accessible, but I don't know where to start."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR SOLUTION (GRID) --- */}
      <section className="py-24 bg-[#0B0F19] text-white">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The Alt Access Solution</h2>
            <p className="text-slate-400 text-lg">
              We use media to spark curiosity and technology to provide the answers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 hover:border-[#ff751f]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#1351aa]/20 rounded-xl flex items-center justify-center text-[#1351aa] mb-6 group-hover:bg-[#1351aa] group-hover:text-white transition-all">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interactive Learning Hub</h3>
              <p className="text-slate-400 leading-relaxed">
                A centralized digital archive containing WCAG resources, code snippets, and our custom accessibility
                simulators.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 hover:border-[#ff751f]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#ff751f]/20 rounded-xl flex items-center justify-center text-[#ff751f] mb-6 group-hover:bg-[#ff751f] group-hover:text-white transition-all">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Video Campaign</h3>
              <p className="text-slate-400 leading-relaxed">
                A "Vox-style" educational series that highlights real accessibility gaps and shares insights from the
                blind community.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 hover:border-[#ff751f]/50 transition-colors group">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-500 group-hover:text-white transition-all">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">University Outreach</h3>
              <p className="text-slate-400 leading-relaxed">
                Physical engagement at universities and community events (Khmer Coder) to provide hands-on exposure to
                tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNERS --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Collaborating With</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale hover:grayscale-0 transition-all duration-500">
            <Image
              src="/images/ihpp-logo-2.webp"
              alt="Impact Hub Phnom Penh"
              width={280}
              height={80}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/images/prosob.jpg"
              alt="Prosob"
              width={80}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
