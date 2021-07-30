import express, { Application } from 'express'; // express : es toda el paquete , resumo con desetructuracion de la misma paquete

import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/connection'; // configuracion de mi db Relacional 








class Server {

    // ts es un poco stricto : debe definir las props del objeto en la class , antes de comenzar a usarla en el construcor o iniciarlaen el mismo 
    private app: Application; // en lugar de express.Application 
    private port: string;
    private apiPaths = { // edfir todas rutas que va tener esta app
        usuarios: '/api/usuarios'
        
    }



    constructor() { 

        this.app  = express(); // mi servidor http 

        this.port = process.env.PORT || '8181';

        // connectar a db :base de datos tiene que estar creada : parque pueda crear modelos basados en esta conection  
        this.dbConnection(); 

        this.middlewares();

        /* definir mis rutas */
        this.routes(); 

    }

    async dbConnection() { // async becuase a funcion we use to conect db is promise

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {

            throw new Error( error );

        }

    } 

    middlewares() { // use es el metodo mdlr basicamente de express

        // CORS 
        this.app.use( cors() ); // la ventaja de ts si paso {} : puedo tener ayuda de todo los metosa que se puede usar en cors


        /* Lectura del body - parsea del body json .. que mandamos post put etc .. lo que sea 
         * es obligatoria esta configuracion sino - no recibimos el body json en request 
         */
        this.app.use( express.json() );


        /* Carpeta pública - webServer */
        this.app.use( express.static('public') );

    }

     
    routes() { // enlazar router con mi servidor - usuando mdlr de express
        this.app.use( this.apiPaths.usuarios, userRoutes )
    }
 


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }


}


export default Server;
