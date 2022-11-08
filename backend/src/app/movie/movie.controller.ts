import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { SaveMovieDto } from './dto/save-movie.dto';
import { MovieService } from './movie.service';

@Controller('api')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/movie')
  async save(@Body() body: SaveMovieDto) {
    return this.movieService.save(body);
  }

  @Delete('/movie')
  async delete(@Body() body: DeleteMovieDto) {
    return this.movieService.delete(body);
  }

  @Get('/movies')
  async get() {
    return this.movieService.get();
  }
}
