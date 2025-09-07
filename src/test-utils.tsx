/* eslint-disable react-refresh/only-export-components */
import { type ReactElement, type ReactNode } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { type RenderOptions, render } from '@testing-library/react'
import { Provider as JotaiProvider } from 'jotai'
import { MemoryRouter } from 'react-router'

import { lightTheme } from '@/theme'

// Custom render function that includes necessary providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactNode }>
  initialEntries?: string[]
}

const AllTheProviders = ({
  children,
  initialEntries = ['/'],
}: {
  children: ReactNode
  initialEntries?: string[]
}) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <JotaiProvider>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </JotaiProvider>
    </MemoryRouter>
  )
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { initialEntries, ...renderOptions } = options || {}
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders initialEntries={initialEntries}>
      {children}
    </AllTheProviders>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
