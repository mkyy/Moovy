import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioEntity from './audio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioEntity])],
  providers: [AudioService],
  controllers: [AudioController],
  exports: [AudioService]
})
export class AudioModule {}
