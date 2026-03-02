"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const THEME_KEY = "portfolio-theme";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem(THEME_KEY);
    const initial: Theme = saved === "light" || saved === "dark" ? saved : "dark";

    root.classList.remove("light", "dark");
    root.classList.add(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) {
      return;
    }

    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="rounded-xl"
    >
      {!mounted || theme === "dark" ? (
        <FiSun className="h-4 w-4" />
      ) : (
        <FiMoon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;

