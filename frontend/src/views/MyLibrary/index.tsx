import { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
// project imports
import { Movie } from '@custom-types/movie';
import Glass from 'ui-component/Glass';
import MainCard from 'ui-component/MainCard';
import { CustomizationContext } from 'context/CustomizationContext';

const MyLibrary = () => {
  const ContextComponent = useContext(CustomizationContext);

  const [results, setResults] = useState<Movie[] | null>(null);

  const MoovyApi = axios.create({
    baseURL: process.env.REACT_APP_MOOVY_API
  });

  const handleToggle = (movie: Movie) => {
    MoovyApi.delete('api/movie', { data: { imdbID: movie.imdbID } })
      .then(() => {
        const resultsUpdated = results?.filter((result) => result.imdbID !== movie.imdbID);

        ContextComponent?.handleAlert(false, movie.Title);
        setResults(resultsUpdated ?? results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    MoovyApi.get('api/movies').then((snapshot) => {
      if (snapshot.data.length < 1) return setResults(null);

      const data: Movie[] = snapshot.data;

      setResults(
        data.map((result) => {
          return { ...result, onLibrary: true };
        })
      );
    });
  }, []);

  return (
    <Container>
      <Box mb={3} pr={2} display='flex' justifyContent='space-between'>
        <Typography variant='h1'>My Library</Typography>
      </Box>

      <Grid container spacing={2}>
        {!results && (
          <Box width='300px' display='flex' flexDirection='column' alignItems='center' mx='auto'>
            <Glass />
            <Typography variant='body2'>
              It looks like there are no movies in your library! Search for a movie you have watched
              and add it here!
            </Typography>
          </Box>
        )}
        {results?.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={3}>
            <MainCard movieData={movie} handleToggle={handleToggle} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default MyLibrary;
