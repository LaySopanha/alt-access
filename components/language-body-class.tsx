"use client"

import { useLanguage } from "@/hooks/use-language"
import { useEffect } from "react"

export function LanguageBodyClass({ children }: { children: React.ReactNode }) {
    const { language } = useLanguage()

    useEffect(() => {
        const html = document.documentElement
        if (language === "km") {
            html.classList.add("lang-km")
            html.setAttribute("lang", "km")
        } else {
            html.classList.remove("lang-km")
            html.setAttribute("lang", "en")
        }
    }, [language])

    return <>{children}</>
}
