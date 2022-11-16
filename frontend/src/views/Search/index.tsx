import SearchBar from '@mkyy/mui-search-bar';
import { Box, Container, Grid, Typography } from '@mui/material';
import axios, { AxiosPromise } from 'axios';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/MainCard';
// images
import Glass from 'ui-component/Glass';

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  imdbRating?: string;
};

const Search = () => {
  const [results, setResults] = useState<Movie[] | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
  });

  useEffect(() => {
    if (filter === null || filter === undefined) return setResults(null);

    api
      .get(`?apikey=${process.env.REACT_APP_APIKEY}&s=${filter}&type=movie`)
      .then(async (snapshot) => {
        const data: Movie[] = snapshot.data.Search;
        const requests: Promise<AxiosPromise<any>>[] = [];
        const res: Array<any> = [];

        // requesting each movie details to get imdb Rating, that doesn't come on search request.
        data.forEach((movie) => {
          requests.push(api.get(`?apikey=${process.env.REACT_APP_APIKEY}&i=${movie.imdbID}`));
        });

        await Promise.all(requests).then((snapshot) => {
          snapshot.forEach((movie) => {
            res.push(movie.data);
          });
        });
        console.log(res);
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
            <MainCard
              poster={movie.Poster}
              title={movie.Title}
              year={movie.Year}
              rating={movie.imdbRating}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Search;
