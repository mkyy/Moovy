import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { SaveMovieDto } from './dto/save-movie.dto';
import { MovieService } from './movie.service';
import { Express } from 'express';

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

  @Post('/audio/:id')
  @UseInterceptors(FileInterceptor('file'))
  async saveAudio(@Param('id') imdbID: string, @Req() @UploadedFile() file: Express.Multer.File) {
    return this.movieService.addAudio(imdbID, file.buffer, file.originalname);
  }

  @Delete('/audio/:movieId/:audioID')
  async deleteAudio(@Param('movieId') movieId: string, @Param('audioID') audioID: number) {
    return this.movieService.deleteAudio(movieId, audioID);
  }
}
