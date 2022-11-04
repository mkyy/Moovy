import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';

// project imports
import Routes from 'routes';
import themes from 'themes';

// config file
import config from 'config';

function App() {
  // handling theme preference
  if (localStorage.getItem('theme-mode') === null) {
    localStorage.setItem('theme-mode', 'light');
  }
  const themeOption = localStorage.getItem('theme-mode');

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={themes({
          fontFamily: config.fontFamily,
          borderRadius: config.borderRadius,
          navType: themeOption
        })}
      >
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
