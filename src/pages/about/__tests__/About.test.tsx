import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { render } from '@/test-utils'

import AboutPage from '../About'

describe('About Page', () => {
  it('should render about heading', () => {
    render(<AboutPage />)

    const heading = screen.getByRole('heading', { name: /about/i })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('should render description paragraph', () => {
    render(<AboutPage />)

    const description = screen.getByText(/this is the about page/i)
    expect(description).toBeInTheDocument()
  })

  it('should render within a container', () => {
    render(<AboutPage />)

    const container = screen
      .getByRole('heading', { name: /about/i })
      .closest('.MuiContainer-root')
    expect(container).toBeInTheDocument()
  })

  it('should render without crashing', () => {
    expect(() => render(<AboutPage />)).not.toThrow()
  })
})
