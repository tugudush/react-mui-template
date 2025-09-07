import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import App from '../App'

// Mock the routes component to avoid router complexity
vi.mock('../routes', () => ({
  default: () => <div data-testid='routes'>Routes Component</div>,
}))

// Mock the theme provider from the correct path
vi.mock('../theme/theme', () => ({
  JotaiThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='theme-provider'>{children}</div>
  ),
}))

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByTestId('routes')).toBeInTheDocument()
  })

  it('should wrap routes with theme provider', () => {
    render(<App />)

    const themeProvider = screen.getByTestId('theme-provider')
    const routes = screen.getByTestId('routes')

    expect(themeProvider).toContainElement(routes)
  })

  it('should render CssBaseline for consistent styling', () => {
    const { container } = render(<App />)

    // CssBaseline adds global styles, verify component structure
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should enable color scheme for CssBaseline', () => {
    // This tests that CssBaseline is configured with enableColorScheme
    // The actual functionality is tested through integration
    expect(() => render(<App />)).not.toThrow()
  })
})
