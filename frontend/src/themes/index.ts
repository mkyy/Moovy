import { CustomizationType } from '@custom-types/theme';
import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization: CustomizationType) => {
  const color = colors;
  const mode = customization.navType;

  const themeOption =
    mode === 'light'
      ? {
          colors: color,
          heading: color.grey900,
          paper: color.paper,
          backgroundDefault: color.paper,
          background: color.grey50,
          darkTextPrimary: color.grey700,
          darkTextSecondary: color.grey500,
          textDark: color.grey900,
          divider: color.grey200,
          customization
        }
      : {
          // DARK MODE COLORS
          colors: color,
          heading: color.grey200,
          paper: color.darkPaper,
          backgroundDefault: color.paper,
          background: color.darkBackground,
          darkTextPrimary: color.grey700,
          darkTextSecondary: color.grey500,
          textDark: color.grey900,
          divider: color.grey200,
          customization
        };

  const themes = createTheme({
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  });
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
