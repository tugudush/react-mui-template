import { describe, expect, it } from 'vitest'

describe('SuspenseRoute Index Export', () => {
  it('should export SuspenseRoute component as default', async () => {
    const module = await import('../index')

    expect(module.default).toBeDefined()
    expect(typeof module.default).toBe('function')
  })

  it('should be a barrel export file', async () => {
    const module = await import('../index')

    // Should have a default export
    expect(module.default).toBeDefined()
    expect(module.default.name).toBeTruthy()
  })
})
