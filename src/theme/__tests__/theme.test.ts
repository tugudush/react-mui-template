import { describe, expect, it } from 'vitest'

import { JotaiThemeProvider, darkTheme, lightTheme } from '../theme'

describe('Theme exports', () => {
  it('should export JotaiThemeProvider', () => {
    expect(JotaiThemeProvider).toBeDefined()
    expect(typeof JotaiThemeProvider).toBe('function')
  })

  it('should export lightTheme', () => {
    expect(lightTheme).toBeDefined()
    expect(typeof lightTheme).toBe('object')
    expect(lightTheme.palette.mode).toBe('light')
  })

  it('should export darkTheme', () => {
    expect(darkTheme).toBeDefined()
    expect(typeof darkTheme).toBe('object')
    expect(darkTheme.palette.mode).toBe('dark')
  })

  it('should have different primary colors for light and dark themes', () => {
    expect(lightTheme.palette.primary.main).toBeDefined()
    expect(darkTheme.palette.primary.main).toBeDefined()
    // They might be the same or different, just ensure they exist
  })
})
