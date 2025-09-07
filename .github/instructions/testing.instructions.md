---
applyTo: '**'
---

# Testing Guidelines for React MUI Template

## Overview

This project uses **Vitest** with React Testing Library for comprehensive testing. All code should include appropriate tests following the patterns established in this template.

## Core Testing Principles

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Atomic Testing**: Test Jotai atoms in isolation with proper store management
3. **Component Integration**: Test components with their providers and dependencies
4. **User-Centric Testing**: Use semantic queries and test user interactions

## File Organization

### Test File Structure (Co-located)

```
src/
├── atoms/
│   ├── themeAtoms.ts
│   └── __tests__/
│       └── themeAtoms.test.ts
├── hooks/
│   ├── useTheme.ts
│   └── __tests__/
│       └── useTheme.test.tsx
├── components/
│   ├── loadingFallback/
│   │   ├── LoadingFallback.tsx
│   │   ├── index.ts
│   │   └── __tests__/
│   │       └── LoadingFallback.test.tsx
│   └── suspenseRoute/
│       ├── SuspenseRoute.tsx
│       ├── index.ts
│       └── __tests__/
│           └── SuspenseRoute.test.tsx
└── test-utils.tsx      # Shared testing utilities
```

**Benefits of Co-located Approach:**

- ✅ Tests are close to the code they test
- ✅ Better IDE integration and navigation
- ✅ Easier refactoring and moving components
- ✅ Clear ownership of tests per module

### Alternative: Centralized Tests (For Templates/Learning)

```
src/__tests__/
├── atoms/              # Test all Jotai atoms
├── hooks/              # Test custom hooks
├── components/         # Test reusable components
├── pages/              # Test page components (when feasible)
├── utils/              # Test utility functions
└── test-utils.tsx      # Shared testing utilities
```

**When to Consider Centralized:**

- � Template or learning projects
- 🏗️ Small projects with clear structure overview
- 📋 Clear categorization of test types

### Naming Convention

- Test files: `ComponentName.test.tsx` or `hookName.test.ts`
- Test utilities: `test-utils.tsx`
- Mock files: `__mocks__/moduleName.ts`

## Configuration

### Unified Vite Configuration

This project uses a **unified `vite.config.ts`** that includes both build and test configuration. This approach is recommended for most projects because:

**✅ Benefits:**

- Single source of truth for all Vite configuration
- No duplication of aliases, plugins, etc.
- Simpler project structure
- Follows Vite community standards
- Easier to keep build and test environments in sync

**📁 Structure:**

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    // Vitest configuration
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

**When to consider separate configs:**

- Large monorepos with complex test setups
- Significantly different plugin requirements
- Different environments with vastly different needs

## Testing Patterns

### 1. Atom Testing Pattern

**Always test atoms in isolation with fresh stores:**

```typescript
import { createStore } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import { yourAtom } from '@/atoms/yourAtoms'

describe('Your Atoms', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
    // Clear any mocks
    vi.clearAllMocks()
  })

  it('should have correct initial value', () => {
    const value = store.get(yourAtom)
    expect(value).toBe(expectedInitialValue)
  })

  it('should update value correctly', () => {
    store.set(yourAtom, newValue)
    expect(store.get(yourAtom)).toBe(newValue)
  })
})
```

### 2. Hook Testing Pattern

**Test hooks with proper provider wrapper:**

```typescript
import { renderHook, act } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'
import { type ReactNode } from 'react'

import { useYourHook } from '@/hooks/useYourHook'

const wrapper = ({ children }: { children: ReactNode }) => (
  <JotaiProvider>{children}</JotaiProvider>
)

describe('useYourHook', () => {
  it('should return correct initial values', () => {
    const { result } = renderHook(() => useYourHook(), { wrapper })

    expect(result.current.value).toBe(expectedValue)
    expect(typeof result.current.setValue).toBe('function')
  })

  it('should update state when action is called', () => {
    const { result } = renderHook(() => useYourHook(), { wrapper })

    act(() => {
      result.current.setValue(newValue)
    })

    expect(result.current.value).toBe(newValue)
  })
})
```

### 3. Component Testing Pattern

**Use custom render with all providers:**

```typescript
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import YourComponent from './YourComponent'
import { render } from '@/test-utils'

describe('YourComponent', () => {
  it('should render with correct content', () => {
    render(<YourComponent />)

    const element = screen.getByRole('button', { name: /expected text/i })
    expect(element).toBeInTheDocument()
  })

  it('should handle user interactions', () => {
    render(<YourComponent />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // Assert the expected behavior
    expect(screen.getByText('Updated content')).toBeInTheDocument()
  })

  it('should have proper accessibility', () => {
    render(<YourComponent />)

    const element = screen.getByRole('button')
    expect(element).toHaveAttribute('aria-label', 'Expected label')
  })
})
```

### 4. Async Component Testing Pattern

**Test lazy loading and Suspense boundaries:**

```typescript
import { lazy } from 'react'
import { waitFor } from '@testing-library/react'

const MockLazyComponent = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve({ default: MockComponent }), 100)
  )
)

it('should show loading state then component', async () => {
  render(<SuspenseRoute component={MockLazyComponent} />)

  // Should show loading initially
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // Wait for component to load
  await waitFor(() => {
    expect(screen.getByText('Component content')).toBeInTheDocument()
  })

  // Loading should be gone
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
```

