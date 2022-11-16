import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'poster' })
  poster: string;

  @Column({ name: 'imdb_rating' })
  imdbRating: string;

  @Column({ name: 'imdb_id' })
  imdbID: string;
}
