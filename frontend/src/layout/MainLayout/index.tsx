import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router';
import { styled, useTheme } from '@mui/material/styles';
import Header from './Header';

const Main = styled('main')(({ theme }) => ({
  background: '#8F8F8F'
}));

const MainLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Box display='flex'>
        <CssBaseline />

        {/*< ---- header ---- >*/}
        <AppBar position='fixed' elevation={0}>
          <Toolbar>
            <Header />
          </Toolbar>
        </AppBar>

        {/*< ---- main content ---- >*/}
        <Main theme={theme}>
          <Outlet />
        </Main>
      </Box>
    </>
  );
};
export default MainLayout;
