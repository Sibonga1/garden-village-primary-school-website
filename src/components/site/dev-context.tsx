"use client";

/**
 * dev-context.tsx
 * ----------------------------------------------------------------------------
 * Global "Developer Mode" switch.
 *
 *  • Persisted to localStorage("gv-dev-mode") so it survives reloads.
 *  • Toggle with the floating DEV button (dev-panel.tsx, bottom-left).
 *  • Toggle with the keyboard: press  D  (ignored while typing in inputs).
 *
 *  useDevMode() → { enabled, toggle, set }
 *  Wrap the whole app in <DevModeProvider> and read enabled anywhere.
 * ----------------------------------------------------------------------------
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "gv-dev-mode";

type DevModeValue = {
  enabled: boolean;
  toggle: () => void;
  set: (v: boolean) => void;
};

const DevModeContext = createContext<DevModeValue>({
  enabled: false,
  toggle: () => {},
  set: () => {},
});

export function DevModeProvider({ children }: { children: ReactNode }) {
  // Lazy init from localStorage via useState initializer — runs once on the
  // client (returns false on the server since localStorage is undefined there).
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Keyboard shortcut: press "D" to toggle (skip when typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key !== "d") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
      e.preventDefault();
      setEnabled((v) => {
        const next = !v;
        try {
          localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
        } catch {
          /* ignore */
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const set = useCallback((v: boolean) => {
    setEnabled(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => set(!enabled), [enabled, set]);

  return (
    <DevModeContext.Provider value={{ enabled, toggle, set }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  return useContext(DevModeContext);
}
