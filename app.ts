// este es archico punto entrada de mi app 
import dotenv from 'dotenv'; // importacion de todo paquete : paquete en este caso todo las prop del archivo
import Server from './models/server';

// Configurar dot.env
dotenv.config();

const server = new Server();


server.listen();

