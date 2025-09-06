import React from 'react'

import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useThemeMode } from '@/theme/useThemeMode'

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <IconButton onClick={toggleTheme} color='inherit' aria-label='toggle theme'>
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}

export default ThemeToggle
