import { lazy } from 'react'

import { describe, expect, it } from 'vitest'

import { render, screen, waitFor } from '@/test-utils'

import SuspenseRoute from '../SuspenseRoute'

// Mock a simple component for testing
const MockComponent = () => <div>Mock Component Loaded</div>

// Mock a lazy component that takes time to load
const MockLazyComponent = lazy(
  () =>
    new Promise<{ default: typeof MockComponent }>((resolve) =>
      setTimeout(() => resolve({ default: MockComponent }), 100)
    )
)

describe('SuspenseRoute Component', () => {
  it('should render the component when loaded', async () => {
    render(<SuspenseRoute component={MockComponent} />)

    expect(screen.getByText('Mock Component Loaded')).toBeInTheDocument()
  })

  it('should show loading fallback while lazy component is loading', async () => {
    render(<SuspenseRoute component={MockLazyComponent} />)

    // Should show loading fallback initially
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Mock Component Loaded')).toBeInTheDocument()
    })

    // Loading should be gone
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should handle component prop correctly', () => {
    const TestComponent = () => <div>Test Component</div>

    render(<SuspenseRoute component={TestComponent} />)

    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })
})
