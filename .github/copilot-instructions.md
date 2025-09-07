# Vite React Template - AI Coding Agent Guide

## Architecture Overview

This is a **React 19 + React Router 7 + Vite** template focused on **lazy loading and code splitting**. The key architectural pattern is that all page components are lazy-loaded through a centralized `SuspenseRoute` wrapper.

**Core Flow**: `main.tsx` → `App.tsx` → `routes.tsx` → `SuspenseRoute` → lazy-loaded pages

**Key Technologies**:
- **React 19.1.1** - Latest stable React with modern features
- **React Router 7.8.2** - Latest routing with simplified API structure
- **Vite 7.1.2** - Fast build tool and dev server
- **Material-UI 7.3.2** - React component library with theme support
- **Jotai 2.13.1** - Atomic state management for themes
- **TypeScript 5.8.3** - Type safety with strict configuration
- **Vitest 3.2.4** - Modern testing framework

## Essential Patterns

### Lazy Loading Pattern

- ALL pages use `lazy()` imports in `src/routes.tsx`
- Pages are wrapped in `<SuspenseRoute component={PageComponent} />`
- `SuspenseRoute` provides consistent Suspense boundaries with `LoadingFallback`

```tsx
// In routes.tsx - this is the standard pattern
const HomePage = lazy(() => import('./pages/home'))
// In router config
{ path: '/', element: <SuspenseRoute component={HomePage} /> }
```

### File Structure Convention

Every component/page follows the **barrel export pattern**:

```
component-name/
├── ComponentName.tsx    # Main implementation
└── index.ts            # Barrel export: export { default } from './ComponentName'
```

### Path Aliases

- Use `@/` for `src/` imports (configured in `vite.config.ts`)
- Example: `import LoadingFallback from '@/components/loadingFallback'`

## Key Development Commands

- `npm run dev` - Start development server
- `npm run ltf` - **Recommended**: Lint + TypeCheck + Format (use before commits)
- `npm run ltfb` - Full pipeline: Lint + TypeCheck + Format + Build
- `npm run ltft` - Full pipeline: Lint + TypeCheck + Format + Test
- `npm run typecheck` - TypeScript checking without building

## TypeScript Configuration

- Uses composite TypeScript setup (`tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`)
- Strict type checking enabled with TypeScript ~5.8.3
- Import sorting via Prettier plugin (`@trivago/prettier-plugin-sort-imports`)
- Path aliases configured for clean imports (`@/` → `src/`)

## Code Style Enforcement

- **ESLint**: React Hooks rules, TypeScript recommended, Prettier integration
- **Key Rules**:
  - `react-refresh/only-export-components` for HMR compatibility
  - `@typescript-eslint/no-unused-vars: warn` (not error)
  - No explicit return types required on functions

## Adding New Pages

1. Create page folder in `src/pages/page-name/`
2. Create `PageName.tsx` component
3. Add barrel export in `index.ts`
4. Add lazy import and route in `src/routes.tsx`
5. Wrap in `SuspenseRoute` component

## Component Guidelines

- Use TypeScript interfaces for props (see `SuspenseRouteProps`)
- Default exports for components, named exports for utilities
- Keep components functional, avoid class components
- Use React 19 features (latest stable version)

## Build & Bundle

- Vite handles code splitting automatically with lazy imports
- Each lazy-loaded page becomes a separate chunk
- Build with `npm run build` (includes TypeScript compilation)
