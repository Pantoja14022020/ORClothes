const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

router.get('/usuario/:id', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [row,fields] = (await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?',[id_usuario]));
    const {nombre_usuario, img, correo} = row[0];

    //Obtener resumen del perfil de prendas
    const [prendas] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ?',[id_usuario]));
    
    const totalPrendas = prendas.length;
    const disponibles = prendas.filter( prenda => prenda.disponible == 1);
    const necesitaReparacion = prendas.filter( prenda => prenda.necesita_reparacion == 1);
    const sucios = prendas.filter( prenda => prenda.disponible == 0);
    const lavanderia = prendas.filter( prenda => prenda.esta_lavanderia == 1); 

    const _disponibles = disponibles.length;
    const _necesitaReparacion = necesitaReparacion.length;
    const _sucios = sucios.length;
    const _lavanderia = lavanderia.length;

    res.render('profile/armario.hbs',{id_usuario, nombre_usuario, img, correo, totalPrendas, _disponibles, _necesitaReparacion,  _sucios, _lavanderia});
});

//7712271087 beti

module.exports = router;