// Re-exports for backward compatibility and centralized theme access
export { JotaiThemeProvider } from './JotaiThemeProvider'
export { lightTheme, darkTheme } from './index'

// Re-export types and hooks from their new locations
export type { ThemeMode } from '@/atoms/themeAtoms'
export { useTheme } from '@/hooks/useTheme'

// Deprecated: use useTheme instead - kept for backward compatibility
export { useTheme as useThemeMode } from '@/hooks/useTheme'
