import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from 'ui-component/Logo';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';

const pages = [
  { id: 'search', url: 'search/default', title: 'Search' },
  { id: 'library', url: 'my-library/default', title: 'My Library' }
];

const Header = () => {
  const theme = useTheme();

  const [selectedPage, setSelectedPage] = useState('search');

  const handleSelect = (props: string) => {
    setSelectedPage(props);
  };

  return (
    <>
      <Box mr={4}>
        <Logo />
      </Box>
      <Box>
        {pages.map((page) => (
          <Button
            sx={{
              ...theme.typography.caption,
              color: selectedPage === page.id ? theme.palette.primary.main : 'inherit'
            }}
            component={React.forwardRef((props, ref) => (
              <Link {...props} ref={null} to={page.url} onClick={() => handleSelect(page.id)} />
            ))}
            variant='text'
            key={page.title}
          >
            {page.title}
          </Button>
        ))}
      </Box>
      <Box flexGrow={2} />
      <ThemeSwitch />
    </>
  );
};
export default Header;
