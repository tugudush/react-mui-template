import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { render } from '@/test-utils'

import ErrorPage from '../Error'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Error Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render default error (404)', () => {
    render(<ErrorPage />)

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Page Not Found' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })

  it('should render custom error code and message', () => {
    render(<ErrorPage errorCode={500} errorMessage='Internal Server Error' />)

    expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Internal Server Error' })
    ).toBeInTheDocument()
  })

  it('should call navigate(-1) when go back button is clicked', () => {
    render(<ErrorPage />)

    const goBackButton = screen.getByRole('button', { name: /go back/i })
    fireEvent.click(goBackButton)

    expect(mockNavigate).toHaveBeenCalledWith(-1)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('should render with only error code when message is empty', () => {
    render(<ErrorPage errorCode={403} errorMessage='' />)

    expect(screen.getByRole('heading', { name: '403' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '' })).toBeInTheDocument()
  })
})
