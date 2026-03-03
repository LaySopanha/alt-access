"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-8 md:px-24">

        {/* Top Grid: Links & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between items-start">
            <Image
              src="/images/alt-access-black-logo.png"
              alt="Alt Access Logo"
              width={160}
              height={50}
              quality={85}
              className="h-12 w-auto object-contain object-left mb-6"
            />
            <p className="font-sans text-base font-medium leading-relaxed max-w-xs text-stone-600">
              The digital guide to accessibility.
              <br />
              Educating through experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Explore</span>
              <ul className="space-y-3 font-bold text-lg">
                <li><Link href="/" className="hover:text-wong-vermilion transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-wong-vermilion transition-colors">About</Link></li>
                <li><Link href="/videos" className="hover:text-wong-vermilion transition-colors">Videos</Link></li>
                <li><Link href="/learning-center" className="hover:text-wong-vermilion transition-colors">Learning Center</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Simulations</span>
              <ul className="space-y-3 font-bold text-lg">
                <li><Link href="/experience" className="hover:text-wong-vermilion transition-colors">All Simulations</Link></li>
                <li><Link href="/experience/total-blindness" className="hover:text-wong-vermilion transition-colors">Total Blindness</Link></li>
                <li><Link href="/experience/low-vision" className="hover:text-wong-vermilion transition-colors">Low Vision</Link></li>
                <li><Link href="/experience/color-blindness" className="hover:text-wong-vermilion transition-colors">Color Blindness</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-4 block">Connect</span>
              <ul className="space-y-3 font-bold text-lg">
                <li><a href="mailto:altaccess.initiative@gmail.com" className="hover:text-wong-vermilion transition-colors">Email</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61584750749150" target="_blank" rel="noopener noreferrer" className="hover:text-wong-vermilion transition-colors">Facebook</a></li>
                <li><a href="https://www.instagram.com/altaccessinitiative/" target="_blank" rel="noopener noreferrer" className="hover:text-wong-vermilion transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sponsors Section - More Compact */}
        <div className="mb-12 border-t border-stone-100 pt-8">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-6 block">With Support From</span>

          <div className="flex flex-wrap items-center justify-start gap-x-12 gap-y-8 opacity-100">
            {/* 1. EU Logo - Reference */}
            <Image
              src="/images/EU-logo.png"
              alt="European Union"
              width={100}
              height={50}
              quality={85}
              className="h-12 w-auto object-contain"
            />

            {/* 2. IMS - Needs to be bigger */}
            <Image
              src="/images/IMS-logo.png"
              alt="IMS"
              width={140}
              height={70}
              quality={85}
              className="h-14 w-auto object-contain"
            />

            {/* 3. Prosob - Smaller to match Impact Hub */}
            <div className="flex items-center gap-8">
              <Image
                src="/images/prosob.jpg"
                alt="Prosob"
                width={90}
                height={45}
                quality={85}
                className="h-10 w-auto object-contain mix-blend-multiply"
              />

              {/* 4. Impact Hub - Reference for Prosob */}
              <Image
                src="/images/impacthub-pp-logo.png"
                alt="Impact Hub"
                width={120}
                height={60}
                quality={85}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-stone-100 pt-8">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-6xl leading-none -ml-1 text-stone-200 select-none">A11Y</span>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400">© {new Date().getFullYear()} Alt Access.</span>
          </div>

          <div className="flex gap-6 mt-8 md:mt-0 font-mono text-xs uppercase tracking-widest text-stone-400">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
