const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

router.get('/usuario/:id',(req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    res.render('profile/armario.hbs');
});

module.exports = router;