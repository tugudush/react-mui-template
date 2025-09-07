import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test-utils'

import LoadingFallback from '../LoadingFallback'

describe('LoadingFallback Component', () => {
  it('should render loading text', () => {
    render(<LoadingFallback />)

    const loadingElement = screen.getByText('Loading...')
    expect(loadingElement).toBeInTheDocument()
  })

  it('should render as a span element', () => {
    render(<LoadingFallback />)

    const loadingElement = screen.getByText('Loading...')
    expect(loadingElement.tagName).toBe('SPAN')
  })
})
