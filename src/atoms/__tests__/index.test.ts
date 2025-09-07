import { describe, expect, it } from 'vitest'

import * as atomsIndex from '../index'
import * as themeAtoms from '../themeAtoms'

describe('Atoms Index Exports', () => {
  it('should export all theme atoms', () => {
    // Verify that all exports from themeAtoms are re-exported
    expect(atomsIndex.themeModeAtom).toBeDefined()
    expect(atomsIndex.themeModeAtom).toBe(themeAtoms.themeModeAtom)
  })

  it('should be a barrel export file', () => {
    // Verify the module exports what we expect
    expect(typeof atomsIndex.themeModeAtom).toBe('object')
  })

  it('should maintain export consistency', () => {
    // Test that all exports from themeAtoms are available
    const atomsKeys = Object.keys(atomsIndex)
    const themeAtomsKeys = Object.keys(themeAtoms)

    // All themeAtoms exports should be available in index
    themeAtomsKeys.forEach((key) => {
      expect(atomsKeys).toContain(key)
    })
  })
})
