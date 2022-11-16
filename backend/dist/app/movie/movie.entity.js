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
let MovieEntity = class MovieEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MovieEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'poster' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "poster", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imdb_rating' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "imdbRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imdb_id' }),
    __metadata("design:type", String)
], MovieEntity.prototype, "imdbID", void 0);
MovieEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'movies' })
], MovieEntity);
exports.MovieEntity = MovieEntity;
//# sourceMappingURL=movie.entity.js.map