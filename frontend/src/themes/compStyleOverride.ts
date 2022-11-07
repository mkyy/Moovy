export default function componentStyleOverrides(theme: any) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: theme.paper,
          height: '88px'
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          background: theme.paper
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: theme.background
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingInline: 5
        },
        content: {
          maxWidth: 'calc(100% - 56px)'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    }
  };
}
