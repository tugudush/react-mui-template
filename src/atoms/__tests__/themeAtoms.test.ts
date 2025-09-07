import { createStore } from 'jotai'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  type ThemeMode,
  themeModeAtom,
  toggleThemeAtom,
} from '@/atoms/themeAtoms'

// Mock window.matchMedia at module level
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Theme Atoms', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
    // Clear localStorage mocks
    vi.clearAllMocks()
  })

  describe('themeModeAtom', () => {
    it('should initialize with light theme when no system preference', () => {
      const mode = store.get(themeModeAtom)
      expect(mode).toBe('light')
    })

    it('should initialize with dark theme when system prefers dark', () => {
      // Mock matchMedia to return dark preference temporarily
      const originalMatchMedia = window.matchMedia
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }))

      // Clear the module cache and re-import to get fresh initialization
      vi.resetModules()

      // Re-import the atoms with dark theme preference
      return import('@/atoms/themeAtoms').then(({ themeModeAtom }) => {
        const newStore = createStore()
        const mode = newStore.get(themeModeAtom)
        expect(mode).toBe('dark')

        // Restore original matchMedia
        window.matchMedia = originalMatchMedia
      })
    })

    it('should update theme mode', () => {
      const newMode: ThemeMode = 'dark'
      store.set(themeModeAtom, newMode)

      const mode = store.get(themeModeAtom)
      expect(mode).toBe('dark')
    })

    it('should persist theme mode to localStorage', () => {
      const newMode: ThemeMode = 'dark'
      store.set(themeModeAtom, newMode)

      // Check if localStorage.setItem was called
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'theme-mode',
        JSON.stringify('dark')
      )
    })
  })

  describe('toggleThemeAtom', () => {
    it('should toggle from light to dark', () => {
      // Set initial state to light
      store.set(themeModeAtom, 'light')

      // Toggle theme
      store.set(toggleThemeAtom)

      const mode = store.get(themeModeAtom)
      expect(mode).toBe('dark')
    })

    it('should toggle from dark to light', () => {
      // Set initial state to dark
      store.set(themeModeAtom, 'dark')

      // Toggle theme
      store.set(toggleThemeAtom)

      const mode = store.get(themeModeAtom)
      expect(mode).toBe('light')
    })

    it('should toggle multiple times correctly', () => {
      // Start with light
      store.set(themeModeAtom, 'light')

      // First toggle: light -> dark
      store.set(toggleThemeAtom)
      expect(store.get(themeModeAtom)).toBe('dark')

      // Second toggle: dark -> light
      store.set(toggleThemeAtom)
      expect(store.get(themeModeAtom)).toBe('light')

      // Third toggle: light -> dark
      store.set(toggleThemeAtom)
      expect(store.get(themeModeAtom)).toBe('dark')
    })
  })
})
