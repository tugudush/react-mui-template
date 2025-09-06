import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import ThemeToggle from '@/components/themeToggle'
import { useThemeMode } from '@/theme/theme'

import {
  StyledAppBarTitle,
  StyledButtonStack,
  StyledFeaturesPaper,
  StyledMainContainer,
  StyledRootBox,
  StyledWelcomePaper,
} from './Home.styled'

export default function HomePage() {
  const { mode } = useThemeMode()

  return (
    <StyledRootBox>
      <AppBar position='static'>
        <Toolbar>
          <StyledAppBarTitle variant='h6' component='div'>
            React MUI Template
          </StyledAppBarTitle>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <StyledMainContainer maxWidth='md'>
        <StyledWelcomePaper elevation={3}>
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

          <StyledButtonStack direction='row' spacing={2}>
            <Button variant='contained' color='primary'>
              Primary Button
            </Button>
            <Button variant='outlined' color='secondary'>
              Secondary Button
            </Button>
            <Button variant='text'>Text Button</Button>
          </StyledButtonStack>
        </StyledWelcomePaper>

        <StyledFeaturesPaper elevation={2}>
          <Typography variant='h5' gutterBottom>
            Theme Features
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            • Persistent theme preference (localStorage) • System color scheme
            detection • Smooth transitions between light and dark modes • CSS
            variables for better performance • Customizable theme tokens
          </Typography>
        </StyledFeaturesPaper>
      </StyledMainContainer>
    </StyledRootBox>
  )
}
