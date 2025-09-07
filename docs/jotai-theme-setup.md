# MUI ThemeProvider with Jotai - Setup Guide

This document provides a comprehensive guide on how the Material-UI ThemeProvider with Jotai-based state management has been implemented in this React template.

## Overview

The Jotai-based ThemeProvider implementation provides:

- ✅ Light and dark theme support
- ✅ Persistent theme preference (localStorage via Jotai)
- ✅ System color scheme detection
- ✅ Type-safe theme management
- ✅ CSS variables for optimal performance
- ✅ **Simplified state management** (no Context API boilerplate)
- ✅ **Atomic updates** for better performance
- ✅ **Minimal re-renders** (only when theme actually changes)

## Why Jotai over Context API?

### Benefits of Jotai:

1. **Less Boilerplate**: No need for Context providers, reducers, or complex state logic
2. **Better Performance**: Only components that use the theme atom re-render
3. **Atomic State**: Each piece of state is independent and composable
4. **TypeScript Friendly**: Excellent TypeScript integration out of the box
5. **Persistence**: Built-in localStorage support with `atomWithStorage`
6. **DevTools**: Great debugging experience with Jotai DevTools

### Comparison:

| Feature     | Context API                    | Jotai                      |
| ----------- | ------------------------------ | -------------------------- |
| Boilerplate | High (Provider, Context, Hook) | Low (Just atoms)           |
| Re-renders  | All consumers re-render        | Only atom subscribers      |
| TypeScript  | Manual typing needed           | Automatic inference        |
| Persistence | Manual localStorage logic      | Built-in `atomWithStorage` |
| Testing     | Complex setup                  | Simple atom testing        |
| Bundle Size | React built-in                 | +3kb gzipped               |

## Architecture

The Jotai-based theme system follows the recommended Jotai guidelines with separated concerns:

```
src/atoms/
├── index.ts                # Barrel exports for all atoms
└── themeAtoms.ts          # Jotai atoms for theme state

src/hooks/
├── index.ts                # Barrel exports for all hooks
└── useTheme.ts            # Theme state management hook

src/theme/
├── index.ts                # Theme configurations (light & dark)
├── JotaiThemeProvider.tsx  # Simple theme provider component
└── theme.ts                # Core theme exports (themes and provider)
```

**Key Benefits of This Structure:**

- ✅ **Centralized State**: All atoms in `src/atoms/`
- ✅ **Separated Concerns**: Hooks separate from UI components
- ✅ **Better Organization**: Follows Jotai best practices
- ✅ **Scalable**: Easy to add new atoms and hooks
- ✅ **Consistent Imports**: Direct barrel exports, no re-export chains

## Import Best Practices

Always use direct imports from the canonical locations:

```typescript
// ✅ Correct - Direct from hooks
// ✅ Correct - Direct from atoms (if needed)
import { themeModeAtom } from '@/atoms/themeAtoms'
import { useTheme } from '@/hooks/useTheme'

// ❌ Avoid - No re-export chains or indirect paths
// import { useTheme } from '@/theme/theme'
```

This ensures:

- **Consistent import patterns** across the codebase
- **Better tree-shaking** and bundle optimization
- **Clearer dependency relationships**
- **Easier refactoring** and maintenance

## Implementation Details

### 1. Theme Atoms (`src/atoms/themeAtoms.ts`)

The core of the Jotai implementation using atomic state, now properly organized following Jotai guidelines:

```typescript
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type ThemeMode = 'light' | 'dark'

// Helper function to detect system preference
const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Atom that persists theme to localStorage with system preference fallback
export const themeModeAtom = atomWithStorage<ThemeMode>(
  'theme-mode',
  getSystemTheme()
)

// Derived atom for toggling theme
export const toggleThemeAtom = atom(
  null, // write-only atom
  (get, set) => {
    const currentMode = get(themeModeAtom)
    set(themeModeAtom, currentMode === 'light' ? 'dark' : 'light')
  }
)
```

**Key Features:**

- **`atomWithStorage`**: Automatically persists to localStorage
- **System Detection**: Falls back to OS preference
- **Write-only Atom**: `toggleThemeAtom` for clean toggle logic
- **SSR Safe**: Handles server-side rendering gracefully

