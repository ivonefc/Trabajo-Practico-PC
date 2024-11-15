const https = require('https');
const url = 'https://reclutamiento-dev-procontacto-default-rtdb.firebaseio.com/reclutier.json';

function obtenerGet() {
    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log("Respuesta:");
            console.log(JSON.parse(data));
        });
    })
}

obtenerGet();