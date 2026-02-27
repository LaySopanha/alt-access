"use client"

import * as React from "react"

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


export function Navbar({ theme = "light", showLogo = false }: { theme?: "light" | "dark", showLogo?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const pageLinks = [
    { label: t.nav.home, href: "/", color: "bg-wong-vermilion", hoverColor: "hover:text-wong-vermilion" },
    { label: t.nav.simulations, href: "/experience", color: "bg-wong-yellow", hoverColor: "hover:text-wong-yellow" },
    { label: t.nav.learningCenter, href: "/learning-center", color: "bg-wong-sky-blue", hoverColor: "hover:text-wong-sky-blue" },
    { label: t.nav.videos, href: "/videos", color: "bg-wong-dark-blue", hoverColor: "hover:text-wong-dark-blue" },
    { label: t.nav.about, href: "/about", color: "bg-wong-teal", hoverColor: "hover:text-wong-teal" },
  ]

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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* The Color Bar IS the Navbar */}
      <div className="w-full flex h-12 md:h-14">



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

        {/* Mobile: show thin color bar and a MENU button */}
        <div className="flex md:hidden flex-1 relative bg-white">
          {/* Thin color bar at the top */}
          <div className="absolute top-0 left-0 w-full flex h-2 z-10">
            {pageLinks.map((link) => (
              <div key={`color-${link.href}`} className={cn("flex-1", link.color)} />
            ))}
          </div>

          {/* Menu button */}
          <button
            onClick={handleMenuToggle}
            className="w-full flex items-center justify-between px-6 pt-2 h-full text-black hover:bg-stone-100 transition-colors"
          >
            <span className="font-bold uppercase tracking-widest text-sm">
              Menu
            </span>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Controls section — hidden for now */}
        <div className="flex items-center shrink-0">
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
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      {(isMenuOpen || isClosing) && (
        <div className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center items-center gap-12 duration-300 md:hidden bg-black text-white",
          isClosing ? "animate-out slide-out-to-top" : "animate-in slide-in-from-top"
        )}>
          {/* Grid background pattern */}
          <div className="absolute inset-0 z-0 opacity-20">
            <svg width="100%" height="100%" className="w-full h-full" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="nav-grid-bg" patternUnits="userSpaceOnUse" width="40" height="40">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#nav-grid-bg)" />
            </svg>
          </div>

          {/* X Close Button */}
          <button
            onClick={handleMenuToggle}
            className="absolute top-6 right-6 z-50 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col w-full relative z-10 mt-16 overflow-y-auto pb-24">
            {pageLinks.map((link, index) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMenuToggle}
                  className={`block w-full py-8 px-8 border-b border-white/10 text-4xl sm:text-5xl font-bold tracking-tight uppercase group ${link.hoverColor} transition-colors duration-300`}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-stone-500 group-hover:text-white transition-colors block shrink-0 w-8">
                      0{index + 1}
                    </span>
                    <span>{link.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer Details */}
          <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-white/50 font-mono text-xs uppercase tracking-widest z-10 glass-panel border border-white/10 px-4 py-3 pb-safe bg-black/80 backdrop-blur-md">
            <span>Alt Access</span>
            <span>Est. 2024</span>
          </div>
        </div>
      )}
    </header>
  )
}
