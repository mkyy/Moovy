import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { useContext } from 'react';

// project imports
import { CustomizationContext } from 'context/CustomizationContext';
import themes from 'themes';
import Routes from 'routes';

// config file
import config from 'config';

function App() {
  const ThemeContext = useContext(CustomizationContext);

  // handling theme preference
  if (localStorage.getItem('theme-mode') === null) {
    localStorage.setItem('theme-mode', 'light');
    ThemeContext?.setThemeStyle('light');
  } else {
    ThemeContext?.setThemeStyle(localStorage.getItem('theme-mode') ?? 'light');
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider
        theme={themes({
          fontFamily: config.fontFamily,
          borderRadius: config.borderRadius,
          navType: ThemeContext?.themeStyle
        })}
      >
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
