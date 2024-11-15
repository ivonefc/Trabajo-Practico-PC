import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async crearUser(@Body() body: any) {
        this.validarCampos(body);
        this.normalizarNameSurname(body);

        return await this.userService.enviarPeticion(body);
    }

    private validarCampos(body: any) {
        if (typeof body.name !== 'string' || typeof body.surname !== 'string') {
            throw new BadRequestException('Los campos name y surname deben ser textos.');
        }

        const birthdayRegex = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!birthdayRegex.test(body.birthday)) {
            throw new BadRequestException('El campo birthday debe estar en el formato YYYY/MM/DD');
        }

        const birthdayDate = new Date(body.birthday);
        const minDate = new Date('1900-01-01');
        const today = new Date();
        if (birthdayDate < minDate || birthdayDate > today) {
            throw new BadRequestException('El campo birthday debe estar entre 1900/01/01 y la fecha actual');
        }

        if (!Number.isInteger(body.age)) {
            throw new BadRequestException('El campo age debe ser un número entero');
        }

        if (body.documentType !== 'CUIT' && body.documentType !== 'DNI') {
            throw new BadRequestException('El campo documentType debe ser CUIT o DNI');
        }

        if (!Number.isInteger(body.documentNumber)) {
            throw new BadRequestException('El campo documentNumber debe ser un número entero');
        }
    }

    private normalizarNameSurname(body: any) {
        body.name = this.agregarMayuscula(body.name);
        body.surname = this.agregarMayuscula(body.surname);
    }

    private agregarMayuscula(str: string): string {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }
}