const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/talla', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    //res.render('forms/marca.hbs',{id_usuario});
});

router.post('/usuario/:id/talla', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    /*const id_usuario = req.params.id;
    const {marca} = req.body;

    try {
        const [row,fields] = (await connection.execute('INSERT INTO marca(nombre,id_usuario) VALUES(?,?)',[marca,id_usuario]));
        req.flash('success_signup','Marca registrada');
    } catch (error) {
        console.log(error)
        req.flash('success_signup','No se pudo registrar');
    } finally{
        connection.releaseConnection();
    }

    res.redirect('/armario/usuario/'+id_usuario+'/marca');*/
});


module.exports = router;