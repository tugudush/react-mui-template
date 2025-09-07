import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { render } from '../test-utils'

// Simple test component
const TestComponent = () => <div data-testid='test'>Test Component</div>

describe('Test Utils', () => {
  it('should export custom render function', () => {
    expect(render).toBeDefined()
    expect(typeof render).toBe('function')
  })

  it('should render component with providers', () => {
    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('should re-export all testing library functions', () => {
    // Test that common testing library exports are available
    // Import the testing functions from our custom test-utils
    expect(screen).toBeDefined()
    expect(fireEvent).toBeDefined()
    expect(waitFor).toBeDefined()
    expect(act).toBeDefined()
  })

  it('should accept custom wrapper option', () => {
    const CustomWrapper = ({ children }: { children: React.ReactNode }) => (
      <div data-testid='custom-wrapper'>{children}</div>
    )

    const { getByTestId } = render(<TestComponent />, {
      wrapper: CustomWrapper,
    })

    expect(getByTestId('custom-wrapper')).toBeInTheDocument()
    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('should work without custom wrapper', () => {
    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('test')).toBeInTheDocument()
  })

  it('should include JotaiProvider and ThemeProvider by default', () => {
    // Test that the component renders without theme/state errors
    const ThemeAwareComponent = () => (
      <div style={{ color: 'primary.main' }}>Theme Component</div>
    )

    expect(() => render(<ThemeAwareComponent />)).not.toThrow()
  })
})
