import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import { ReactComponent as Star } from 'assets/images/star.svg';
import { ReactComponent as Books } from 'assets/images/books.svg';
import { Movie } from '@custom-types/movie';
import { PlayArrow, Stop } from '@mui/icons-material';

interface Props {
  border?: boolean;
  movieData: Movie;
  handleToggle: (movie: Movie) => void;
}

const MainCard = forwardRef<HTMLDivElement, Props>(
  ({ border = false, movieData, handleToggle, ...others }, ref) => {
    const theme = useTheme();

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
      isPlaying ? audio?.pause() : audio?.play();
    };

    useEffect(() => {
      if (!movieData.audioId) return setAudio(null);

      const audioElement = new Audio(
        `${process.env.REACT_APP_MOOVY_API}audio/${movieData.audioId}`
      );
      audioElement.addEventListener('ended', () => setIsPlaying(false));
      setAudio(audioElement);
    }, []);

    return (
      <>
        <Card
          ref={ref}
          {...others}
          sx={{
            padding: theme.spacing(2),
            border: border ? '1px solid' : 'none',
            borderColor: theme.palette.primary.main,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
          }}
        >
          {/* card media|poster */}
          <CardMedia
            component='div'
            children={
              <>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={movieData.Poster}
                  alt={movieData.Title}
                />
                {!!movieData.audioId && !isPlaying && (
                  <IconButton
                    onClick={togglePlay}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '50px',
                      height: '50px',
                      background: '#fff',
                      display: 'block',
                      transform: 'translate(-50%, -50%)',
                      '&:hover': { background: '#fff' }
                    }}
                    children={<PlayArrow fontSize='large' sx={{ color: '#12153DE5' }} />}
                  />
                )}
                {!!movieData.audioId && isPlaying && (
                  <IconButton
                    onClick={togglePlay}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '50px',
                      height: '50px',
                      background: '#fff',
                      display: 'block',
                      transform: 'translate(-50%, -50%)',
                      '&:hover': { background: '#fff' }
                    }}
                    children={<Stop fontSize='large' sx={{ color: '#12153DE5' }} />}
                  />
                )}
              </>
            }
            sx={{
              position: 'relative',
              flexGrow: 2
            }}
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
                onClick={() => setOpen(true)}
              >
                Remove
              </Button>
            </CardContent>
          )}
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Remove "{movieData.Title}"?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Removing "{movieData.Title}" makes you lose any audio review stored for this movie.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='info' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='error' onClick={() => handleToggle(movieData)}>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
export default MainCard;
