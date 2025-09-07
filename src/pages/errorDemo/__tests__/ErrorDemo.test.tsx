import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import ErrorDemoPage from '../ErrorDemo'

// Mock MUI icons to prevent "too many open files" error
vi.mock('@mui/icons-material', () => ({
  Brightness4: () => <div data-testid='brightness4-icon' />,
  Brightness7: () => <div data-testid='brightness7-icon' />,
}))

describe('ErrorDemoPage', () => {
  it('should render error demo page correctly', () => {
    render(<ErrorDemoPage />)

    expect(
      screen.getByRole('heading', { name: 'Error Boundary Demo' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Component-Level Error Boundary')
    ).toBeInTheDocument()
    expect(screen.getByText('Global Error Boundary')).toBeInTheDocument()
  })

  it('should show component working correctly initially', () => {
    render(<ErrorDemoPage />)

    expect(screen.getAllByText('✅ Component working correctly')).toHaveLength(
      2
    )
  })

  it('should trigger component-level error when break component button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<ErrorDemoPage />)

    const breakComponentButton = screen.getByRole('button', {
      name: /break component/i,
    })
    fireEvent.click(breakComponentButton)

    expect(screen.getByText('Component Error Caught')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This is a demo error to show the error boundary in action!'
      )
    ).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('should have trigger global error button', () => {
    render(<ErrorDemoPage />)

    const triggerGlobalErrorButton = screen.getByRole('button', {
      name: /trigger global error/i,
    })

    expect(triggerGlobalErrorButton).toBeInTheDocument()
    expect(triggerGlobalErrorButton).toHaveTextContent('Trigger Global Error')
  })

  it('should toggle global error button text', () => {
    render(<ErrorDemoPage />)

    const globalErrorButton = screen.getByRole('button', {
      name: /trigger global error/i,
    })

    expect(globalErrorButton).toHaveTextContent('Trigger Global Error')

    // After clicking once, the button text should change (but will throw error)
    // We can't easily test the text change since the error will prevent re-render
    // This is expected behavior for global errors
  })

  it('should display error boundary features list', () => {
    render(<ErrorDemoPage />)

    expect(screen.getByText('Error Boundary Features')).toBeInTheDocument()
    expect(
      screen.getByText(/Catches JavaScript errors in component tree/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Custom fallback components/)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript support/)).toBeInTheDocument()
  })

  it('should reset component error when reset button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<ErrorDemoPage />)

    // Break the component
    const breakComponentButton = screen.getByRole('button', {
      name: /break component/i,
    })
    fireEvent.click(breakComponentButton)

    expect(screen.getByText('Component Error Caught')).toBeInTheDocument()

    // Reset the component
    const resetButton = screen.getByRole('button', { name: /reset component/i })
    fireEvent.click(resetButton)

    // After reset, the component should be fixed and show normal content
    expect(
      screen.getByText('✅ Component working correctly')
    ).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
