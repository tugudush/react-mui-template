import { useAtom, useSetAtom } from 'jotai'

import { themeModeAtom, toggleThemeAtom } from '@/atoms/themeAtoms'

export const useTheme = () => {
  const [mode, setMode] = useAtom(themeModeAtom)
  const toggle = useSetAtom(toggleThemeAtom)

  return {
    mode,
    setMode,
    toggleTheme: toggle,
  }
}
