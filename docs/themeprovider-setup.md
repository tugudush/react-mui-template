# MUI ThemeProvider Setup Guide

This document provides a comprehensive guide on how the Material-UI ThemeProvider with light/dark mode support has been implemented in this React template.

## Overview

The ThemeProvider implementation provides:
- ✅ Light and dark theme support
- ✅ Persistent theme preference (localStorage)
- ✅ System color scheme detection
- ✅ Type-safe theme management
- ✅ CSS variables for optimal performance
- ✅ Fast Refresh compatibility

## Architecture

The theme system is built around React Context and consists of several key components:

```
src/theme/
├── index.ts                  # Theme configurations (light & dark)
├── ThemeContext.ts           # Context definition and types
├── ThemeContextProvider.tsx  # Context provider component
├── useThemeMode.ts          # Hook for accessing theme state
└── theme.ts                 # Barrel exports
```

## Implementation Details

### 1. Theme Configuration (`src/theme/index.ts`)

The theme configuration uses MUI's `createTheme` function with CSS variables enabled:

```typescript
import { createTheme } from '@mui/material/styles'

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    cssVariables: true, // Enable CSS variables for better performance
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
      },
      // ... other palette configurations
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: 'none', // Disable uppercase transformation
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      // Global component style overrides
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  })

export const lightTheme = createAppTheme('light')
export const darkTheme = createAppTheme('dark')
```

**Key Features:**
- **CSS Variables**: Enabled for better performance and dynamic theming
- **Responsive Design**: Built-in breakpoint system
- **Customizable**: Easy to modify colors, typography, and component styles
- **Type Safety**: Full TypeScript support

### 2. Theme Context (`src/theme/ThemeContext.ts`)

Defines the theme context structure and types:

```typescript
import { createContext } from 'react'

export type ThemeMode = 'light' | 'dark'

export interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
```

**Why separate context file?**
- Fast Refresh compatibility (React dev tools requirement)
- Clear separation of concerns
- Better tree-shaking in production builds

### 3. Theme Provider (`src/theme/ThemeContextProvider.tsx`)

The main provider component that manages theme state:

```typescript
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  // Initialize theme from localStorage or system preference
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode
      }
      // Fallback to system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'light'
  })

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
```

**Features:**
- **Persistence**: Saves user preference to localStorage
- **System Detection**: Respects OS color scheme preference
- **SSR Safe**: Handles server-side rendering gracefully
- **Performance**: Only re-renders when theme actually changes

### 4. Theme Hook (`src/theme/useThemeMode.ts`)

Custom hook for accessing theme state:

```typescript
export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeContextProvider')
  }
  return context
}
```

**Benefits:**
- Type-safe access to theme state
- Clear error messages for misuse
- Easy to use in any component

## Integration Steps

### Step 1: Wrap Your App

In `src/App.tsx`, wrap your application with the ThemeContextProvider:

```typescript
import { ThemeContextProvider } from './theme/ThemeContextProvider'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline enableColorScheme />
      {/* Your app components */}
    </ThemeContextProvider>
  )
}
```

### Step 2: Use the Theme Hook

In any component where you need theme access:

```typescript
import { useThemeMode } from '@/theme/useThemeMode'

function MyComponent() {
  const { mode, toggleTheme } = useThemeMode()
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggleTheme}>
        Switch to {mode === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  )
}
```

### Step 3: Create Theme Toggle Component

Example theme toggle button (`src/components/themeToggle/ThemeToggle.tsx`):

```typescript
import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode } from '@/theme/useThemeMode'

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  )
}
```

## CSS Variables

With `cssVariables: true`, MUI automatically generates CSS custom properties:

```css
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-secondary-main: #dc004e;
  --mui-palette-background-default: #ffffff;
  /* ... many more variables */
}

[data-mui-color-scheme="dark"] {
  --mui-palette-primary-main: #90caf9;
  --mui-palette-secondary-main: #f48fb1;
  --mui-palette-background-default: #121212;
  /* ... dark mode overrides */
}
```

**Benefits:**
- Better performance (no JavaScript recalculation)
- Easier integration with external CSS
- Support for CSS-in-JS libraries
- Better SSR support

## Customization

### Adding Custom Colors

To add custom colors to your theme:

```typescript
const theme = createTheme({
  palette: {
    // Custom color palette
    tertiary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
  },
})

// TypeScript module augmentation
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }
}
```

### Component-Level Customization

Override component styles globally:

```typescript
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})
```

### Typography Customization

Customize typography variants:

```typescript
const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  },
})
```

## Best Practices

1. **Provider Placement**: Always place ThemeContextProvider at the root level
2. **Type Safety**: Use TypeScript module augmentation for custom theme properties
3. **Performance**: Leverage CSS variables for better performance
4. **Accessibility**: Respect user's system preferences as default
5. **Persistence**: Save user preferences to improve UX
6. **Testing**: Test both light and dark modes in your components

## Troubleshooting

### Common Issues

1. **Hook Error**: "useThemeMode must be used within a ThemeContextProvider"
   - **Solution**: Ensure your component is wrapped by ThemeContextProvider

2. **Theme Not Applying**: Styles not changing between themes
   - **Solution**: Check that MUI components are being used, not plain HTML elements

3. **TypeScript Errors**: Custom theme properties not recognized
   - **Solution**: Add proper module augmentation for custom properties

4. **SSR Issues**: Hydration mismatches
   - **Solution**: Use the `enableColorScheme` prop on CssBaseline

### Performance Considerations

- **CSS Variables**: Always enable for production builds
- **Memoization**: Theme objects are already optimized
- **Bundle Size**: Use tree-shaking friendly imports
- **Re-renders**: Context changes only trigger re-renders for consuming components

## Migration Guide

If upgrading from a previous MUI setup:

1. Install required dependencies (already included)
2. Replace existing ThemeProvider with our ThemeContextProvider
3. Update component imports to use the new theme hook
4. Test both light and dark modes thoroughly

## Conclusion

This ThemeProvider implementation provides a robust, performant, and user-friendly theming solution that:
- Respects user preferences
- Provides excellent developer experience
- Maintains high performance standards
- Follows React and MUI best practices

The architecture is designed to be maintainable, extensible, and production-ready.
