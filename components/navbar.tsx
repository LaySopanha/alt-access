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

export function Navbar({ theme = "light", showLogo = false, forceSolidBg = false, gameMode = false }: { theme?: "light" | "dark", showLogo?: boolean, forceSolidBg?: boolean, gameMode?: boolean }) {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Scroll Detection — minimize as soon as user scrolls past the Hero section
  React.useEffect(() => {
    const handleScroll = () => {
      // Trigger when scrolled down slightly (e.g., 50px or half a viewport)
      // Since Hero is exactly 100vh, we can trigger slightly before leaving it 
      // or simply rely on a fixed scroll amount so it feels immediate.
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const isSolid = isScrolled || forceSolidBg;

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isSolid ? "bg-[#FDFCF8] border-b border-black/5 pointer-events-auto shadow-sm" : "bg-transparent pointer-events-none"
    )}>
      <div className={cn(
        "container mx-auto grid grid-cols-3 transition-all duration-500 relative z-10",
        isScrolled ? "p-3 md:p-4 items-center" : "p-6 md:p-10 items-start"
      )}>
        {/* Anti-Scroll Glitch Overlay for Game Mode */}
        {gameMode && (
          <div
            className="absolute inset-0 z-50 cursor-default"
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        )}
        {/* 1. Logo (Left Column) */}
        <div className={cn("flex justify-start transition-opacity duration-300 pointer-events-auto", showLogo ? "opacity-100" : "opacity-0 invisible h-0 w-0")}>
          {showLogo && (
            <Link href="/" className="block relative hover:scale-105 transition-transform duration-300">
              <Image
                src={currentTheme.logo}
                alt="Alt Access Logo"
                width={300}
                height={80}
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  isScrolled ? "h-10 md:h-12" : "h-14 md:h-16"
                )}
                priority
              />
            </Link>
          )}
        </div>

        {/* 2. Center Column (Empty) */}
        <div className="flex justify-center" />

        {/* 3. Controls (Right Column) */}
        {!gameMode && (
          <div className="flex justify-end items-center gap-4 relative z-50 pointer-events-auto">
            {/* Language Toggler */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full border-2 transition-all duration-300",
                    currentTheme.text,
                    currentTheme.border,
                    currentTheme.hover,
                    isScrolled ? "w-10 h-10" : "w-12 h-12"
                  )}
                >
                  <Globe className={cn("transition-all", isScrolled ? "h-4 w-4" : "h-5 w-5")} />
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

            {/* Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full border-2 transition-all duration-300",
                isMenuOpen ? "bg-black text-white border-black" : cn(currentTheme.text, currentTheme.border, currentTheme.hover),
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              )}
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X className={cn("transition-all", isScrolled ? "h-5 w-5" : "h-6 w-6")} /> : <Menu className={cn("transition-all", isScrolled ? "h-5 w-5" : "h-6 w-6")} />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        )}

        {/* 3. Full Screen Menu Overlay - "The Campaign Menu" */}
        {(isMenuOpen || isClosing) && (
          <div className={cn(
            "fixed inset-0 z-40 bg-wong-yellow flex flex-col justify-center items-center gap-12 duration-300 pointer-events-auto",
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
