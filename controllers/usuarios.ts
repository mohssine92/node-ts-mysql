import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import { json } from 'sequelize/types';






/* este archivo no es controlador: 
 * consta de funciones asociadsas a rutas entrantes por protcolo http : asi estos funciones son controladores del Recurso user .
*/
export const getUsuarios = async( req: Request , res: Response ) => {

    const usuarios = await Usuario.findAll();

   
    
    res.json({ usuarios });
   
   
   
      
}

export const postUsuario = async( req: Request , res: Response ) => {

    const { body } = req; // debo parsear body json en mdlr de express
    console.log(body)
    
        try {
             
            const existeEmail = await Usuario.findOne({
        
                   where: {
                       email: body.email
                   }
            });
        
               
            if (existeEmail) {
        
                return res.status(400).json({
    
                 msg: 'Ya existe un usuario con el email ' + body.email
    
                });
            } 
            
        
        
            const usuario = Usuario.build(body);
        
            await usuario.save();
        
            
            res.json(usuario);
   
        
        } catch (error) { // no es necesariamente nuestro codigo mal : pude que db se cae etc ..
         
               console.log(error);
        
               res.status(500).json({
        
                   msg: 'Hable con el administrador'
        
               })    
        }
        
  
}


 
 /* al igual que monggose en nuestro queries : podemos usar limites , esquipes ,  
  *
  */


export const  getUsuario  = async( req: Request , res: Response ) => {

    const { id } = req.params;  
 
    const usuario = await Usuario.findByPk( id );  // primary key : id autoIncremental

    if( usuario ) {

        res.json(usuario);

    } else { // queries a DB si no existe regresa un null asi ...

        res.status(404).json({

            msg: `No existe un usuario con el id ${ id }`

        });

    }
    res.json("ok");


}



export const putUsuario = async( req: Request , res: Response ) => {
 
    const { id }   = req.params; 
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk( id );

        if ( !usuario ) {

            return res.status(404).json({

                msg: 'No existe un usuario con el id ' + id

            });
        }

        // podemos extraer data a actualziar , proteger estado paraque no se borre su cuenta  
        await usuario.update( body );

        res.json( usuario );


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    } 

    


}


export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    if ( !usuario ) { // valifdacion 
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    //  eleminacion logica  : get user o users : con status false no se returna lo hacemos en nuestra queries
    // asi mantenemos la integridad refrencial  a nuesta db
    await usuario.update({ estado: false });


    // await usuario.destroy(); eleminacion fesica


    res.json(usuario);




    
}

