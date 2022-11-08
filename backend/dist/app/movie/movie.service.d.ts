import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { SaveMovieDto } from './dto/save-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
export declare class MovieService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<MovieEntity>);
    save(data: SaveMovieDto): Promise<MovieEntity>;
    get(): Promise<MovieEntity[]>;
    delete(data: DeleteMovieDto): Promise<import("typeorm").DeleteResult>;
}
