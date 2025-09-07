---
applyTo: '**'
---

# MUI Styled Components Guidelines

## Overview

This project uses **MUI's `styled` API** for component styling. The `styled` utility provides a powerful way to create custom styled components with theme integration, TypeScript support, and excellent performance.

## Core Principles

1. **Theme Integration**: Always use theme values for spacing, colors, and breakpoints
2. **TypeScript First**: Properly type styled components and their props
3. **Component Co-location**: Keep styled components in separate `.styled.ts` files
4. **Semantic Naming**: Use descriptive prefixes like `Styled` for styled components
5. **Performance**: Prefer styled components over inline styles or sx prop for reusable styles

## File Organization

### Styled Components Structure

```
src/pages/feature/
├── Feature.tsx           # Main component implementation
├── Feature.styled.ts     # Styled components (preferred)
└── index.ts             # Barrel export
```

### Alternative for smaller components

```
src/components/component-name/
├── ComponentName.tsx     # Implementation with styled components inline
└── index.ts             # Barrel export
```

## Basic Patterns

### 1. Simple Styled Component

```typescript
import { Box, styled } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}))
```

### 2. Styled Component with Props

```typescript
import { Paper, styled } from '@mui/material'

interface StyledCardProps {
  elevated?: boolean
  variant?: 'primary' | 'secondary'
}

export const StyledCard = styled(Paper)<StyledCardProps>(
  ({ theme, elevated, variant }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius * 2,

    // Conditional styling based on props
    ...(elevated && {
      boxShadow: theme.shadows[8],
    }),

    // Variant-based styling
    ...(variant === 'primary' && {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    }),

    ...(variant === 'secondary' && {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
    }),
  })
)
```

### 3. Extending MUI Components

```typescript
import { Button, Typography, styled } from '@mui/material'

// Extending Button
export const StyledActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}))

// Extending Typography with custom component prop
export const StyledTitle = styled(Typography)<{
  component?: React.ElementType
}>(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}))
```

## Advanced Patterns

### 1. Responsive Styling

```typescript
import { Container, styled } from '@mui/material'

export const StyledResponsiveContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),

  // Mobile first approach
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    maxWidth: '1200px',
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(6),
  },
}))
```

### 2. Theme Mode Awareness

```typescript
import { Box, styled } from '@mui/material'

export const StyledThemeAwareBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,

  // Different styles for light/dark mode
  ...(theme.palette.mode === 'light' && {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  }),

  ...(theme.palette.mode === 'dark' && {
    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
  }),
}))
```

### 3. Nested Styling and Pseudo-classes

```typescript
import { Card, styled } from '@mui/material'

export const StyledInteractiveCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],

    // Nested selector
    '& .card-content': {
      color: theme.palette.primary.main,
    },
  },

  '&:active': {
    transform: 'translateY(-2px)',
  },

  // Pseudo-elements
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
}))
```

### 4. Dynamic Styling with Functions

```typescript
import { Box, alpha, styled } from '@mui/material'

interface StyledProgressBarProps {
  progress: number
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

export const StyledProgressBar = styled(Box)<StyledProgressBarProps>(
  ({ theme, progress, color = 'primary' }) => ({
    width: '100%',
    height: theme.spacing(1),
    backgroundColor: alpha(theme.palette[color].main, 0.1),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',

    '&::after': {
      content: '""',
      display: 'block',
      width: `${Math.max(0, Math.min(100, progress))}%`,
      height: '100%',
      backgroundColor: theme.palette[color].main,
      borderRadius: 'inherit',
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
      }),
    },
  })
)
```

## TypeScript Best Practices

### 1. Proper Interface Definition

```typescript
import { BoxProps, styled } from '@mui/material'

// Extend base component props when needed
interface StyledCustomBoxProps extends BoxProps {
  variant?: 'outlined' | 'filled'
  size?: 'small' | 'medium' | 'large'
}

export const StyledCustomBox = styled(Box)<StyledCustomBoxProps>(
  ({ theme, variant, size }) => ({
    // Base styles
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,

    // Size variants
    ...(size === 'small' && {
      padding: theme.spacing(1),
      fontSize: theme.typography.caption.fontSize,
    }),

    ...(size === 'large' && {
      padding: theme.spacing(3),
      fontSize: theme.typography.h6.fontSize,
    }),

    // Variant styles
    ...(variant === 'outlined' && {
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: 'transparent',
    }),

    ...(variant === 'filled' && {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    }),
  })
)
```

