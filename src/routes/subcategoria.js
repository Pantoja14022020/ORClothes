const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/subcategoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [row,fields] = (await connection.execute('SELECT * FROM categoria WHERE id_usuario = ?',[id_usuario]));
    const categorias = row;
    res.render('forms/subcategoria.hbs',{id_usuario,categorias});
});

router.post('/usuario/:id/subcategoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const {categoria_selected,subcategoria} = req.body;

    try {
        const [row,fields] = (await connection.execute('INSERT INTO subcategoria(nombre,id_categoria,id_usuario) VALUES(?,?,?)',[subcategoria,categoria_selected,id_usuario]));
        req.flash('success_signup','Categoria registrada');
    } catch (error) {
        console.log(error)
        req.flash('success_signup','No se pudo registrar');
    } finally{
        connection.releaseConnection();
    }

    res.redirect('/armario/usuario/'+id_usuario+'/subcategoria');
});


module.exports = router;