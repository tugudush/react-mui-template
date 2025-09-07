# React Template

A simple and minimal Vite + React + React Router template with modern development setup.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React version
- 🛣️ **React Router 7** - Client-side routing
- 🎨 **Material-UI 7** - Modern React component library
- 🌙 **Theme Management** - Jotai-based atomic state for themes
- 📦 **Lazy Loading** - Code splitting with React.lazy()
- ⏳ **Suspense** - Loading fallbacks for async components
- 🧪 **Testing** - Vitest + React Testing Library setup
- 🎨 **TypeScript** - Type safety
- 🔧 **ESLint** - Code linting
- 💅 **Prettier** - Code formatting
- 📁 **Clean Architecture** - Organized folder structure

## Project Structure

```
src/
├── atoms/              # Jotai state atoms
│   └── __tests__/      # Atom tests
├── components/         # Reusable components
│   ├── loadingFallback/  # Loading spinner/fallback
│   │   └── __tests__/    # Component tests
│   ├── suspenseRoute/    # Suspense wrapper for lazy routes
│   │   └── __tests__/    # Component tests
│   └── themeToggle/      # Theme toggle button
├── hooks/              # Custom React hooks
│   └── __tests__/      # Hook tests
├── pages/              # Page components
│   ├── home/           # Home page
│   ├── about/          # About page
│   └── error/          # 404/Error page
├── theme/              # MUI theme configuration
├── test-utils.tsx      # Testing utilities
├── App.tsx             # Main app component
├── routes.tsx          # Router configuration
├── test-setup.ts       # Test configuration
└── main.tsx           # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Quality

- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with Vitest UI

### Combined Workflows

- `npm run lf` - Lint fix + Format
- `npm run ltf` - Lint fix + Type check + Format
- `npm run ltfb` - Lint fix + Type check + Format + Build
- `npm run ltft` - Lint fix + Type check + Format + Test

## Routes

- `/` - Home page
- `/about` - About page
- `*` - 404/Error page (catch-all)

## Key Features

### Material-UI Integration

- **CSS Variables**: Optimal theming performance with CSS variables
- **Theme Switching**: Light/dark mode with system preference detection
- **Jotai State Management**: Atomic state management for themes
- **Persistent Preferences**: Theme preferences saved to localStorage

### Lazy Loading

All pages are lazy loaded using `React.lazy()` for optimal bundle splitting and performance.

### Suspense Boundaries

Each route is wrapped with a `SuspenseRoute` component that provides loading fallbacks while lazy components are being loaded.

### Testing Infrastructure

- **Vitest**: Modern testing framework with fast execution
- **React Testing Library**: Component testing utilities
- **Test Coverage**: Comprehensive coverage for atoms, hooks, and components
- **Mocking**: Proper mocking for localStorage and matchMedia APIs

### Type Safety

Full TypeScript support with proper type definitions for all components and routes.

### Modern Tooling

- ESLint with React and TypeScript rules
- Prettier for consistent code formatting
- Import sorting with `@trivago/prettier-plugin-sort-imports`

## Customization

This template provides a minimal setup that you can extend based on your needs:

- Add more pages in `src/pages/`
- Create reusable components in `src/components/`
- Update routing in `src/routes.tsx`
- Customize styling (CSS modules, styled-components, Tailwind, etc.)
- Add state management (Zustand, Redux Toolkit, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).
