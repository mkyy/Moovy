export type Movie = {
  Poster: string;
  Title: string;
  Type?: string;
  Year: string;
  imdbID: string;
  imdbRating?: string;
  onLibrary?: boolean;
  audioId: number | null;
  id: number;
};
