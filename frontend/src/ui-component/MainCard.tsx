import { Add } from '@mui/icons-material';
import { Button, Card, CardHeader, CardMedia, useTheme } from '@mui/material';
import { forwardRef, ReactFragment } from 'react';

interface Props {
  border?: boolean;
  content?: boolean;
  title: string;
  poster: string;
  year: string | number;
}

const MainCard = forwardRef<HTMLDivElement, Props>(
  ({ border = false, content = true, title, poster, year, ...others }, ref) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          padding: theme.spacing(2),
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary.main,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* card media|poster */}
        <CardMedia component='img' image={poster} alt={title} sx={{ flexGrow: 2 }} />

        {/* card header and action */}
        {title && (
          <CardHeader
            title={title}
            titleTypographyProps={{
              sx: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                maxWidth: '90%'
              }
            }}
            subheader={year}
            action={
              <Button variant='contained' sx={{ minWidth: 'fit-content', mt: 1 }}>
                <Add />
              </Button>
            }
          />
        )}

        {/* card content */}
        {/* {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children} */}
      </Card>
    );
  }
);
export default MainCard;
