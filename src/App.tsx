import CssBaseline from '@mui/material/CssBaseline'

import Routes from './routes'
import { JotaiThemeProvider } from './theme/theme'

function App() {
  return (
    <JotaiThemeProvider>
      <CssBaseline enableColorScheme />
      <Routes />
    </JotaiThemeProvider>
  )
}

export default App
