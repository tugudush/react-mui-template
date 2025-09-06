import { useAtom, useSetAtom } from 'jotai'

import { themeModeAtom, toggleThemeAtom } from './themeAtoms'

export { JotaiThemeProvider } from './JotaiThemeProvider'
export type { ThemeMode } from './themeAtoms'
export { lightTheme, darkTheme } from './index'

export const useThemeMode = () => {
  const [mode, setMode] = useAtom(themeModeAtom)
  const toggle = useSetAtom(toggleThemeAtom)

  return {
    mode,
    setMode,
    toggleTheme: toggle,
  }
}
