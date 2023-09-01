const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/nueva_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [categorias,fields] = (await connection.execute('SELECT * FROM categoria WHERE id_usuario = ?',[id_usuario]));
    const [marcas,fields_1] = (await connection.execute('SELECT * FROM marca WHERE id_usuario = ?',[id_usuario]));
    const [subcategorias,fields_3] = (await connection.execute('SELECT * FROM subcategoria WHERE id_usuario = ?',[id_usuario]));
    const [estados,fields_2] = (await connection.execute('SELECT * FROM estado'));
    res.render('forms/nueva_prenda.hbs',{id_usuario, categorias, subcategorias,marcas, estados});
});

router.post('/usuario/:id/nueva_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    console.log(req.body)
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