import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import ThemeToggle from '@/components/themeToggle'
import { useThemeMode } from '@/theme/useThemeMode'

export default function HomePage() {
  const { mode } = useThemeMode()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            React MUI Template
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant='h2' component='h1' gutterBottom>
            Welcome to React MUI Template
          </Typography>
          <Typography variant='h6' color='text.secondary' paragraph>
            Current theme mode: <strong>{mode}</strong>
          </Typography>
          <Typography variant='body1' paragraph>
            This template includes Material-UI components with light/dark mode
            support. The theme automatically saves your preference to
            localStorage and respects your system's color scheme preference.
          </Typography>

          <Stack direction='row' spacing={2} sx={{ mt: 3 }}>
            <Button variant='contained' color='primary'>
              Primary Button
            </Button>
            <Button variant='outlined' color='secondary'>
              Secondary Button
            </Button>
            <Button variant='text'>Text Button</Button>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Theme Features
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            • Persistent theme preference (localStorage) • System color scheme
            detection • Smooth transitions between light and dark modes • CSS
            variables for better performance • Customizable theme tokens
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
