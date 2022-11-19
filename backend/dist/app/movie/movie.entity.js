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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieEntity = void 0;
const typeorm_1 = require("typeorm");
const audio_entity_1 = require("../audio/audio.entity");
let MovieEntity = class MovieEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovieEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'poster' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "Poster", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "Year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imdb_rating' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "imdbRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imdb_id' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "imdbID", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'audioId' }),
    (0, typeorm_1.OneToOne)(() => audio_entity_1.default, {
        nullable: true
    }),
    __metadata("design:type", audio_entity_1.default)
], MovieEntity.prototype, "audio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MovieEntity.prototype, "audioId", void 0);
MovieEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'movies' })
], MovieEntity);
exports.MovieEntity = MovieEntity;
//# sourceMappingURL=movie.entity.js.map