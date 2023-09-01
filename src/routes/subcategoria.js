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











//Ver las subacategorias registrdas
router.get('/usuario/:id/subcategoria/ver', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [row,fields] = (await connection.execute('SELECT * FROM subcategoria WHERE id_usuario = ?',[id_usuario]));
    const subcategorias = row;
    res.render('forms/ver_subcategorias.hbs',{id_usuario,subcategorias});
});


//Eliminar subcategoria especifica
router.get('/usuario/:id/subcategoria/ver/:id_subcategoria', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const id_subcategoria = req.params.id_subcategoria;
    const [row,fields] = (await connection.execute('DELETE FROM subcategoria WHERE id_subcategoria = ?',[id_subcategoria]));
    const [row_delete,fields_delete] = (await connection.execute('DELETE FROM prenda WHERE id_subcategoria = ?',[id_subcategoria]));
    res.redirect('/armario/usuario/'+id_usuario+'/subcategoria/ver');
});


module.exports = router;