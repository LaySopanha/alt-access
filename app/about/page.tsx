import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, Eye, Film, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | AltAccess",
  description: "Alt Access is a media and learning campaign educating Cambodian tech students about digital accessibility, supported by Prosob and funded by the European Union.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar showLogo />
      <main className="bg-[#FDFCF8] min-h-screen pt-14">

        {/* Hero - Full Impact */}
        <section className="bg-stone-900 text-white px-8 md:px-24 py-28 relative" style={{ clipPath: 'inset(0)' }}>
          {/* Team Gallery - Stationary Parallax */}
          <div className="fixed inset-0 w-full h-full opacity-[0.15] mix-blend-luminosity pointer-events-none z-0">
            <Image
              src="/images/team/alt-access-team-donating-to-civilians-during-conflict.PNG"
              alt="Alt Access Team Donating"
              fill
              className="object-cover" style={{ objectPosition: 'center 25%' }}
              priority
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3">
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500 mb-6 block">About Alt Access</span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-8">
                Building<br />Technology<br />
                <span className="text-wong-vermilion">For Everyone.</span>
              </h1>
              <p className="text-lg text-stone-400 leading-relaxed max-w-lg">
                A media and learning campaign educating Cambodia's next generation of developers about digital accessibility.
              </p>
            </div>
            {/* Removed Supported By, Funded By, Built For blocks as requested */}
          </div>
        </section>



        {/* Mission Statement */}
        <section className="px-8 md:px-24 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-12 h-0.5 bg-wong-vermilion mx-auto mb-8"></div>
            <blockquote className="text-2xl md:text-4xl font-bold tracking-tight leading-snug text-stone-800 mb-8">
              "Despite a rapidly growing developer population, most Cambodian tech students have never received formal training in inclusive design."
            </blockquote>
            <p className="text-base text-stone-500 max-w-2xl mx-auto leading-relaxed">
              This results in digital products that unintentionally exclude thousands of users from essential services, education, and daily life. Alt Access exists to change that.
            </p>
          </div>
        </section>

        {/* What We Do - Cards */}
        <section className="px-8 md:px-24 py-20 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-16">
              <div className="h-0.5 w-10 bg-black"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">What We Do</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-200">
              {/* Card 1 */}
              <Link href="/experience" className="group p-8 md:p-10 border-b md:border-b-0 md:border-r border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="w-10 h-10 bg-wong-vermilion/10 flex items-center justify-center mb-6">
                  <Eye className="w-5 h-5 text-wong-vermilion" />
                </div>
                <span className="text-6xl font-bold text-stone-100 block mb-4">01</span>
                <h3 className="text-xl font-bold mb-3">Interactive Simulations</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">
                  Experience what it's like to browse the web with low vision, color blindness, or total blindness.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-wong-vermilion group-hover:gap-2 transition-all">
                  Try Now <ArrowRight className="w-3 h-3" />
                </span>
              </Link>

              {/* Card 2 */}
              <Link href="/videos" className="group p-8 md:p-10 border-b md:border-b-0 md:border-r border-stone-200 hover:bg-stone-50 transition-colors">
                <div className="w-10 h-10 bg-wong-blue/10 flex items-center justify-center mb-6">
                  <Film className="w-5 h-5 text-wong-blue" />
                </div>
                <span className="text-6xl font-bold text-stone-100 block mb-4">02</span>
                <h3 className="text-xl font-bold mb-3">Video Series</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">
                  5 documentary-style episodes covering WCAG, the curb cut effect, and why accessible coding matters.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-wong-blue group-hover:gap-2 transition-all">
                  Watch <ArrowRight className="w-3 h-3" />
                </span>
              </Link>

              {/* Card 3 */}
              <Link href="/learning-center" className="group p-8 md:p-10 hover:bg-stone-50 transition-colors">
                <div className="w-10 h-10 bg-wong-yellow/20 flex items-center justify-center mb-6">
                  <BookOpen className="w-5 h-5 text-wong-yellow" />
                </div>
                <span className="text-6xl font-bold text-stone-100 block mb-4">03</span>
                <h3 className="text-xl font-bold mb-3">Learning Center</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">
                  WCAG resources, code examples, and practical guides for developers starting their accessibility journey.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-wong-yellow group-hover:gap-2 transition-all">
                  Learn <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Community & Impact */}
        <section className="px-8 md:px-24 py-20 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="h-0.5 w-10 bg-wong-blue"></div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-500">Our Community</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-stone-200 relative aspect-[4/3] overflow-hidden border border-stone-300">
                <Image
                  src="/images/team/media-hackathon-group-photo.JPG"
                  alt="Media Hackathon Participants"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-lg md:text-xl leading-tight">Media Solution Hackathon Participants</p>
                </div>
              </div>
              <div className="group bg-stone-200 relative aspect-[4/3] overflow-hidden border border-stone-300">
                <Image
                  src="/images/team/presenting-for-HE-Chea-Vandeth-DGF.JPG"
                  alt="Presenting to H.E. Mr. VANDETH CHEA, the Minister of Ministry of Post and Telecommunications"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-lg md:text-xl leading-tight">Presenting Accessibility Concepts to H.E. Mr. VANDETH CHEA, Minister of Ministry of Post and Telecommunications</p>
                </div>
              </div>
            </div>
          </div>
        </section>



      </main>
      <Footer />
    </>
  )
}
