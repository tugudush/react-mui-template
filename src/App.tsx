import CssBaseline from '@mui/material/CssBaseline'

import Routes from './routes'
import { ThemeContextProvider } from './theme/ThemeContextProvider'

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline enableColorScheme />
      <Routes />
    </ThemeContextProvider>
  )
}

export default App
