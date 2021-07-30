import { DataTypes } from 'sequelize';

import db from '../db/connection';


 /* tabla usuasrios : modelo me permite a mi controlar campos en la tabla
  * asi lo medoles estan relacionados a la promesa connectcion a db  
  * es decir siempre necesito referencia db: conexion  paea definir modelo 
 */
const Usuario = db.define('Usuario', {

    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN // tynint : squelize : se Encarga de transformarlo pormi 
    },
    // ojo squelize : me va agregar created at y updated at .en las consultas . son campos que aveces no tenemos en tabla 

});


export default Usuario;
// este modelo esta conectado db , modelo se encarga de hacer queries de db de manera segura  