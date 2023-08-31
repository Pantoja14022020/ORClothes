const express = require('express');//Importando express para crear nuestras rutas
const bcrypt = require('bcrypt');
const { connection } = require('../databases');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()





cloudinary.config(process.env.CLOUDINARY_URL);//Importamos la variable de entorno CLOUDINARY_URL





// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/src/uploads')); // Carpeta donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantener el nombre original del archivo
    }
});
const upload = multer({ storage: storage });












router.get('/',(req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    res.render('auth/signup.hbs');
});











router.post('/', upload.single('profile') ,async (req,res)=>{
    
    const saltRounds = 10;

    const {nombre,password,pais,telefono,correo} = req.body;
    const phone = pais + telefono;
    const hashedPassword = await bcrypt.hash(password,saltRounds);


    // Construir la ruta completa del archivo donde se va a guardar
    console.log("linea 66");
    console.log()
    const rutaArchivo = path.join(__dirname,"./src/uploads/",req.file.filename);
    console.log("linea 66");
    await Promise.all(rutaArchivo);//Esperar a que se resuelva esta promesa, para que pueda continuar con el siguiente codigo
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);//Regresa una promesa y obtenemos el url de la imagen
    
    //console.log(secure_url.toString());

    // Eliminar el archivo
    fs.unlink(rutaArchivo, (error) => {
        if (error) {
            console.error(error);
            console.log("Error al eliminar el archivo")
            //res.status(500).send('Error al eliminar el archivo');
        } else {
            console.log("Archivo eliminado con exito")
            //res.send('Archivo eliminado con éxito');
        }
    });

    
    try {
        const [row,fields] = (await connection.execute('INSERT INTO usuario(nombre_usuario,password,telefono,correo,img) VALUES(?,?,?,?,?)',[nombre,hashedPassword,phone,correo,secure_url]));
        req.flash('success_signup','Usted ha sido registrado');
    } catch (error) {
        console.log(error)
        req.flash('success_signup','Error al registrar');
    } finally{
        connection.releaseConnection();
    }

    res.redirect('/signin');
})

module.exports = router;//Exportando el router