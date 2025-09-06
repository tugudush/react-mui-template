---
applyTo: '**'
---

# Jotai Global State Management Guide

## Overview

This project uses **Jotai** for global state management. Jotai provides a bottom-up approach with atomic state management, offering excellent performance and TypeScript support.

## Core Principles

1. **Atomic Design**: Break state into small, independent atoms
2. **Derived State**: Use derived atoms for computed values
3. **Persistence**: Use `atomWithStorage` for data that should persist across sessions
4. **TypeScript First**: Always type your atoms properly

## File Organization

### Atoms Structure

```
src/atoms/
├── index.ts              # Barrel exports for all atoms
├── userAtoms.ts          # User-related state
├── appAtoms.ts           # App-wide state
└── [feature]Atoms.ts     # Feature-specific atoms
```

### Hooks Structure

```
src/hooks/
├── useUser.ts            # User state hooks
├── useApp.ts             # App state hooks
└── use[Feature].ts       # Feature-specific hooks
```

## Atom Patterns

### 1. Basic Atom

```typescript
import { atom } from 'jotai'

export interface User {
  id: string
  name: string
  email: string
}

export const userAtom = atom<User | null>(null)
```

### 2. Atom with Storage (Persistence)

```typescript
import { atomWithStorage } from 'jotai/utils'

export type ThemeMode = 'light' | 'dark'

export const themeModeAtom = atomWithStorage<ThemeMode>(
  'theme-mode', // localStorage key
  'light' // default value
)
```

### 3. Derived/Computed Atom

```typescript
import { atom } from 'jotai'

export const userDisplayNameAtom = atom((get) => {
  const user = get(userAtom)
  return user ? `${user.name} (${user.email})` : 'Guest'
})
```

### 4. Write-Only Action Atom

```typescript
export const loginAtom = atom(
  null, // read value (null for write-only)
  async (get, set, credentials: LoginCredentials) => {
    try {
      const user = await authService.login(credentials)
      set(userAtom, user)
      set(authStatusAtom, 'authenticated')
    } catch (error) {
      set(authErrorAtom, error.message)
    }
  }
)
```

### 5. Async Atom

```typescript
import { atom } from 'jotai'

export const postsAtom = atom(async () => {
  const response = await fetch('/api/posts')
  return response.json()
})

// With error handling
export const postsWithErrorAtom = atom(async (get) => {
  try {
    const response = await fetch('/api/posts')
    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Posts fetch error:', error)
    return []
  }
})
```

## Hook Patterns

### 1. Basic State Hook

```typescript
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { userAtom } from '@/atoms/userAtoms'

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom)

  return {
    user,
    setUser,
    isLoggedIn: user !== null,
  }
}

// Read-only version
export const useUserValue = () => useAtomValue(userAtom)

// Write-only version
export const useSetUser = () => useSetAtom(userAtom)
```

### 2. Action Hook

```typescript
import { useSetAtom } from 'jotai'

import { loginAtom, logoutAtom } from '@/atoms/authAtoms'

export const useAuth = () => {
  const login = useSetAtom(loginAtom)
  const logout = useSetAtom(logoutAtom)

  return {
    login,
    logout,
  }
}
```

### 3. Complex State Hook

```typescript
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import {
  addTodoAtom,
  removeTodoAtom,
  todoListAtom,
  todoStatsAtom,
  toggleTodoAtom,
} from '@/atoms/todoAtoms'

export const useTodos = () => {
  const [todos, setTodos] = useAtom(todoListAtom)
  const addTodo = useSetAtom(addTodoAtom)
  const toggleTodo = useSetAtom(toggleTodoAtom)
  const removeTodo = useSetAtom(removeTodoAtom)
  const stats = useAtomValue(todoStatsAtom)

  return {
    todos,
    setTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    stats,
    hasTodos: todos.length > 0,
  }
}
```

## Advanced Patterns

### 1. Atom Family (Dynamic Atoms)

```typescript
import { atomFamily } from 'jotai/utils'

export const todoAtomFamily = atomFamily((id: string) =>
  atom({
    id,
    text: '',
    completed: false,
    createdAt: new Date(),
  })
)

// Usage in component
const useTodoItem = (id: string) => {
  const todoAtom = todoAtomFamily(id)
  return useAtom(todoAtom)
}
```

### 2. Reset Pattern

```typescript
import { atom } from 'jotai'
import { RESET } from 'jotai/utils'

export const countAtom = atom(0)

export const resetCountAtom = atom(null, (get, set) => {
  set(countAtom, RESET) // Resets to initial value
})
```

### 3. Middleware Pattern

```typescript
import { atom } from 'jotai'

const withLogging = <T>(baseAtom: Atom<T>, name: string) =>
  atom(
    (get) => get(baseAtom),
    (get, set, update: T) => {
      console.log(`Setting ${name}:`, update)
      set(baseAtom, update)
    }
  )

export const userAtom = atom<User | null>(null)
export const userAtomWithLogging = withLogging(userAtom, 'user')
```

## TypeScript Best Practices

### 1. Strict Typing

```typescript
interface TodoItem {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export const todoListAtom = atom<TodoItem[]>([])
```

### 2. Generic Atoms

```typescript
const createEntityAtom = <T>() => ({
  listAtom: atom<T[]>([]),
  selectedAtom: atom<T | null>(null),
  loadingAtom: atom(false),
  errorAtom: atom<string | null>(null),
})

export const userEntities = createEntityAtom<User>()
export const postEntities = createEntityAtom<Post>()
```

## Testing Patterns

### 1. Testing Atoms

```typescript
import { createStore } from 'jotai'

import { countAtom, incrementAtom } from '@/atoms/counterAtoms'

describe('Counter Atoms', () => {
  it('should increment count', () => {
    const store = createStore()

    // Initial state
    expect(store.get(countAtom)).toBe(0)

    // Perform action
    store.set(incrementAtom)

    // Assert new state
    expect(store.get(countAtom)).toBe(1)
  })
})
```

### 2. Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'jotai'
import { useCounter } from '@/hooks/useCounter'

const Wrapper = ({ children }) => <Provider>{children}</Provider>

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter(), { wrapper: Wrapper })

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
```

## Performance Tips

1. **Use `useAtomValue` for read-only access** to prevent unnecessary re-renders
2. **Split large atoms** into smaller, focused atoms
3. **Use derived atoms** instead of computing values in components
4. **Prefer `useSetAtom`** for action-only hooks
5. **Use atom families** for dynamic collections instead of large arrays

## Example Implementation

See the existing theme implementation in this project:

- `src/atoms/themeAtoms.ts` - Atom definitions
- `src/hooks/useTheme.ts` - Hook implementation
- `src/theme/JotaiThemeProvider.tsx` - Provider component
- `src/components/themeToggle/ThemeToggle.tsx` - Consumer component

## Migration Guide

When adding new global state:

1. **Create atoms file**: `src/atoms/[feature]Atoms.ts`
2. **Define typed atoms**: Use proper TypeScript interfaces
3. **Create hooks**: `src/hooks/use[Feature].ts`
4. **Export from barrel**: Add to `src/atoms/index.ts` and `src/hooks/index.ts`
5. **Use in components**: Import hooks, not atoms directly
