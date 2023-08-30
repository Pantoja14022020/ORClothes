const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const bcrypt = require('bcrypt');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/',(req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    res.render('auth/signin.hbs');
});



router.post('/',async (req,res) => {
    const {nombre,password} = req.body;
    const passInput = password;
    const [row,fields] = (await connection.execute('SELECT * FROM usuario WHERE nombre_usuario = ?',[nombre]));
    
    if(row.length > 0){//Si existe un usuario con ese correo
        const user = row[0];
        const {password,id_usuario} = row[0];//obtengo la verdadera contraseña
        const coincide = await bcrypt.compare(passInput,password);
        if(coincide){
            res.redirect('/armario/usuario/'+id_usuario);
        }else{
            req.flash('success_signup','Contraseña incorrecta');
            res.redirect('/signin');
        }
    }else{//Sino
        req.flash('success_signup','No existe ese usuario');
        res.redirect('/signin');
    }
});


module.exports = router;