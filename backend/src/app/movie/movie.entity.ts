import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import AudioEntity from '../audio/audio.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'title' })
  Title: string;

  @Column({ name: 'poster' })
  Poster: string;

  @Column({ name: 'year' })
  Year: string;

  @Column({ name: 'imdb_rating' })
  imdbRating: string;

  @Column({ name: 'imdb_id' })
  imdbID: string;

  @JoinColumn({ name: 'audioId' })
  @OneToOne(() => AudioEntity, {
    nullable: true
  })
  public audio?: AudioEntity;

  @Column({ nullable: true })
  public audioId?: number;
}