### 2. Simplified Theme Provider (`src/theme/JotaiThemeProvider.tsx`)

Much simpler than Context API approach:

```typescript
import { useAtomValue } from 'jotai'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'

import { themeModeAtom } from '@/atoms/themeAtoms'
import { lightTheme, darkTheme } from './index'

interface JotaiThemeProviderProps {
  children: ReactNode
}

export const JotaiThemeProvider = ({ children }: JotaiThemeProviderProps) => {
  const mode = useAtomValue(themeModeAtom)
  const theme = mode === 'light' ? lightTheme : darkTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
```

**Benefits:**

- **No State Logic**: Jotai handles all state management
- **Automatic Subscription**: Only re-renders when theme changes
- **Clean Code**: Significantly less boilerplate than Context API

### 3. Theme Hook (`src/hooks/useTheme.ts`)

Following Jotai guidelines, the theme hook is now properly separated in the hooks directory:

```typescript
import { useAtom, useSetAtom } from 'jotai'

import { themeModeAtom, toggleThemeAtom } from '@/atoms/themeAtoms'

export const useTheme = () => {
  const [mode, setMode] = useAtom(themeModeAtom)
  const toggle = useSetAtom(toggleThemeAtom)

  return {
    mode, // Current theme mode
    setMode, // Direct setter for theme mode
    toggleTheme: toggle, // Toggle function
  }
}
```

**Features:**

- **Direct Access**: Get/set theme mode directly
- **Toggle Function**: Optimized toggle logic
- **Type Safety**: Full TypeScript support
- **No Provider Required**: Works anywhere in the component tree
- **Centralized Hook**: Available via `@/hooks/useTheme`
- **Follows Guidelines**: Proper separation of atoms and hooks

## Integration Steps

### Step 1: Install Jotai

```bash
npm install jotai
```

### Step 2: Wrap Your App

In `src/App.tsx`, wrap your application with the JotaiThemeProvider:

```typescript
import { JotaiThemeProvider } from './theme/theme'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <JotaiThemeProvider>
      <CssBaseline enableColorScheme />
      {/* Your app components */}
    </JotaiThemeProvider>
  )
}
```

### Step 3: Use the Theme Hook

In any component where you need theme access:

```typescript
import { useTheme } from '@/hooks/useTheme'

function MyComponent() {
  const { mode, setMode, toggleTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleTheme}>
        Switch to {mode === 'light' ? 'dark' : 'light'} mode
      </button>
      <button onClick={() => setMode('dark')}>
        Force dark mode
      </button>
    </div>
  )
}
```

### Step 4: Theme Toggle Component

Example implementation:

`### 4. Theme Toggle Component

Example implementation:

````typescript
import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useTheme } from '@/hooks/useTheme'

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}

export default ThemeToggle
```## Advanced Usage

### Reading Theme in Any Component

```typescript
import { useAtomValue } from 'jotai'

import { themeModeAtom } from '@/atoms/themeAtoms'

function SomeDeepComponent() {
  const mode = useAtomValue(themeModeAtom)
  // This component will only re-render when theme changes
}
````

### Custom Theme Logic

```typescript
import { atom } from 'jotai'
// Usage
import { useAtomValue } from 'jotai'

import { themeModeAtom } from '@/atoms/themeAtoms'

// Derived atom for theme-dependent logic
export const isDarkModeAtom = atom((get) => get(themeModeAtom) === 'dark')

const isDark = useAtomValue(isDarkModeAtom)
```

### Conditional Theme Effects

```typescript
import { useEffect } from 'react'

import { useAtomValue } from 'jotai'

import { themeModeAtom } from '@/atoms/themeAtoms'

function ThemeAwareComponent() {
  const mode = useAtomValue(themeModeAtom)

  useEffect(() => {
    // Run side effects when theme changes
    document.body.className = mode === 'dark' ? 'dark-theme' : 'light-theme'
  }, [mode])
}
```

## Performance Benefits

### Render Optimization

With Jotai, only components that actually use the theme atom will re-render:

```typescript
// ❌ Context API - ALL consumers re-render
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState()
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children} {/* ALL children re-render when theme changes */}
    </ThemeContext.Provider>
  )
}

