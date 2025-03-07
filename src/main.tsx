import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider  } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import theme from "./theme.ts";
import './index.css'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';
const queryclient= new QueryClient()
import AuthProvider from './AuthContext.tsx';
createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      <CssBaseline/>
      <GlobalStyles
        styles={{
          '.fc': {
            backgroundColor: '#fafafa', // Light gray background
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          },
          '.fc-daygrid-day': {
            borderColor: '#ddd', // Light border for days
          },
          '.fc-day-today': {
            backgroundColor: '#e3f2fd !important', // Light blue for today's date
          },
          '.fc-daygrid-event': {
            backgroundColor: '#1E4854', // Primary blue for events
            color: '#fff', // White text
            borderRadius: '5px',
            padding: '5px',
            fontWeight: 'light',
            border: 'none',
          },
          '.fc-toolbar-title': {
            fontSize: '1rem', // Bigger title
            color: '#1E4854',
          },
        }}
      />
      <AuthProvider>
      <App />
      </AuthProvider>
    <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
  </StrictMode>
  </ThemeProvider>
)
