const express = require('express');//Importando express para crear nuestras rutas
const bcrypt = require('bcrypt');
const { connection } = require('../databases');
//const multer = require('multer');
//const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()





//cloudinary.config(process.env.CLOUDINARY_URL);//Importamos la variable de entorno CLOUDINARY_URL








router.get('/',(req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    res.render('auth/signup.hbs');
});









router.post('/' ,async (req,res)=>{
    
    const saltRounds = 10;

    const {nombre,password,pais,telefono,correo} = req.body;
    const phone = pais + telefono;
    const hashedPassword = await bcrypt.hash(password,saltRounds);

    
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