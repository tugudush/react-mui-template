import { describe, expect, it, vi } from 'vitest'

// Mock MUI icons to avoid "too many open files" error
vi.mock('@mui/icons-material', () => ({
  Brightness4: () => null,
  Brightness7: () => null,
}))

// Mock the theme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    mode: 'light',
    toggleTheme: vi.fn(),
  }),
}))

describe('ThemeToggle Index Export', () => {
  it('should export ThemeToggle component as default', async () => {
    const module = await import('../index')

    expect(module.default).toBeDefined()
    expect(typeof module.default).toBe('function')
  })

  it('should be a barrel export file', async () => {
    const module = await import('../index')

    // Should have a default export (React component)
    expect(module.default).toBeDefined()
    expect(module.default.name).toBeTruthy()
  })
})
