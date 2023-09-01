const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/marca', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    res.render('forms/marca.hbs',{id_usuario});
});

router.post('/usuario/:id/marca', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
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

    res.redirect('/armario/usuario/'+id_usuario+'/marca');
});

//Ver las marcas registrdas
router.get('/usuario/:id/marca/ver', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [row,fields] = (await connection.execute('SELECT * FROM marca WHERE id_usuario = ?',[id_usuario]));
    const marcas = row;
    res.render('forms/ver_marcas.hbs',{id_usuario,marcas});
});


//Eliminar marca especifica
router.get('/usuario/:id/marca/ver/:id_marca', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    console.log("aqui merooo")
    const id_usuario = req.params.id;
    const id_marca = req.params.id_marca;
    const [row,fields] = (await connection.execute('DELETE FROM marca WHERE id_marca = ?',[id_marca]));
    const [row_delete,fields_delete] = (await connection.execute('DELETE FROM prenda WHERE id_marca = ?',[id_marca]));
    res.redirect('/armario/usuario/'+id_usuario+'/marca/ver');
});

module.exports = router;