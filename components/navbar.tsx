"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

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

  // Disable scrolling when menu is open
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

  // Minimalist Theme Configuration - High Contrast, No "Glass"
  const themes = {
    light: {
      text: "text-black",
      hover: "hover:bg-black/10",
      logo: "/images/alt-access-black-logo.png",
      border: "border-black", // Solid borders
      mobileBg: "bg-wong-vermilion",
      mobileText: "text-white",
    },
    dark: {
      text: "text-black",
      hover: "hover:bg-black/10",
      logo: "/images/alt-access-black-logo.png", // Assuming existence, or handle contrast
      border: "border-black",
      mobileBg: "bg-white",
      mobileText: "text-black",
    },
  }

  const currentTheme = themes["light"] // Force campaign theme for now on home

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto flex justify-between items-start p-6 md:p-10 pointer-events-none">

        {/* 1. Logo - Optional (For subsection pages) */}
        <div className={cn("transition-opacity duration-300 pointer-events-auto", showLogo ? "opacity-100" : "opacity-0 invisible h-0 w-0")}>
          {showLogo && (
            <Link href="/" className="block relative hover:scale-105 transition-transform duration-300">
              <Image
                src={currentTheme.logo}
                alt="Alt Access Logo"
                width={300}
                height={80}
                className="h-14 md:h-16 w-auto object-contain"
                priority
              />
            </Link>
          )}
        </div>

        {/* 2. Minimalist Controls (No traditional Nav) */}
        <div className="flex items-center gap-4 relative z-50 pointer-events-auto">

          {/* Language Toggler - Minimal Ghost Button */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full border-2 transition-all duration-300",
                  currentTheme.text,
                  currentTheme.border,
                  currentTheme.hover
                )}
              >
                <Globe className="h-5 w-5" />
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

          {/* Menu Trigger - Massive & Iconic */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full border-2 transition-all duration-300 w-12 h-12",
              isMenuOpen ? "bg-black text-white border-black" : cn(currentTheme.text, currentTheme.border, currentTheme.hover)
            )}
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* 3. Full Screen Menu Overlay - "The Campaign Menu" */}
        {(isMenuOpen || isClosing) && (
          <div className={cn(
            "fixed inset-0 z-40 bg-wong-yellow flex flex-col justify-center items-center gap-12 duration-300",
            isClosing ? "animate-out slide-out-to-top" : "animate-in slide-in-from-top"
          )}>
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:20px_20px]" />

            <nav className="flex flex-col items-start gap-4 relative z-10 max-w-2xl w-full px-12">
              <span className="font-mono text-sm uppercase tracking-widest border-b-2 border-black w-full pb-4 mb-4">Table of Contents</span>

              <Link
                href="/"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">00</span>
                Cover
              </Link>

              <Link
                href="#chapter-1"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">01</span>
                The Spectrum
              </Link>

              <Link
                href="#chapter-2"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">02</span>
                Inclusive Design
              </Link>

              <Link
                href="#chapter-3"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">03</span>
                The Motivation
              </Link>

              <Link
                href="#chapter-4"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">04</span>
                The Standard
              </Link>

              <Link
                href="#chapter-5"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">05</span>
                The Practice
              </Link>

              <Link
                href="#chapter-6"
                onClick={handleMenuToggle}
                className="text-4xl md:text-6xl font-serif font-bold text-black hover:text-white hover:indent-8 transition-all duration-300 w-full"
              >
                <span className="font-sans text-sm font-bold mr-4 opacity-50 align-middle">06</span>
                The Curriculum
              </Link>
            </nav>

            <div className="absolute bottom-10 left-10 md:left-20 text-black font-mono text-sm uppercase tracking-widest border-t-2 border-black pt-4">
              {t.footer.copyright}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
