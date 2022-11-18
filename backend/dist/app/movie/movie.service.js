"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
const audio_service_1 = require("../audio/audio.service");
let MovieService = class MovieService {
    constructor(movieRepository, audioService) {
        this.movieRepository = movieRepository;
        this.audioService = audioService;
    }
    async save(data) {
        return this.movieRepository.save(this.movieRepository.create(data));
    }
    async get() {
        return this.movieRepository.find();
    }
    async delete(data) {
        return this.movieRepository.delete({
            imdbID: data.imdbID
        });
    }
    async addAudio(imdbID, audioBuffer, filename) {
        const audio = await this.audioService.uploadAudio(audioBuffer, filename);
        await this.movieRepository.update(imdbID, {
            audioId: audio.id
        });
        return audio;
    }
    async deleteAudio(imdbID, id) {
        await this.movieRepository.update(imdbID, {
            audio: null,
            audioId: null
        });
        const audio = await this.audioService.delete(id);
        return audio;
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.MovieEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audio_service_1.AudioService])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map