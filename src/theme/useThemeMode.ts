import { useContext } from 'react'

import { ThemeContext, type ThemeContextType } from './ThemeContext'

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeContextProvider')
  }
  return context
}
