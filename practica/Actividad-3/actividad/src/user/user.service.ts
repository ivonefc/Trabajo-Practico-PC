import { Injectable, BadRequestException } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class UserService {
    async enviarPeticion(data: any) {
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify(data);
            const options = {
                hostname: 'reclutamiento-dev-procontacto-default-rtdb.firebaseio.com',
                path: '/reclutier.json',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                },
            };

            const req = https.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(responseData));
                });
            });

            req.on('error', (e) => {
                reject(new BadRequestException('Error al enviar los datos al servicio externo'));
            });

            req.write(postData);
            req.end();
        });
    }
}
