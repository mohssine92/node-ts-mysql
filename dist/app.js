"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// este es archico punto entrada de mi app 
const dotenv_1 = __importDefault(require("dotenv")); // importacion de todo paquete : paquete en este caso todo las prop del archivo
const server_1 = __importDefault(require("./models/server"));
// Configurar dot.env
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map