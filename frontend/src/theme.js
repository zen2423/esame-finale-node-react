import { createTheme } from '@mui/material/styles'

// Sporty dark palette: black/gray/red
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e10600' // Nissan/NISMO red vibe
    },
    background: {
      default: '#0f0f10',
      paper: '#161618'
    },
    text: {
      primary: '#e8e8e8',
      secondary: '#bdbdbd'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, system-ui, -apple-system, \"Segoe UI\", \"Helvetica Neue\", Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10
        }
      }
    }
  }
})

export default theme