## Required Test Coverage

### Atoms (Target: 95%+)

- **MUST TEST**: All atom initial values
- **MUST TEST**: All atom updates and derived values
- **MUST TEST**: Persistence behavior (atomWithStorage)
- **MUST TEST**: Action atoms and side effects

### Hooks (Target: 90%+)

- **MUST TEST**: Return values and their types
- **MUST TEST**: State updates through hook actions
- **MUST TEST**: Integration with underlying atoms
- **MUST TEST**: Error handling scenarios

### Components (Target: 80%+)

- **MUST TEST**: Basic rendering with required props
- **MUST TEST**: User interactions (clicks, form submissions)
- **MUST TEST**: Conditional rendering based on props/state
- **SHOULD TEST**: Accessibility attributes
- **SHOULD TEST**: Error boundaries (where applicable)

### Utilities (Target: 90%+)

- **MUST TEST**: Pure function inputs and outputs
- **MUST TEST**: Edge cases and error conditions
- **MUST TEST**: Type transformations

## Testing Best Practices

### DO ✅

1. **Use Semantic Queries**:

   ```typescript
   // Good
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText('Email address')

   // Avoid
   screen.getByTestId('submit-button')
   ```

2. **Test User Behavior**:

   ```typescript
   // Good - tests what user sees/does
   fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
   expect(screen.getByText('dark')).toBeInTheDocument()
   ```

3. **Use Fresh Stores for Atom Tests**:

   ```typescript
   beforeEach(() => {
     store = createStore() // Fresh store each test
   })
   ```

4. **Mock External Dependencies**:

   ```typescript
   // Mock localStorage, matchMedia, etc. in test-setup.ts
   ```

5. **Test Accessibility**:
   ```typescript
   expect(button).toHaveAttribute('aria-label', 'Toggle theme')
   ```

### DON'T ❌

1. **Don't Test Implementation Details**:

   ```typescript
   // Bad - tests internal state
   expect(component.state.isOpen).toBe(true)

   // Good - tests user-visible behavior
   expect(screen.getByText('Modal content')).toBeInTheDocument()
   ```

2. **Don't Use Generic Test IDs**:

   ```typescript
   // Bad
   screen.getByTestId('button-1')

   // Good
   screen.getByRole('button', { name: /specific action/i })
   ```

3. **Don't Share State Between Tests**:

   ```typescript
   // Bad - shared store
   const store = createStore()

   // Good - fresh store per test
   beforeEach(() => {
     store = createStore()
   })
   ```

4. **Don't Test Third-Party Libraries**:
   ```typescript
   // Don't test that MUI Button renders correctly
   // Do test that your component uses MUI Button correctly
   ```

## Mocking Guidelines

### Built-in Mocks (test-setup.ts)

```typescript
// localStorage - automatically mocked
// matchMedia - automatically mocked for theme detection
// window.location - available if needed
```

### Component-Specific Mocks

```typescript
// Mock heavy dependencies
vi.mock('@/components/HeavyComponent', () => ({
  default: () => <div>Mocked Heavy Component</div>
}))

// Mock external services
vi.mock('@/services/api', () => ({
  fetchData: vi.fn().mockResolvedValue(mockData)
}))
```

## Integration with CI/CD

### Required Scripts

All projects must have these test scripts:

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "ltft": "npm run lint:fix && npm run typecheck && npm run format && npm run test:run"
}
```

### Coverage Thresholds

Configure minimum coverage in `vite.config.ts`:

```typescript
coverage: {
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
    statements: 80
  }
}
```

## Troubleshooting Common Issues

### Issue: `window.matchMedia is not a function`

**Solution**: Already handled in `test-setup.ts`

### Issue: MUI components not rendering

**Solution**: Use custom render from `test-utils.tsx` that includes ThemeProvider

### Issue: Jotai atoms not isolated between tests

**Solution**: Create fresh store in `beforeEach` block

### Issue: Tests are slow

**Solution**:

- Use happy-dom environment
- Mock heavy dependencies
- Avoid importing entire icon libraries

### Issue: "Too many open files" with MUI icons

**Solution**:

- Test component behavior without testing specific icons
- Mock icon components if necessary
- Focus on functionality over visual details

## Example Test Files

Refer to existing test files for patterns:

- `src/atoms/__tests__/themeAtoms.test.ts` - Atom testing
- `src/hooks/__tests__/useTheme.test.tsx` - Hook testing
- `src/components/loadingFallback/__tests__/LoadingFallback.test.tsx` - Component testing
- `src/components/suspenseRoute/__tests__/SuspenseRoute.test.tsx` - Async testing

## Testing Checklist

Before submitting code, ensure:

- [ ] All new atoms have corresponding tests
- [ ] All new hooks have corresponding tests
- [ ] All new components have basic render tests
- [ ] User interactions are tested where applicable
- [ ] Accessibility attributes are tested
- [ ] Tests use semantic queries (getByRole, getByLabelText)
- [ ] Tests are isolated and don't depend on each other
- [ ] Tests run quickly (< 5 seconds for full suite)
- [ ] Coverage meets project thresholds

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Jotai Testing Guide](https://jotai.org/docs/guides/testing)
