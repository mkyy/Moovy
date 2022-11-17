import SearchBar from '@mkyy/mui-search-bar';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios, { AxiosPromise } from 'axios';
import { useContext, useEffect, useState } from 'react';
import MainCard from 'ui-component/MainCard';
import { Movie } from '@custom-types/movie';
// images
import Glass from 'ui-component/Glass';
import { CustomizationContext } from 'context/CustomizationContext';

const Search = () => {
  const [results, setResults] = useState<Movie[] | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const ContextComponent = useContext(CustomizationContext);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
  });

  const MoovyApi = axios.create({
    baseURL: process.env.REACT_APP_MOOVY_API
  });

  const handleToggle = (movie: Movie) => {
    if (movie.onLibrary)
      return MoovyApi.delete('api/movie', { data: { imdbID: movie.imdbID } })
        .then(() => {
          const resultsUpdated = results?.map((result) => {
            if (result.imdbID !== movie.imdbID) return result;

            return { ...result, onLibrary: false };
          });
          ContextComponent?.handleAlert(false, movie.Title);
          setResults(resultsUpdated ?? results);
        })
        .catch((err) => console.log(err));

    MoovyApi.post('api/movie', {
      Title: movie.Title,
      Poster: movie.Poster,
      imdbRating: movie.imdbRating,
      imdbID: movie.imdbID
    }).catch((err) => console.log(err));

    const resultsUpdated = results?.map((result) => {
      if (result.imdbID !== movie.imdbID) return result;

      return { ...result, onLibrary: true };
    });

    ContextComponent?.handleAlert(true, movie.Title);
    setResults(resultsUpdated ?? results);
  };

  useEffect(() => {
    if (filter === null || filter === undefined) return setResults(null);

    api
      .get(`?apikey=${process.env.REACT_APP_APIKEY}&s=${filter}&type=movie`)
      .then(async (snapshot) => {
        const data: Movie[] = snapshot.data.Search;
        const favorites: Movie[] = [];
        const requests: Promise<AxiosPromise<any>>[] = [];
        const res: Array<any> = [];

        await MoovyApi.get('api/movies').then((snapshot) => {
          const myLibraryMovies: Movie[] = snapshot.data;

          myLibraryMovies.forEach((movie) => {
            favorites.push(movie);
          });
        });

        // requesting each movie details to get imdb Rating, that doesn't come on search request.
        data.forEach((movie) => {
          requests.push(api.get(`?apikey=${process.env.REACT_APP_APIKEY}&i=${movie.imdbID}`));
        });

        await Promise.all(requests).then((snapshot) => {
          snapshot.forEach((movie) => {
            let isOnLibrary = false;
            const onLibraryMovie = favorites.find(
              (movieFromLibrary) => movieFromLibrary.imdbID === movie.data.imdbID
            );

            if (onLibraryMovie !== undefined) {
              isOnLibrary = true;
            }

            res.push({ ...movie.data, onLibrary: isOnLibrary });
          });
        });
        setResults(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

  return (
    <Container>
      <Box mb={3} pr={2} display='flex' justifyContent='space-between'>
        <Typography variant='h1'>Search</Typography>
        <SearchBar
          value={filter}
          onChange={(value: string) => setFilter(value)}
          onCancelResearch={() => setFilter(null)}
        />
      </Box>

      <Grid container spacing={2}>
        {!results && (
          <Box width='300px' display='flex' flexDirection='column' alignItems='center' mx='auto'>
            <Glass />
            <Typography variant='body2'>
              We couldn´t find the movies you were lookin for :({' '}
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
export default Search;
