import type { ReactNode } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { useAtomValue } from 'jotai'

import { darkTheme, lightTheme } from './index'
import { themeModeAtom } from './themeAtoms'

interface JotaiThemeProviderProps {
  children: ReactNode
}

export const JotaiThemeProvider = ({ children }: JotaiThemeProviderProps) => {
  const mode = useAtomValue(themeModeAtom)
  const theme = mode === 'light' ? lightTheme : darkTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
