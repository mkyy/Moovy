import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Search = Loadable(lazy(() => import('views/Search')));
const MyLibrary = Loadable(lazy(() => import('views/MyLibrary')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Search />
    },
    {
      path: 'search',
      children: [
        {
          path: 'default',
          element: <Search />
        }
      ]
    },
    {
      path: 'my-library',
      children: [
        {
          path: 'default',
          element: <MyLibrary />
        }
      ]
    }
  ]
};

export default MainRoutes;
