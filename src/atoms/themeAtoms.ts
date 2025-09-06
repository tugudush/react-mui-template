import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type ThemeMode = 'light' | 'dark'

// Helper function to detect system preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Atom that persists theme to localStorage with system preference fallback
export const themeModeAtom = atomWithStorage<ThemeMode>(
  'theme-mode',
  getSystemTheme()
)

// Derived atom for toggling theme
export const toggleThemeAtom = atom(
  null, // write-only atom
  (get, set) => {
    const currentMode = get(themeModeAtom)
    set(themeModeAtom, currentMode === 'light' ? 'dark' : 'light')
  }
)
