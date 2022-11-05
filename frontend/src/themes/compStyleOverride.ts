export default function componentStyleOverrides(theme: any) {
  const bgColor = theme.colors?.grey50;
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
          background: theme.paper
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
    }
  };
}