// ✅ Jotai - ONLY atom subscribers re-render
function ComponentA() {
  const mode = useAtomValue(themeModeAtom) // Re-renders on theme change
}

function ComponentB() {
  const [count, setCount] = useState(0) // Never re-renders from theme changes
}
```

### Bundle Splitting

Jotai atoms can be code-split naturally:

```typescript
// Only load theme atoms when needed
const themeAtoms = await import('@/atoms/themeAtoms')
```

## Testing

Testing Jotai atoms is much simpler than Context API:

```typescript
import { createStore } from 'jotai'

import { themeModeAtom, toggleThemeAtom } from '@/atoms/themeAtoms'

describe('Theme Atoms', () => {
  test('should toggle theme', () => {
    const store = createStore()

    // Set initial state
    store.set(themeModeAtom, 'light')
    expect(store.get(themeModeAtom)).toBe('light')

    // Toggle theme
    store.set(toggleThemeAtom)
    expect(store.get(themeModeAtom)).toBe('dark')
  })
})
```

## Migration from Context API

If you have an existing Context-based theme system:

### Before (Context API):

```typescript
// Multiple files needed
// - ThemeContext.ts
// - ThemeProvider.tsx
// - useTheme.ts
// Complex setup with providers, context, and hooks
```

### After (Jotai - Following Guidelines):

```typescript
// Organized structure following Jotai guidelines:
// - src/atoms/themeAtoms.ts
// - src/hooks/useTheme.ts
// - src/theme/JotaiThemeProvider.tsx
// Simple and properly organized
```

### Migration Steps:

1. Install Jotai: `npm install jotai`
2. Create `src/atoms/` directory and atoms files
3. Create `src/hooks/` directory and hook files
4. Replace Context Provider with JotaiThemeProvider
5. Update import paths to use new structure
6. Remove old Context files

## Best Practices

1. **Atom Organization**: Keep related atoms in the same file under `src/atoms/`
2. **Hook Separation**: Keep hooks in `src/hooks/` separate from atoms
3. **Derived Atoms**: Use derived atoms for computed values
4. **Write-only Atoms**: Use for actions that don't need to return values
5. **Persistence**: Use `atomWithStorage` for persistent state
6. **TypeScript**: Let Jotai infer types automatically
7. **Testing**: Test atoms independently of components
8. **Barrel Exports**: Use `index.ts` files for clean imports

## File Organization Benefits

The new structure following Jotai guidelines provides:

- **Centralized State**: All atoms in one place (`src/atoms/`)
- **Separated Concerns**: Hooks separate from atoms and UI components
- **Better Discoverability**: Easy to find all state atoms
- **Scalability**: Easy to add new features following the same pattern
- **Maintainability**: Clear separation between state, logic, and UI

## Troubleshooting

### Common Issues:

1. **Hydration Mismatch**: Use `getSystemTheme()` for SSR compatibility
2. **Storage Errors**: Handle localStorage unavailability gracefully
3. **Atom Not Updating**: Ensure you're using the atom correctly with hooks

### Performance Tips:

1. Use `useAtomValue` for read-only access
2. Use `useSetAtom` for write-only operations
3. Avoid unnecessary atom subscriptions
4. Consider atom splitting for complex state

## Conclusion

The Jotai-based theme implementation provides:

- **50% less code** compared to Context API
- **Better performance** with atomic updates
- **Simpler testing** and debugging
- **Built-in persistence** without custom logic
- **Type safety** out of the box
- **No provider hell** or complex setup

This approach scales better as your application grows and provides a more maintainable solution for theme management.

## Next Steps

Consider exploring more Jotai features:

- [Jotai DevTools](https://jotai.org/docs/tools/devtools) for debugging
- [Async atoms](https://jotai.org/docs/guides/async) for server state
- [Atom families](https://jotai.org/docs/utilities/family) for dynamic atoms
- [Integration with React Query](https://jotai.org/docs/integrations/query) for data fetching
