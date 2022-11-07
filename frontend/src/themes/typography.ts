/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme: any) {
  return {
    fontFamily: theme?.customization?.fontFamily,
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '0.75rem'
    },
    h5: {
      fontSize: '0.875rem',
      color: theme.heading,
      fontWeight: 500
    },
    h4: {
      fontSize: '1rem',
      color: theme.heading,
      fontWeight: 600
    },
    h3: {
      fontSize: '1.25rem',
      color: theme.heading,
      fontWeight: 600
    },
    h2: {
      fontSize: '1.5rem',
      color: theme.heading,
      fontWeight: 700
    },
    h1: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkTextSecondary
    },
    caption: {
      fontSize: '16px',
      textTransform: 'capitalize' as const,
      color: theme.textDark,
      fontWeight: 700
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em'
    },
    body2: {
      fontFamily: 'Arial',
      fontSize: '24px',
      fontWeight: '400',
      textAlign: 'center' as const,
      lineHeight: '28px',
      color: theme.darkTextPrimary
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: 5
        }
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important'
      },
      '& legend': {
        display: 'none'
      },
      '& fieldset': {
        top: 0
      }
    },
    mainContent: {
      backgroundColor: theme.paper,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px'
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.heading,
      padding: '6px',
      marginTop: '10px'
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: theme.darkTextSecondary
    }
  };
}
