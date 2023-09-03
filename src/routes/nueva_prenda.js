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
    let {
        nombre,
        id_categoria,
        id_subcategoria,
        id_marca,
        color,
        id_estado,
        fotografia,
        disponible,
        necesita_reparacion,
        tipo_reparacion,
        esta_lavanderia,
        talla_descripcion,
        codigo_prenda
    } = req.body;
    let id_usuario = req.params.id;

    id_categoria = parseInt(id_categoria);
    id_subcategoria = parseInt(id_subcategoria);
    id_marca = parseInt(id_marca);
    id_estado = parseInt(id_estado);
    id_usuario = parseInt(id_usuario);
    
    try {
        const [row,fields] = (await connection.execute('INSERT INTO prenda(nombre,id_categoria,id_subcategoria,id_marca,color,id_estado,fotografia,disponible,necesita_reparacion,tipo_reparacion,id_usuario,esta_lavanderia,talla_descripcion,codigo_prenda) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre,id_categoria,id_subcategoria,id_marca,color,id_estado,fotografia,disponible,necesita_reparacion,tipo_reparacion,id_usuario,esta_lavanderia,talla_descripcion,codigo_prenda]));
        res.json({registrado: true});
    } catch (error) {
        res.json({registrado: false});
    } finally{
        connection.releaseConnection();
    }
});


module.exports = router;