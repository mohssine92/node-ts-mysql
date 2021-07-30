"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/* tabla usuasrios : modelo me permite a mi controlar campos en la tabla
 * asi lo medoles estan relacionados a la promesa connectcion a db
 * es decir siempre necesito referencia db: conexion  paea definir modelo
*/
const Usuario = connection_1.default.define('Usuario', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN // tynint : squelize : se Encarga de transformarlo pormi 
    },
    // ojo squelize : me va agregar created at y updated at .en las consultas . son campos que aveces no tenemos en tabla 
});
exports.default = Usuario;
// este modelo esta conectado db , modelo se encarga de hacer queries de db de manera segura  
//# sourceMappingURL=usuario.js.map