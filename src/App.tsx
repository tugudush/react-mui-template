import CssBaseline from '@mui/material/CssBaseline'

import ErrorBoundary from './components/errorBoundary'
import Routes from './routes'
import { JotaiThemeProvider } from './theme/theme'

function App() {
  return (
    <ErrorBoundary>
      <JotaiThemeProvider>
        <CssBaseline enableColorScheme />
        <Routes />
      </JotaiThemeProvider>
    </ErrorBoundary>
  )
}

export default App
