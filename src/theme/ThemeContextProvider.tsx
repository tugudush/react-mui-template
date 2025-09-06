import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { ThemeProvider } from '@mui/material/styles'

import { ThemeContext, type ThemeMode } from './ThemeContext'
import { darkTheme, lightTheme } from './index'

interface ThemeContextProviderProps {
  children: ReactNode
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  // Initialize theme mode from localStorage or default to 'light'
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode
      }
      // Check system preference
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark'
      }
    }
    return 'light'
  })

  // Save theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
