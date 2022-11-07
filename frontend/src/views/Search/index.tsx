import SearchBar from '@mkyy/mui-search-bar';
import { Box, Container, Grid, SvgIcon, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/MainCard';

// images
import { ReactComponent as Glass } from 'assets/images/glass.svg';

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
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
      .then((snapshot) => {
        setResults(snapshot.data.Search);
        console.log(snapshot.data.Search);
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
          <Grid item key={movie.imdbID} xs={3}>
            <MainCard poster={movie.Poster} title={movie.Title} year={movie.Year} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Search;
