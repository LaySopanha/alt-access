"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"

const pageLinks = [
  { label: "Home", href: "/", color: "bg-wong-vermilion" },
  { label: "Simulations", href: "/experience", color: "bg-wong-yellow" },
  { label: "Learning Center", href: "/learning-center", color: "bg-wong-sky-blue" },
  { label: "Videos", href: "/videos", color: "bg-wong-dark-blue" },
  { label: "About", href: "/about", color: "bg-wong-teal" },
]


export function Navbar({ theme = "light", showLogo = false }: { theme?: "light" | "dark", showLogo?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  // Hamburger menu only for homepage
  const isHome = pathname === "/"

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsMenuOpen(false)
        setIsClosing(false)
      }, 300)
    } else {
      setIsMenuOpen(true)
    }
  }

  React.useEffect(() => {
    if (isMenuOpen && isHome) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isHome])

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* The Color Bar IS the Navbar */}
      <div className="w-full flex h-12 md:h-14">

        {/* Logo section (before the color blocks) */}
        <Link href="/" className="bg-white flex items-center px-4 md:px-6 shrink-0 hover:opacity-80 transition-opacity">
          <Image
            src="/images/alt-access-black-logo.png"
            alt="Alt Access Logo"
            width={160}
            height={40}
            className="h-6 md:h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* Color block nav links - each link is a colored rectangle */}
        <nav className="hidden md:flex flex-1">
          {pageLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex-1 flex items-center justify-center text-xs font-bold uppercase tracking-widest transition-all duration-200",
                  isActive
                    ? "bg-black text-white"
                    : cn(link.color, link.color === "bg-wong-yellow" ? "text-black/80 hover:text-black" : "text-white/80 hover:text-white")
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile: show collapsed color bar */}
        <div className="flex md:hidden flex-1">
          {pageLinks.map((link) => (
            <div key={link.href} className={cn("flex-1", link.color)} />
          ))}
        </div>

        {/* Controls section */}
        <div className="bg-white flex items-center gap-2 px-3 md:px-4 shrink-0">
          {/* Language Toggler (hidden for now) */}
          {/*
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-stone-300 w-8 h-8 hover:bg-stone-100 transition-all"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black text-white border-white">
              <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as "en" | "km")}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="km">ភាសាខ្មែរ (Khmer)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          */}

          {/* Hamburger Menu Toggle: only on homepage */}
          {/* Hamburger Menu Toggle: temporarily hidden */}
          {/*
          {isHome && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full border transition-all duration-300 w-9 h-9",
                isMenuOpen ? "bg-black text-white border-black" : "text-black border-stone-300 hover:bg-stone-100"
              )}
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          */}
        </div>
      </div>

      {/* Full Screen Menu Overlay (Table of Contents for homepage scrolling) - only on homepage */}
      {/* Hamburger menu overlay temporarily hidden */}
      {false && isHome && (isMenuOpen || isClosing) && (
        <div className={cn(
          "fixed inset-0 z-40 bg-wong-yellow flex flex-col justify-center items-center gap-12 duration-300",
          isClosing ? "animate-out slide-out-to-top" : "animate-in slide-in-from-top"
        )}>
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* X Close Button */}
          <button
            onClick={handleMenuToggle}
            className="absolute top-8 right-8 z-50 rounded-full border border-black bg-white text-black w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          <nav className="flex flex-col items-start gap-4 relative z-10 max-w-2xl w-full px-12">
            <span className="font-mono text-xs uppercase tracking-widest border-b border-black/20 w-full pb-4 mb-4 text-stone-600">Table of Contents</span>

            {/* Mobile: Show page links here too */}
            <div className="md:hidden flex flex-col gap-3 w-full mb-6 border-b border-black/10 pb-6">
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMenuToggle}
                  className="text-lg font-bold text-black hover:text-stone-600 transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#hero"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">00</span>
              Accessibility is Not Optional.
            </Link>

            <Link
              href="/#simulations"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">01</span>
              Feel how the visually impaired experience the web
            </Link>

            <Link
              href="/#spectrum"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">02</span>
              The Spectrum
            </Link>

            <Link
              href="/#curb-cut"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">03</span>
              Inclusive Design
            </Link>

            <Link
              href="/#motivation"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">04</span>
              The Motivation
            </Link>

            <Link
              href="/#wcag"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">05</span>
              The Standard
            </Link>

            <Link
              href="/#videos"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">06</span>
              The Campaign
            </Link>

            <Link
              href="/#learning-center"
              onClick={handleMenuToggle}
              className="text-3xl md:text-5xl font-bold text-black hover:text-white hover:indent-6 transition-all duration-300 w-full"
            >
              <span className="text-sm font-medium mr-3 opacity-40 align-middle">07</span>
              The Learning Center
            </Link>
          </nav>

          <div className="absolute bottom-10 left-10 md:left-20 text-black font-mono text-xs uppercase tracking-widest border-t border-black/20 pt-4">
            {t.footer.copyright}
          </div>
        </div>
      )}
    </header>
  )
}
