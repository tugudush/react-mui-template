import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AboutPage from '../About'
import { render } from '@/test-utils'

describe('About Page', () => {
  it('should render about heading', () => {
    render(<AboutPage />)

    const heading = screen.getByRole('heading', { name: /about/i })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('should render without crashing', () => {
    expect(() => render(<AboutPage />)).not.toThrow()
  })
})
