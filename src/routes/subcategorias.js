const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/:id', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_categoria = req.params.id;
    const [subcategorias,fields] = (await connection.execute('SELECT * FROM subcategoria WHERE id_categoria = ?',[id_categoria]));
    res.json({subcategorias: subcategorias})
});


module.exports = router;