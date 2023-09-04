const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const { noEstaLogeado } = require('../middlewares/auth');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

router.get('/',noEstaLogeado,(req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    res.render('main/index.hbs');
});

module.exports = router;//Exportando el router