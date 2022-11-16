import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme
} from '@mui/material';
import { forwardRef } from 'react';
import { ReactComponent as Star } from 'assets/images/star.svg';
import { ReactComponent as Books } from 'assets/images/books.svg';

interface Props {
  border?: boolean;
  content?: boolean;
  title: string;
  poster: string;
  year: string | number;
  rating?: string;
}

const MainCard = forwardRef<HTMLDivElement, Props>(
  ({ border = false, content = true, title, poster, year, rating, ...others }, ref) => {
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
              <Box display='flex' alignItems='center'>
                <Star />
                <Typography ml={1} variant='h3'>
                  {rating}
                </Typography>
              </Box>
            }
          />
        )}

        {/* card content */}
        {content && (
          <CardContent>
            <Button variant='contained' fullWidth color='success' startIcon={<Books />}>
              Add to Library
            </Button>
          </CardContent>
        )}
      </Card>
    );
  }
);
export default MainCard;
