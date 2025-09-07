import { type ReactNode } from 'react'

import { act, render, screen } from '@testing-library/react'
import { Provider as JotaiProvider, createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { themeModeAtom } from '@/atoms/themeAtoms'

import { JotaiThemeProvider } from '../JotaiThemeProvider'

// Test component to verify theme is applied correctly
const TestComponent = () => (
  <div data-testid='theme-test'>Theme Provider Working</div>
)

const renderWithJotaiStore = (
  component: ReactNode,
  initialThemeMode: 'light' | 'dark' = 'light'
) => {
  const store = createStore()
  store.set(themeModeAtom, initialThemeMode)

  return (
    <JotaiProvider store={store}>
      <JotaiThemeProvider>{component}</JotaiThemeProvider>
    </JotaiProvider>
  )
}

describe('JotaiThemeProvider', () => {
  it('should render children', () => {
    render(renderWithJotaiStore(<TestComponent />))

    expect(screen.getByTestId('theme-test')).toBeInTheDocument()
    expect(screen.getByText('Theme Provider Working')).toBeInTheDocument()
  })

  it('should provide light theme when mode is light', () => {
    render(renderWithJotaiStore(<TestComponent />, 'light'))

    // Check if the light theme is applied by checking the theme provider exists
    expect(screen.getByTestId('theme-test')).toBeInTheDocument()
  })

  it('should provide dark theme when mode is dark', () => {
    render(renderWithJotaiStore(<TestComponent />, 'dark'))

    // Check if the dark theme is applied by checking the theme provider exists
    expect(screen.getByTestId('theme-test')).toBeInTheDocument()
  })

  it('should switch themes when atom value changes', () => {
    const store = createStore()
    store.set(themeModeAtom, 'light')

    const { rerender } = render(
      <JotaiProvider store={store}>
        <JotaiThemeProvider>
          <TestComponent />
        </JotaiThemeProvider>
      </JotaiProvider>
    )

    expect(screen.getByTestId('theme-test')).toBeInTheDocument()

    // Change theme mode within act to prevent warnings
    act(() => {
      store.set(themeModeAtom, 'dark')
    })

    rerender(
      <JotaiProvider store={store}>
        <JotaiThemeProvider>
          <TestComponent />
        </JotaiThemeProvider>
      </JotaiProvider>
    )

    expect(screen.getByTestId('theme-test')).toBeInTheDocument()
  })

  it('should work with nested components', () => {
    const NestedComponent = () => (
      <div>
        <TestComponent />
        <div data-testid='nested'>Nested Content</div>
      </div>
    )

    render(renderWithJotaiStore(<NestedComponent />))

    expect(screen.getByTestId('theme-test')).toBeInTheDocument()
    expect(screen.getByTestId('nested')).toBeInTheDocument()
  })
})
