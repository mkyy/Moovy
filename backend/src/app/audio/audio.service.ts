import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AudioEntity from './audio.entity';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>
  ) {}

  async uploadAudio(dataBuffer: Buffer, filename: string) {
    const newFile = await this.audioRepository.create({
      filename,
      data: dataBuffer
    });
    await this.audioRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.audioRepository.findOne({
      where: {
        id: fileId
      }
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async delete(id: number) {
    return this.audioRepository.delete({
      id: id
    });
  }
}
