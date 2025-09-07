import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test-utils'

import LoadingFallback from '../LoadingFallback'

describe('LoadingFallback Component', () => {
  it('should render loading text', () => {
    render(<LoadingFallback />)

    const loadingElement = screen.getByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  it('should render circular progress indicator', () => {
    render(<LoadingFallback />)

    const progressElement = screen.getByRole('progressbar')
    expect(progressElement).toBeInTheDocument()
  })

  it('should be contained in a flex box', () => {
    const { container } = render(<LoadingFallback />)

    const boxElement = container.firstChild
    expect(boxElement).toHaveClass('MuiBox-root')
  })

  it('should render without crashing', () => {
    expect(() => render(<LoadingFallback />)).not.toThrow()
  })
})
