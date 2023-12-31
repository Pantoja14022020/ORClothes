require('dotenv').config();//Importar e inicializar el uso de variables de entorno
const express = require('express');//Importar express para el desarrollo del backend
const {engine} = require('express-handlebars');//Se inicializa el modulo handlebars para las plantillas html
const path  = require('path');//Se inicializa un modulo para especificar la carpeta principal o raiz
const flash =  require('connect-flash');//Se importa el modulo connect-flash
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');//AGEREGUE
const {connection} = require('./databases');//Importar la conexion a la db


const app = express();//Iniciar express

//Configuraciones para el servidor express
app.set('port',process.env.PORT || 4000);//En que puerto va a funcionar el servidor express, si existe uno en el sistema operativo, entonces tomalo, caso contrario se toma el 4000
app.set('views',path.join(__dirname,'views'));//Especificando donde esta la carpeta views, es decir las vistas o interfaces
app.engine('.hbs',engine({//Configurando el motor de plantillas 
    defaultLayout: 'index.hbs',//Nombre de la plantilla principal
    layoutsDir: path.join(app.get('views'),'layouts'),//Especificamos en que carpeta se encuentra index.hbs
    partialsDir: path.join(app.get('views'),'partials'),//Espeficamos la ubicacion de la carpeta partials
    extname: '.hbs',//Especificando la extension de los archivos
}));
app.set('view engine','.hbs');//Utilizando el motor de plantillas
app.use(express.json());//Es para envuar json por parte de los clientes
app.use(cors());
app.use(session({
    secret: 'keyAteez', // Cambia esto por una cadena secreta más segura
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.urlencoded({extended: true}));//Es para acpetar los datos sencillos y no imagenes que me envien los usuarios desde formularios


/*Variable Globales flash*/
app.use((req,res,next)=>{//Dejamos listo un middleware que toma un request,un response y next, al ejecutarlo voy a seguir en esta funcion
    //Esta funcion, toma la informacion del usuario, toma lo que el servidor va a responder y tambien toma una funcion para continuar con el resto del codigo
    app.locals.success_signup = req.flash('success_signup');
    next();
})




//Routes. Se define las rutas o urls del servidor
app.use(require('./routes'));//Le decimos que necesitamos el index.js dentro de la carpeta routes. Basicamente estamos importando ese archivo
app.use('/logout',require('./routes/logout'));
app.use('/signin',require('./routes/signin'));
app.use('/signup',require('./routes/signup'));
app.use('/armario',require('./routes/armario'));
app.use('/armario',require('./routes/marca'));
//app.use('/armario',require('./routes/talla'));
app.use('/armario',require('./routes/categoria'));
app.use('/armario',require('./routes/subcategoria'));
app.use('/armario',require('./routes/nueva_prenda'));
app.use('/obtenerSubcategorias',require('./routes/subcategorias'));
app.use('/armario',require('./routes/reparacion'));
app.use('/armario',require('./routes/sucios'));
app.use('/armario',require('./routes/lavanderia'));
app.use('/armario',require('./routes/disponibles'));
app.use('/armario',require('./routes/alquiladas'));
app.use('/armario',require('./routes/solicitudes'));



//RUTAS PARA LA PLATAFORMA WEB
app.use('/orclothes',require('./routes/orclothes'));



//Public. Una carpeta donde se va colocar todo el codigo que el navegdor puede acceder, mis css, html etc.
app.use(express.static(path.join(__dirname,'public')));//Especificando la ubicacion de la carpeta public






app.listen(app.get('port'),()=>{//Decirle al servidor en que puerto va a escuchar
    console.log(`Escuchando en el puerto ${app.get('port')}`)
});