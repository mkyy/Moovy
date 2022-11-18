import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { AudioService } from '../audio/audio.service';

// dto's
import { SaveMovieDto } from './dto/save-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly audioService: AudioService
  ) {}

  async save(data: SaveMovieDto): Promise<MovieEntity> {
    return this.movieRepository.save(this.movieRepository.create(data));
  }

  async get(): Promise<MovieEntity[]> {
    return this.movieRepository.find();
  }

  async delete(data: DeleteMovieDto) {
    return this.movieRepository.delete({
      imdbID: data.imdbID
    });
  }

  async addAudio(imdbID: string, audioBuffer: Buffer, filename: string) {
    const audio = await this.audioService.uploadAudio(audioBuffer, filename);
    await this.movieRepository.update(imdbID, {
      audioId: audio.id
    });
    return audio;
  }

  async deleteAudio(imdbID: string, id: number) {
    await this.movieRepository.update(imdbID, {
      audio: null,
      audioId: null
    });
    const audio = await this.audioService.delete(id);

    return audio;
  }
}
