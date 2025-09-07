# Testing Guide - React MUI Template

## Overview

This project uses **Vitest** as the testing framework, along with React Testing Library for component testing. The testing setup is designed to provide comprehensive coverage for the Jotai-based state management and MUI components.

## Testing Stack

- **Vitest**: Modern testing framework (faster alternative to Jest)
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom DOM matchers
- **@testing-library/user-event**: User interaction testing
- **happy-dom**: Lightweight DOM implementation for tests

## Configuration

### Vitest Configuration (`vite.config.ts`)

The testing configuration is unified with the main Vite configuration for simplicity:

```typescript
/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test-setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
      ],
    },
  },
})
```

### Test Setup (`src/test-setup.ts`)

Global test setup includes:

- Jest DOM matchers
- localStorage mocking
- matchMedia API mocking for theme detection
- Cleanup after each test

## Testing Utilities

### Custom Render Function (`src/test-utils.tsx`)

Provides a custom render function that includes necessary providers:

- **JotaiProvider**: For state management
- **ThemeProvider**: For MUI components

```typescript
import { render, screen } from '@/test-utils'

// This render includes all necessary providers
render(<YourComponent />)
```

## Available Test Scripts

```json
{
  "test": "vitest", // Run tests in watch mode
  "test:run": "vitest run", // Run tests once
  "test:coverage": "vitest run --coverage", // Run with coverage
  "test:watch": "vitest --watch", // Explicit watch mode
  "test:ui": "vitest --ui", // Run with UI interface
  "ltft": "lint + typecheck + format + test" // Full quality check
}
```

## Test Coverage

Current coverage focuses on core functionality:

### ✅ Atoms Testing (`themeAtoms.test.ts`)

- Theme mode initialization
- System preference detection
- Theme persistence to localStorage
- Theme toggling functionality
- Multiple toggle scenarios

### ✅ Hooks Testing (`useTheme.test.tsx`)

- Hook return values
- Theme mode updates
- Theme toggling
- State persistence across re-renders

### ✅ Component Testing (`LoadingFallback.test.tsx`)

- Component rendering
- Proper element output
- Accessibility attributes

### ✅ Integration Testing (`SuspenseRoute.test.tsx`)

- Suspense boundary behavior
- Loading fallback display
- Lazy component loading
- Async component resolution

## Test Patterns

### 1. Atom Testing Pattern

```typescript
import { createStore } from 'jotai'

import { themeModeAtom } from '@/atoms/themeAtoms'

describe('Theme Atoms', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
  })

  it('should update theme mode', () => {
    store.set(themeModeAtom, 'dark')
    expect(store.get(themeModeAtom)).toBe('dark')
  })
})
```

### 2. Hook Testing Pattern

```typescript
import { renderHook, act } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'

const wrapper = ({ children }) => (
  <JotaiProvider>{children}</JotaiProvider>
)

it('should update theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })

  act(() => {
    result.current.setMode('dark')
  })

  expect(result.current.mode).toBe('dark')
})
```

### 3. Component Testing Pattern

```typescript
import { render, screen } from '@/test-utils'

it('should render component', () => {
  render(<YourComponent />)

  const element = screen.getByRole('button')
  expect(element).toBeInTheDocument()
})
```

## Coverage Goals

| Category        | Target | Current | Status       |
| --------------- | ------ | ------- | ------------ |
| Atoms           | 100%   | 95%     | ✅ Excellent |
| Hooks           | 100%   | 91.66%  | ✅ Excellent |
| Core Components | 80%    | 100%    | ✅ Excellent |
| Utilities       | 80%    | 100%    | ✅ Excellent |

## Known Limitations

### MUI Icons Testing

Currently, testing components with MUI icons causes "too many open files" errors due to the large number of icon imports. This is a known issue with the MUI icon package in test environments.

**Workaround**: Test component functionality without focusing on specific icon rendering.

### Complex Component Testing

Some complex components (like full pages) may require mocking of large dependency trees. Focus on unit testing individual components and integration testing core flows.

## Running Tests

### Development Workflow

```bash
# Run tests in watch mode during development
npm test

# Run all tests once
npm run test:run

# Get coverage report
npm run test:coverage

# Full quality check (lint + typecheck + format + test)
npm run ltft
```

### CI/CD Integration

```bash
# Use in CI pipeline
npm run test:run
npm run test:coverage
```

## Best Practices

### 1. Test Organization

- Place tests in `__tests__/` directories co-located with source files
- Mirror the source structure
- Use descriptive test names

### 2. Test Isolation

- Each test should be independent
- Use fresh Jotai stores for atom testing
- Clean up after each test

### 3. Meaningful Assertions

- Test behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test user interactions, not internal state

### 4. Performance Considerations

- Use happy-dom for faster tests
- Mock heavy dependencies
- Keep tests focused and fast

## Future Enhancements

### Planned Additions

1. **E2E Testing**: Add Playwright for end-to-end testing
2. **Visual Regression**: Add Storybook with visual testing
3. **Performance Testing**: Add bundle size and runtime performance tests
4. **Accessibility Testing**: Comprehensive a11y testing with axe-core

### Testing Expansion

1. **Error Boundary Testing**: Test error handling scenarios
2. **Route Testing**: Test React Router integration
3. **Theme Integration**: Test theme switching across components
4. **API Mocking**: When API layer is added, include comprehensive API testing

## Troubleshooting

### Common Issues

**Issue**: `window.matchMedia is not a function`
**Solution**: Already handled in `test-setup.ts` with proper mocking

**Issue**: MUI component tests failing
**Solution**: Ensure tests use the custom render from `test-utils.tsx`

**Issue**: Jotai atom tests not isolated
**Solution**: Create fresh store in each test with `createStore()`

**Issue**: Tests running slowly
**Solution**: Use happy-dom environment and avoid importing entire MUI icon package

## Conclusion

The testing infrastructure provides a solid foundation for maintaining code quality and preventing regressions. The focus on atoms, hooks, and core components ensures that the most critical parts of the application are well-tested.

The current test coverage addresses the main areas identified in the codebase review, providing confidence in the Jotai-based state management and core component functionality.
