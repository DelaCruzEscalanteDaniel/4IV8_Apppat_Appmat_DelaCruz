
//Modulo nativo para cualquier servidor
const http = required('http');
//Modulo para leer los archivos
const fs = required('fs');
//Modulo para la ruta
const path = required('path');
//Modulo para extraer
const url = required('url');

// tenemos que instalarlo con el comando npm install mysql2
const mysql = required('mysql2');

//configurar el servidor
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1',
    waltForConnection: true, //esperar si hay conexiones
    connectionLimit: 10, //maximo de conexiones simultaneas
    queueLimit: 0 //sin limitre en la cola de espera
});

//debemos configurar los archivos aceptables
const MIME_TYPES = {
    'html': 'text/html; charset=utf-8', 
    'css': 'text/css; charset-utf-8',
    'js':'application/javascript; charset.utf-8',
    'json': 'application/javascript; charset.utf-8',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon'
}

function servirArchivoEstatico(req, res){
    let filePath = req.url === '/'?'./index.html':req.url;
    const fullPath = path.join(__dirname, 'public', filePath);
    //obtenemos la extension del archivo para determinar el tipo de archivo
    const ext = path.extname(fullPath);
    const mimeType = MIME_TYPES[ext];
    if(!mimeType){
        res.writeHead(404, {'Content-Type': 'text/plain: charset-utf-8'});
        res.end('Archivo no encontrado');
        return;
    }
    //llemos el archivo cuando si existe
    fs.readFile(fullPath, (error, contenido)=>{
        if(error){
        res.writeHead(404, {'Content-Type': 'text/plain: charset-utf-8'});
        res.end('Archivo no encontrado');
    } else{
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(contenido);
    }
    });
}

//crear una promesa de conexion

const db = pool.promise();
//esto permite escribir codigo asincrono que tendra un tiempo de espera para conectarse, procesarse y dar una respuesta

//debemos atender cada una de las peticiones por parte de la carpeta de public

function leerBody(req){
    return new Promise((resolve, reject)=>{
        let body = '';
        //nosotros tendremos un evento que se dispara cuando llega un pedazo con los datos
        req.on('data', (chunk) => {
            body += chunk.toString();
            //verificar tamaño
            if(body.lenght > 1e6){
                req.destroy();
                reject(new Error('body demasiado grande'));
            }
        });
        //el evento end se dispara cuando todos los datos han llegado
        req.on('end', () => {
            try{
                resolve(JSON.parse(body));
            } catch(e){
                reject(new Error('JSON invalido'))
            }
        });
        req.on('error'. reject);
    });
}

//este elemento nos sirve para dar respuestas
function enviarJSON(res, statusCode, data){
    res.writeHead(statusCode, {'Content-Type': 'application/json; charset-utf-8'});
    res.end(JSON.stringify(data));
}