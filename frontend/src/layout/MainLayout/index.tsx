import { Alert, AppBar, Box, Collapse, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { Outlet } from 'react-router';
import { styled, useTheme } from '@mui/material/styles';
import Header from './Header';
import { Close } from '@mui/icons-material';
import { useContext } from 'react';
import { CustomizationContext } from 'context/CustomizationContext';
import { Mainprops } from '@custom-types/layout';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<Mainprops>(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(open && {
      marginTop: '150px'
    })
  })
);

const MainLayout = () => {
  const theme = useTheme();

  const ContextComponent = useContext(CustomizationContext);

  return (
    <>
      <Box>
        <CssBaseline />

        {/*< ---- header ---- >*/}
        <AppBar position='fixed' elevation={0}>
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            width: '100%',
            position: 'fixed',
            top: '88px',
            display: 'flex',
            justifyContent: 'center'
          }}
          zIndex={2}
        >
          <Collapse in={ContextComponent?.open} sx={{ width: '100%', maxWidth: 'lg' }}>
            {ContextComponent?.isAdd ? (
              <Alert
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      ContextComponent?.setOpen(false);
                    }}
                  >
                    <Close fontSize='inherit' />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {ContextComponent?.alertTitle} was added to your Library!
              </Alert>
            ) : (
              <Alert
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      ContextComponent?.setOpen(false);
                    }}
                  >
                    <Close fontSize='inherit' />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                color='error'
              >
                {ContextComponent?.alertTitle} deleted from your watchlist.
              </Alert>
            )}
          </Collapse>
        </Box>

        {/*< ---- main content ---- >*/}
        <Main theme={theme} open={ContextComponent?.open}>
          <Outlet />
        </Main>
      </Box>
    </>
  );
};
export default MainLayout;
