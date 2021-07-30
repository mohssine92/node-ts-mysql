"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = express_1.Router();
/* end-points
 * recuerada antes de ejecutar controlres hacer todos mdlrs respectivos :
 * JWT venga , put tiene que venir nombre correo etc ... , ver el ejemplo demongoos , usar helpers para validacion contre db
 * funcion helper si en  algun llamada debe comunicar varios demonios atraves http antes de salvar y responder con exito
 * al cliente
*/
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', usuarios_1.postUsuario);
router.put('/:id', usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router; // es decir cuando importo este archivo  este objeto el que se exporta por defecto 
//# sourceMappingURL=usuario.js.map