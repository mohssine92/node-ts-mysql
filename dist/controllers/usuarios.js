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
exports.deleteUsuario = exports.putUsuario = exports.getUsuario = exports.postUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
/* este archivo no es controlador:
 * consta de funciones asociadsas a rutas entrantes por protcolo http : asi estos funciones son controladores del Recurso user .
*/
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req; // debo parsear body json en mdlr de express
    console.log(body);
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) { // no es necesariamente nuestro codigo mal : pude que db se cae etc ..
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
/* al igual que monggose en nuestro queries : podemos usar limites , esquipes ,
 *
 */
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id); // primary key : id autoIncremental
    if (usuario) {
        res.json(usuario);
    }
    else { // queries a DB si no existe regresa un null asi ...
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
    res.json("ok");
});
exports.getUsuario = getUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        // podemos extraer data a actualziar , proteger estado paraque no se borre su cuenta  
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) { // valifdacion 
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    //  eleminacion logica  : get user o users : con status false no se returna lo hacemos en nuestra queries
    // asi mantenemos la integridad refrencial  a nuesta db
    yield usuario.update({ estado: false });
    // await usuario.destroy(); eleminacion fesica
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map