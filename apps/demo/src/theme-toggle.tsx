import { Button } from "@tiptap-editor/ui-primitives"
import { MoonStarIcon, SunIcon } from "@tiptap-editor/ui-components"
import { useEffect, useState } from "react"

const THEME_STORAGE_KEY = "tiptap-editor-theme"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored) return stored === "dark"
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })

  useEffect(() => {
    // Update DOM and localStorage when theme changes
    document.documentElement.classList.toggle("dark", isDarkMode)
    localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      data-style="ghost"
    >
      {isDarkMode ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  )
}