### 2. Generic Styled Components

```typescript
import { styled } from '@mui/material'

// Generic styled component factory
const createStyledContainer = <T extends React.ElementType = 'div'>(
  component: T
) =>
  styled(component)<{ spacing?: number }>(({ theme, spacing = 2 }) => ({
    padding: theme.spacing(spacing),
    margin: theme.spacing(spacing / 2),
  }))

export const StyledDiv = createStyledContainer('div')
export const StyledSection = createStyledContainer('section')
export const StyledArticle = createStyledContainer('article')
```

## Performance Optimization

### 1. Avoid Inline Functions

```typescript
// ❌ Bad - Creates new function on every render
export const StyledBadBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: () => theme.palette.background.paper, // Avoid this
}))

// ✅ Good - Static object
export const StyledGoodBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}))
```

### 2. Memoize Complex Calculations

```typescript
import { useMemo } from 'react'

import { styled } from '@mui/material'

const getComplexStyles = (theme: Theme, variant: string) => {
  // Complex calculation
  return {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    // ... more complex styles
  }
}

export const StyledComplexBox = styled(Box)<{ variant: string }>(
  ({ theme, variant }) => ({
    ...getComplexStyles(theme, variant),
  })
)
```

## Common Patterns from Project

### 1. Root Container Pattern

```typescript
export const StyledRootBox = styled(Box)(() => ({
  flexGrow: 1,
}))
```

### 2. Main Container Pattern

```typescript
export const StyledMainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}))
```

### 3. Paper Component Pattern

```typescript
export const StyledContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))
```

### 4. Stack Layout Pattern

```typescript
export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
}))
```

## Naming Conventions

1. **Prefix with `Styled`**: `StyledContainer`, `StyledButton`, etc.
2. **Descriptive Names**: Indicate purpose, not just appearance
3. **Consistent Casing**: Use PascalCase for component names
4. **Semantic Suffixes**: `Container`, `Wrapper`, `Header`, `Content`, etc.

### Good Examples

```typescript
export const StyledPageContainer = styled(Container)(...)
export const StyledNavigationBar = styled(AppBar)(...)
export const StyledActionButton = styled(Button)(...)
export const StyledFeatureCard = styled(Card)(...)
```

### Avoid

```typescript
export const RedBox = styled(Box)(...) // ❌ Color-based naming
export const BigText = styled(Typography)(...) // ❌ Size-based naming
export const MyComponent = styled(Box)(...) // ❌ Non-descriptive naming
```

## Testing Styled Components

```typescript
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme'
import { StyledCustomBox } from './Component.styled'

const renderWithTheme = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('StyledCustomBox', () => {
  it('applies correct styles for variant', () => {
    renderWithTheme(<StyledCustomBox variant="outlined" data-testid="custom-box" />)

    const box = screen.getByTestId('custom-box')
    expect(box).toHaveStyle({
      border: `1px solid ${theme.palette.divider}`,
    })
  })
})
```

## Migration from Other Styling Solutions

### From sx prop

```typescript
// Before
<Box
  sx={{
    p: 2,
    mb: 3,
    bgcolor: 'background.paper',
    borderRadius: 1,
  }}
>

// After
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}))

<StyledBox>
```

### From makeStyles (v4)

```typescript
// Before (v4 makeStyles)
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}))

// After (v5 styled)
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}))
```

## Best Practices Summary

1. **Always use theme values** for consistency
2. **Type your styled components** properly
3. **Keep styled components in separate files** for better organization
4. **Use semantic naming** that describes purpose, not appearance
5. **Prefer styled over sx** for reusable component styles
6. **Use responsive design** with theme breakpoints
7. **Avoid inline functions** in styled definitions
8. **Test styled components** with proper theme providers
9. **Document complex styled components** with JSDoc comments
10. **Follow the established patterns** from the existing codebase
