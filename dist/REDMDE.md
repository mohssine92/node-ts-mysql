* lo que estoy haciendo yo compilo la app de ts y la coloco en dist carpeta, el dist carpeta es el que realmente desplegaria en mi servidor , puedo desplegar todo , pero el comando para inicial mi servidor es el que se encuentra en app.js

comdano : tsc => compila la codigo de ts a js  

- para desarollar con ts : 
  *aprimos dos consolas : 1 - nodemon dist/.app.js : estar a la escucha de los cambios de js 
                          2- tsc --watch : asi ts esta en modo de observador : cualquier cambio lo compila en dis/ a archivos  js que se encuentra levantado levantado por nodemon , en produccion se levanta Node porque el codigo no se va acambiar en produccion 