import AudioEntity from '../audio/audio.entity';
export declare class MovieEntity {
    id: number;
    Title: string;
    Poster: string;
    imdbRating: string;
    imdbID: string;
    audio?: AudioEntity;
    audioId?: number;
}
