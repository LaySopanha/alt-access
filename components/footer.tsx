"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const { language, t } = useLanguage()

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold inline-block mb-4">
              {t.nav.logo}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/experience" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t.footer.experiences}
                </Link>
              </li>
              <li>
                <Link href="/#video-series" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t.footer.videoSeries}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.simulationsTitle}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/experience/total-blindness"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {t.footer.totalBlindness}
                </Link>
              </li>
              <li>
                <Link
                  href="/experience/low-vision"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {t.footer.lowVision}
                </Link>
              </li>
              <li>
                <Link
                  href="/experience/color-blindness"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {t.footer.colorBlindness}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.connect}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@altaccess.com"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {t.footer.email}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
