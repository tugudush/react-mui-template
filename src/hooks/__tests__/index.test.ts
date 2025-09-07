import { describe, expect, it } from 'vitest'

import * as hooksIndex from '../index'
import * as useTheme from '../useTheme'

describe('Hooks Index Exports', () => {
  it('should export useTheme hook', () => {
    expect(hooksIndex.useTheme).toBeDefined()
    expect(hooksIndex.useTheme).toBe(useTheme.useTheme)
    expect(typeof hooksIndex.useTheme).toBe('function')
  })

  it('should be a barrel export file', () => {
    // Verify the module structure
    expect(hooksIndex).toBeDefined()
    expect(Object.keys(hooksIndex).length).toBeGreaterThan(0)
  })

  it('should maintain export consistency', () => {
    // Test that all exports from useTheme are available
    const hooksKeys = Object.keys(hooksIndex)
    const useThemeKeys = Object.keys(useTheme)

    // All useTheme exports should be available in index
    useThemeKeys.forEach((key) => {
      expect(hooksKeys).toContain(key)
    })
  })
})
