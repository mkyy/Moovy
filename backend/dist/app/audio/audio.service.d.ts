/// <reference types="node" />
import { Repository } from 'typeorm';
import AudioEntity from './audio.entity';
export declare class AudioService {
    private audioRepository;
    constructor(audioRepository: Repository<AudioEntity>);
    uploadAudio(dataBuffer: Buffer, filename: string): Promise<AudioEntity>;
    getFileById(fileId: number): Promise<AudioEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
