import { Router } from 'express';

import { getUsuario, getUsuarios  , postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';

const router = Router();




// end-points
router.get('/',       getUsuarios );
router.get('/:id',    getUsuario );
router.post('/',      postUsuario )
router.put('/:id',    putUsuario );
router.delete('/:id', deleteUsuario );



export default router; // es decir cuando importo este archivo  este objeto el que se exporta por defecto 