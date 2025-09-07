/* eslint-disable react-refresh/only-export-components */
import { type ReactElement, type ReactNode } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { type RenderOptions, render } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'

import { lightTheme } from '@/theme'

// Custom render function that includes necessary providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactNode }>
}

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <JotaiProvider>
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    </JotaiProvider>
  )
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const Wrapper = options?.wrapper || AllTheProviders
  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
