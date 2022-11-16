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
import { Movie } from '@custom-types/movie';

interface Props {
  border?: boolean;
  movieData: Movie;
  handleToggle: (movie: Movie) => void;
}

const MainCard = forwardRef<HTMLDivElement, Props>(
  ({ border = false, movieData, handleToggle, ...others }, ref) => {
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
        <CardMedia
          component='img'
          image={movieData.Poster}
          alt={movieData.Title}
          sx={{ flexGrow: 2 }}
        />

        {/* card header and action */}
        {movieData.Title && (
          <CardHeader
            title={movieData.Title}
            titleTypographyProps={{
              sx: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
                maxWidth: '90%'
              }
            }}
            subheader={movieData.Year}
            action={
              <Box display='flex' alignItems='center'>
                <Star />
                <Typography ml={1} variant='h3'>
                  {movieData.imdbRating}
                </Typography>
              </Box>
            }
          />
        )}

        {/* card content */}
        {!movieData.onLibrary && (
          <CardContent>
            <Button
              variant='contained'
              fullWidth
              color='success'
              startIcon={<Books />}
              onClick={() => handleToggle(movieData)}
            >
              Add to Library
            </Button>
          </CardContent>
        )}
        {movieData.onLibrary && (
          <CardContent>
            <Button
              variant='contained'
              fullWidth
              color='error'
              startIcon={<Books />}
              onClick={() => handleToggle(movieData)}
            >
              Remove
            </Button>
          </CardContent>
        )}
      </Card>
    );
  }
);
export default MainCard;
