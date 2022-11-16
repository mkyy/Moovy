import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  Title: string;

  @Column({ name: 'poster' })
  Poster: string;

  @Column({ name: 'imdb_rating' })
  imdbRating: string;

  @Column({ name: 'imdb_id' })
  imdbID: string;
}
