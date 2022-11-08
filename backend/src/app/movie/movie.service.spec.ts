import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let movieRepository: Repository<MovieEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, { provide: getRepositoryToken(MovieEntity), useValue: {} }]
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieRepository = module.get<Repository<MovieEntity>>(getRepositoryToken(MovieEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
