import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Readable } from 'stream';
import { AudioService } from './audio.service';
import { Response } from 'express';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get(':id')
  async getDatabaseFileById(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
    const file = await this.audioService.getFileById(id);

    const stream = Readable.from(file.data);
    stream.pipe(response);
  }
}
