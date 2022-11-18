import { AudioService } from './audio.service';
import { Response } from 'express';
export declare class AudioController {
    private readonly audioService;
    constructor(audioService: AudioService);
    getDatabaseFileById(response: Response, id: number): Promise<void>;
}
