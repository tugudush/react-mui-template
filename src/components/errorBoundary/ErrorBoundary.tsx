import { Component, type ErrorInfo, type ReactNode } from 'react'

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Typography,
} from '@mui/material'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  showDetails: boolean
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (
    error: Error,
    errorInfo?: ErrorInfo,
    reset?: () => void
  ) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      showDetails: false,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Store error info for debugging
    this.setState({
      errorInfo,
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error)
      console.error('Error Info:', errorInfo)
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      showDetails: false,
    })
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }))
  }

  render() {
    const { hasError, error, errorInfo, showDetails } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, errorInfo, this.handleReset)
      }

      // Default error UI
      return (
        <Box
          sx={{
            p: 3,
            maxWidth: 600,
            mx: 'auto',
            mt: 4,
          }}
        >
          <Alert severity='error' sx={{ mb: 2 }}>
            <AlertTitle>Oops! Something went wrong</AlertTitle>
            <Typography variant='body2' sx={{ mb: 2 }}>
              {error.message || 'An unexpected error occurred'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant='contained'
                size='small'
                onClick={this.handleReset}
                color='error'
              >
                Try Again
              </Button>
              <Button
                variant='outlined'
                size='small'
                onClick={this.toggleDetails}
                color='error'
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </Button>
            </Box>

            <Collapse in={showDetails} sx={{ mt: 2 }}>
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  maxHeight: 200,
                  overflow: 'auto',
                }}
              >
                <Typography
                  variant='caption'
                  component='pre'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {error.stack}
                  {errorInfo?.componentStack && (
                    <>
                      {'\n\nComponent Stack:'}
                      {errorInfo.componentStack}
                    </>
                  )}
                </Typography>
              </Box>
            </Collapse>
          </Alert>
        </Box>
      )
    }

    return children
  }
}
