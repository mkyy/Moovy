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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const delete_movie_dto_1 = require("./dto/delete-movie.dto");
const save_movie_dto_1 = require("./dto/save-movie.dto");
const movie_service_1 = require("./movie.service");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async save(body) {
        return this.movieService.save(body);
    }
    async delete(body) {
        return this.movieService.delete(body);
    }
    async get() {
        return this.movieService.get();
    }
    async saveAudio(imdbID, file) {
        return this.movieService.addAudio(imdbID, file.buffer, file.originalname);
    }
    async deleteAudio(imdbID, audioID) {
        return this.movieService.deleteAudio(imdbID, audioID);
    }
};
__decorate([
    (0, common_1.Post)('/movie'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_movie_dto_1.SaveMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "save", null);
__decorate([
    (0, common_1.Delete)('/movie'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_movie_dto_1.DeleteMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/movies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('/audio/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "saveAudio", null);
__decorate([
    (0, common_1.Delete)('/audio/:imdbID/:audioID'),
    __param(0, (0, common_1.Param)('imdbID')),
    __param(1, (0, common_1.Param)('audioID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteAudio", null);
MovieController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map