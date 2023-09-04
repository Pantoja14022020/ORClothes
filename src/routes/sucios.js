const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/sucios', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [prendas,fields] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ? AND disponible = ?',[id_usuario,0]));
    res.render('profile/sucios.hbs',{id_usuario,prendas});
});




//ESTA SUCIO - AHORA ESTA EN REPARACION
router.get('/usuario/:id_usuario/sucios/reparacion/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[1,0,0,id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/sucios');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/sucios');
    } finally{
        connection.releaseConnection();
    }
});

//ESTA SUCIO - SE VA A LAVANDERIA
router.get('/usuario/:id_usuario/sucios/lavanderia/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,0,1,id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/sucios');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/sucios');
    } finally{
        connection.releaseConnection();
    }
});



/*ESTA SUCIO - SE VUELVE DISPONIBLE
router.get('/usuario/:id_usuario/reparacion/disponible/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,1,0,id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } finally{
        connection.releaseConnection();
    }
});*/


module.exports = router;