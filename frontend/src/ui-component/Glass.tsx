import { useTheme } from '@mui/material';

const Glass = () => {
  const theme = useTheme();

  return (
    <svg
      width='166'
      height='166'
      viewBox='0 0 166 166'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M75.8803 131.509C106.359 131.509 131.066 106.801 131.066 76.3232C131.066 45.845 106.359 21.1375 75.8803 21.1375C45.4021 21.1375 20.6946 45.845 20.6946 76.3232C20.6946 106.801 45.4021 131.509 75.8803 131.509Z'
        stroke={theme.palette.mode === 'light' ? '#12153D' : theme.palette.grey[50]}
        stroke-width='2.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M144.863 145.305L114.855 115.298'
        stroke={theme.palette.mode === 'light' ? '#12153D' : theme.palette.grey[50]}
        stroke-width='2.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
export default Glass;
