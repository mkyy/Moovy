import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';

// dto's
import { SaveMovieDto } from './dto/save-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  async save(data: SaveMovieDto): Promise<MovieEntity> {
    return this.movieRepository.save(this.movieRepository.create(data));
  }

  async get(): Promise<MovieEntity[]> {
    return this.movieRepository.find();
  }

  async delete(data: DeleteMovieDto) {
    return this.movieRepository.delete({
      id: data.id
    });
  }
}
