const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/categoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    res.render('forms/categoria.hbs',{id_usuario});
});

router.post('/usuario/:id/categoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const {categoria} = req.body;

    try {
        const [row,fields] = (await connection.execute('INSERT INTO categoria(nombre,id_usuario) VALUES(?,?)',[categoria,id_usuario]));
        req.flash('success_signup','Categoria registrada');
    } catch (error) {
        console.log(error)
        req.flash('success_signup','No se pudo registrar');
    } finally{
        connection.releaseConnection();
    }

    res.redirect('/armario/usuario/'+id_usuario+'/categoria');
});




//Ver las categorias registrdas
router.get('/usuario/:id/categoria/ver', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [row,fields] = (await connection.execute('SELECT * FROM categoria WHERE id_usuario = ?',[id_usuario]));
    const categorias = row;
    res.render('forms/ver_categorias.hbs',{id_usuario,categorias});
});




//Eliminar categoria especifica
router.get('/usuario/:id/categoria/ver/:id_categoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const id_categoria = req.params.id_categoria;
    const [row,fields] = (await connection.execute('DELETE FROM categoria WHERE id_categoria = ?',[id_categoria]));
    const [row_delete,fields_delete] = (await connection.execute('DELETE FROM prenda WHERE id_subcategoria = ?',[id_categoria]));
    const [row_delete_2,fields_delete_2] = (await connection.execute('DELETE FROM subcategoria WHERE id_categoria = ?',[id_categoria]));
    res.redirect('/armario/usuario/'+id_usuario+'/categoria/ver');
});



module.exports = router;