const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/',(req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro 
    
    req.session.destroy(err => {
        if (err) {
          console.error(err);
        }
        res.redirect('/signin');
    });
    
});


module.exports = router;