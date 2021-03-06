"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // express : es toda el paquete , resumo con desetructuracion de la misma paquete
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection")); // configuracion de mi db Relacional 
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = express_1.default(); // mi servidor http 
        this.port = process.env.PORT || '8181';
        // connectar a db :base de datos tiene que estar creada : parque pueda crear modelos basados en esta conection  
        this.dbConnection();
        this.middlewares();
        /* definir mis rutas */
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS 
        this.app.use(cors_1.default()); // la ventaja de ts si paso {} : puedo tener ayuda de todo los metosa que se puede usar en cors
        /* Lectura del body - parsea del body json .. que mandamos post put etc .. lo que sea
         * es obligatoria esta configuracion sino - no recibimos el body json en request
         */
        this.app.use(express_1.default.json());
        /* Carpeta p??blica - webServer */
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map