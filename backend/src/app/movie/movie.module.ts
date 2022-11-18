import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { AudioModule } from '../audio/audio.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), AudioModule],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
