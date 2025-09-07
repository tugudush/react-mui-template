import { useState } from 'react'

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import ErrorBoundary from '@/components/errorBoundary'
import ThemeToggle from '@/components/themeToggle'

// Component that throws an error when triggered
const ErrorDemo = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error(
      'This is a demo error to show the error boundary in action!'
    )
  }
  return (
    <Typography color='success.main'>✅ Component working correctly</Typography>
  )
}

export default function ErrorDemoPage() {
  const [throwError, setThrowError] = useState(false)
  const [throwGlobalError, setThrowGlobalError] = useState(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Error Boundary Demo
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom>
          Error Boundary Demo
        </Typography>

        <Typography variant='body1' paragraph>
          This page demonstrates the error boundary functionality. You can
          trigger errors at different levels to see how they are handled
          gracefully.
        </Typography>

        <Stack spacing={4}>
          {/* Component-level error boundary */}
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Component-Level Error Boundary
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                This error is caught by a local error boundary around just this
                component.
              </Typography>

              <ErrorBoundary
                fallback={(error, _errorInfo, reset) => (
                  <Box
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'warning.main',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='h6' color='warning.main'>
                      Component Error Caught
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                      {error.message}
                    </Typography>
                    <Button size='small' variant='outlined' onClick={reset}>
                      Reset Component
                    </Button>
                  </Box>
                )}
              >
                <Box
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <ErrorDemo shouldThrow={throwError} />
                </Box>
              </ErrorBoundary>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  color='warning'
                  onClick={() => setThrowError(!throwError)}
                >
                  {throwError ? 'Fix Component' : 'Break Component'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Global error boundary */}
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Global Error Boundary
              </Typography>
              <Typography variant='body2' color='text.secondary' paragraph>
                This error will be caught by the global error boundary (affects
                the whole page).
              </Typography>

              <Box
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <ErrorDemo shouldThrow={throwGlobalError} />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => setThrowGlobalError(true)}
                >
                  Trigger Global Error
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Error boundary features */}
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Error Boundary Features
              </Typography>
              <Typography component='div'>
                <ul>
                  <li>✅ Catches JavaScript errors in component tree</li>
                  <li>✅ Displays user-friendly error messages</li>
                  <li>✅ Provides error details for debugging</li>
                  <li>✅ Offers reset functionality</li>
                  <li>✅ Custom fallback components</li>
                  <li>✅ Error logging and reporting</li>
                  <li>✅ TypeScript support</li>
                  <li>✅ MUI theme integration</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}
