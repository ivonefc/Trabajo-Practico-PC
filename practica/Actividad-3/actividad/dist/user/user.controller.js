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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(body) {
        this.validateRequestBody(body);
        this.normalizeNames(body);
        return await this.userService.sendToExternalService(body);
    }
    validateRequestBody(body) {
        if (typeof body.name !== 'string' || typeof body.surname !== 'string') {
            throw new common_1.BadRequestException('Los campos name y surname deben ser textos.');
        }
        const birthdayRegex = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!birthdayRegex.test(body.birthday)) {
            throw new common_1.BadRequestException('El campo birthday debe estar en el formato YYYY/MM/DD');
        }
        const birthdayDate = new Date(body.birthday);
        const minDate = new Date('1900-01-01');
        const today = new Date();
        if (birthdayDate < minDate || birthdayDate > today) {
            throw new common_1.BadRequestException('El campo birthday debe estar entre 1900/01/01 y la fecha actual');
        }
        if (!Number.isInteger(body.age)) {
            throw new common_1.BadRequestException('El campo age debe ser un número entero');
        }
        if (body.documentType !== 'CUIT' && body.documentType !== 'DNI') {
            throw new common_1.BadRequestException('El campo documentType debe ser CUIT o DNI');
        }
        if (!Number.isInteger(body.documentNumber)) {
            throw new common_1.BadRequestException('El campo documentNumber debe ser un número entero');
        }
    }
    normalizeNames(body) {
        body.name = this.capitalizeWords(body.name);
        body.surname = this.capitalizeWords(body.surname);
    }
    capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map