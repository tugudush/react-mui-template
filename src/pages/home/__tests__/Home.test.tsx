import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import HomePage from '../Home'

// Mock ThemeToggle to avoid MUI icons issues
vi.mock('@/components/themeToggle', () => ({
  default: () => <button aria-label='toggle theme'>Theme Toggle</button>,
}))

describe('Home Page', () => {
  it('should render main heading', () => {
    render(<HomePage />)

    const heading = screen.getByRole('heading', {
      name: /welcome to react mui template/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('should render app bar with title', () => {
    render(<HomePage />)

    const appBarTitle = screen.getByText('React MUI Template')
    expect(appBarTitle).toBeInTheDocument()
  })

  it('should render theme toggle component', () => {
    render(<HomePage />)

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('should display current theme mode', () => {
    render(<HomePage />)

    // Should display either light or dark mode
    const themeText = screen.getByText(/current theme mode:/i)
    expect(themeText).toBeInTheDocument()

    // Should show either light or dark
    expect(
      screen.getByText('light') || screen.getByText('dark')
    ).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('button', { name: /primary button/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /secondary button/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /text button/i })
    ).toBeInTheDocument()
  })

  it('should render features section', () => {
    render(<HomePage />)

    const featuresHeading = screen.getByRole('heading', {
      name: /template features/i,
    })
    expect(featuresHeading).toBeInTheDocument()

    const featuresText = screen.getByText(/persistent theme preference/i)
    expect(featuresText).toBeInTheDocument()
  })

  it('should render description text', () => {
    render(<HomePage />)

    const description = screen.getByText(
      /this template includes material-ui components/i
    )
    expect(description).toBeInTheDocument()
  })

  it('should have proper Material-UI structure', () => {
    render(<HomePage />)

    // Check for main container (Container component doesn't have main role by default)
    const container = screen.getByRole('banner').parentElement
    expect(container).toBeInTheDocument()

    // Check for app bar (has banner role)
    const appBar = screen.getByRole('banner')
    expect(appBar).toBeInTheDocument()
  })
})
