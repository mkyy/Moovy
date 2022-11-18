/// <reference types="node" />
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { AudioService } from '../audio/audio.service';
import { SaveMovieDto } from './dto/save-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
export declare class MovieService {
    private readonly movieRepository;
    private readonly audioService;
    constructor(movieRepository: Repository<MovieEntity>, audioService: AudioService);
    save(data: SaveMovieDto): Promise<MovieEntity>;
    get(): Promise<MovieEntity[]>;
    delete(data: DeleteMovieDto): Promise<import("typeorm").DeleteResult>;
    addAudio(imdbID: string, audioBuffer: Buffer, filename: string): Promise<import("../audio/audio.entity").default>;
    deleteAudio(imdbID: string, id: number): Promise<import("typeorm").DeleteResult>;
}
