import { type ReactNode } from 'react'

import { act, renderHook } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'
import { describe, expect, it } from 'vitest'

import { useTheme } from '@/hooks/useTheme'

interface WrapperProps {
  children: ReactNode
}

function TestWrapper({ children }: WrapperProps) {
  return <JotaiProvider>{children}</JotaiProvider>
}

describe('useTheme Hook', () => {
  it('should return initial theme mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: TestWrapper })

    expect(result.current.mode).toBe('light')
    expect(typeof result.current.setMode).toBe('function')
    expect(typeof result.current.toggleTheme).toBe('function')
  })

  it('should update theme mode when setMode is called', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: TestWrapper })

    act(() => {
      result.current.setMode('dark')
    })

    expect(result.current.mode).toBe('dark')
  })

  it('should toggle theme mode when toggleTheme is called', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: TestWrapper })

    // Initial should be light
    expect(result.current.mode).toBe('light')

    // Toggle to dark
    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.mode).toBe('dark')

    // Toggle back to light
    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.mode).toBe('light')
  })

  it('should maintain state across multiple renders', () => {
    const { result, rerender } = renderHook(() => useTheme(), {
      wrapper: TestWrapper,
    })

    // Set to dark
    act(() => {
      result.current.setMode('dark')
    })

    expect(result.current.mode).toBe('dark')

    // Rerender and check if state is maintained
    rerender()

    expect(result.current.mode).toBe('dark')
  })
})
