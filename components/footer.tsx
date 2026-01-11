"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="bg-black text-white py-16 border-t border-white/20">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/alt-access-white-logo.png"
                alt="Alt Access Logo"
                width={240}
                height={60}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/experience"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.experiences}
                </Link>
              </li>
              <li>
                <Link
                  href="/#video-series"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.videoSeries}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t.footer.simulationsTitle}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/experience/total-blindness"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.totalBlindness}
                </Link>
              </li>
              <li>
                <Link
                  href="/experience/low-vision"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.lowVision}
                </Link>
              </li>
              <li>
                <Link
                  href="/experience/color-blindness"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.colorBlindness}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">{t.footer.connect}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@altaccess.com"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  {t.footer.email}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-2 py-1 rounded text-sm text-slate-400 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="inline-block px-2 py-1 rounded text-sm text-slate-500 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="inline-block px-2 py-1 rounded text-sm text-slate-500 transition-all duration-300 hover:bg-[#E69F00] hover:text-black focus-visible:ring-2 focus-visible:ring-[#E69F00] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
