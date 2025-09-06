import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useTheme } from '@/hooks/useTheme'

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <IconButton onClick={toggleTheme} color='inherit' aria-label='toggle theme'>
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}

export default ThemeToggle
