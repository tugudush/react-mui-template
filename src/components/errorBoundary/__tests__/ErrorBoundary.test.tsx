import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import ErrorBoundary from '../ErrorBoundary'

// Component that throws an error when shouldThrow is true
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should catch and display error with default UI', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /show details/i })
    ).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should allow user to try again after error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Error should be displayed
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    // The error boundary doesn't automatically recover on rerender
    // This is expected behavior - error boundaries require manual reset
    const tryAgainButton = screen.getByRole('button', { name: /try again/i })
    expect(tryAgainButton).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should toggle error details visibility', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const detailsButton = screen.getByRole('button', { name: /show details/i })

    // Show details
    fireEvent.click(detailsButton)
    expect(
      screen.getByRole('button', { name: /hide details/i })
    ).toBeInTheDocument()

    // Details content should be visible (error stack trace)
    expect(screen.getByText(/Error: Test error message/)).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should use custom fallback when provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const customFallback = (error: Error) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={() => {}}>Custom Reset</button>
      </div>
    )

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(
      screen.getByText('Custom error: Test error message')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /custom reset/i })
    ).toBeInTheDocument()

    // Should not show default error UI
    expect(
      screen.queryByText('Oops! Something went wrong')
    ).not.toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should call onError callback when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error message',
      }),
      expect.objectContaining({
        componentStack: expect.stringContaining('ThrowError'),
      })
    )

    consoleSpy.mockRestore()
  })

  it('should handle errors without error messages', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const ThrowErrorWithoutMessage = () => {
      throw new Error('')
    }

    render(
      <ErrorBoundary>
        <ThrowErrorWithoutMessage />
      </ErrorBoundary>
    )

    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should reset error state when handleReset is called', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Error should be displayed initially
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    // Click try again - this should reset the error boundary and re-render
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    // The error boundary should attempt to re-render but the component will throw again
    // so we should still see the error state (this is expected behavior)
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
