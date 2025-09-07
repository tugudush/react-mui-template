import { describe, expect, it } from 'vitest'

describe('Error Page Index Export', () => {
  it('should export Error component as default', async () => {
    const module = await import('../index')

    expect(module.default).toBeDefined()
    expect(typeof module.default).toBe('function')
  })

  it('should be a barrel export file', async () => {
    const module = await import('../index')

    // Should have a default export (React component)
    expect(module.default).toBeDefined()
  })
})
