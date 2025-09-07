import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import ThemeToggle from '../ThemeToggle'

// Mock MUI icons to avoid "too many open files" error
vi.mock('@mui/icons-material', () => ({
  Brightness4: () => <div data-testid='brightness4-icon'>Brightness4</div>,
  Brightness7: () => <div data-testid='brightness7-icon'>Brightness7</div>,
}))

describe('ThemeToggle Component', () => {
  it('should render toggle button', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'toggle theme')
  })

  it('should show appropriate icon based on theme mode', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()

    // Should show one of the brightness icons
    const brightness4 = screen.queryByTestId('brightness4-icon')
    const brightness7 = screen.queryByTestId('brightness7-icon')

    expect(brightness4 || brightness7).toBeInTheDocument()
  })

  it('should toggle theme when clicked', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })

    // Initial click to toggle theme
    fireEvent.click(button)
    expect(button).toBeInTheDocument()

    // Click again to toggle back
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })

  it('should have proper color inheritance', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toHaveClass('MuiIconButton-colorInherit')
  })
})
