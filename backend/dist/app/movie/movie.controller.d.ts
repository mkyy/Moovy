import { DeleteMovieDto } from './dto/delete-movie.dto';
import { SaveMovieDto } from './dto/save-movie.dto';
import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    save(body: SaveMovieDto): Promise<import("./movie.entity").MovieEntity>;
    delete(body: DeleteMovieDto): Promise<import("typeorm").DeleteResult>;
    get(): Promise<import("./movie.entity").MovieEntity[]>;
}