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

export function Navbar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // Theme configuration
  const themes = {
    light: {
      text: "text-white",
      hover: "hover:bg-white/10",
      logo: "/images/alt-access-white-logo.png",
      border: "border-white/20",
      mobileBg: "bg-[#1351aa]",
      mobileText: "text-white",
    },
    dark: {
      text: "text-slate-900",
      hover: "hover:bg-slate-100",
      logo: "/images/alt-access-black-logo.png",
      border: "border-slate-200",
      mobileBg: "bg-white",
      mobileText: "text-slate-900",
    },
  }

  const currentTheme = themes[theme]

  return (
    <header className="absolute top-0 left-0 w-full z-50 p-6 md:p-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="inline-block relative z-50">
          <Image
            src={currentTheme.logo}
            alt="Alt Access Logo"
            width={240}
            height={60}
            className="h-10 md:h-20 w-auto object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-lg font-medium transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1",
              currentTheme.text
            )}
          >
            {t.nav.home}
          </Link>
          <Link
            href="/experience"
            className={cn(
              "text-lg font-medium transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1",
              currentTheme.text
            )}
          >
            {t.nav.experience}
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-lg font-medium transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1",
              currentTheme.text
            )}
          >
            {t.nav.about}
          </Link>

          <div className={cn("h-6 w-px", theme === "light" ? "bg-white/20" : "bg-slate-200")} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(currentTheme.text, currentTheme.hover)}>
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as "en" | "km")}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="km">ភាសាខ្មែរ (Khmer)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4 relative z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isMenuOpen ? themes.dark.text : currentTheme.text)}>
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as "en" | "km")}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="km">ភាសាខ្មែរ (Khmer)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className={cn(isMenuOpen ? themes.dark.text : currentTheme.text)}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center gap-8 animate-in slide-in-from-top-10 duration-200">
            <nav className="flex flex-col items-center gap-8 text-2xl font-serif font-bold text-slate-900">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/experience"
                onClick={() => setIsMenuOpen(false)}
                className="transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1"
              >
                {t.nav.experience}
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="transition-all duration-300 hover:underline hover:decoration-4 hover:underline-offset-8 hover:decoration-[#E69F00] hover:text-[#E69F00] focus-visible:ring-4 focus-visible:ring-[#E69F00] focus-visible:outline-none rounded-sm px-1"
              >
                {t.nav.about}
              </Link>
            </nav>

            <div className="absolute bottom-10 text-sm text-slate-400">
              {t.footer.copyright}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
