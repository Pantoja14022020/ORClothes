const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/reparacion', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [prendas,fields] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ? AND necesita_reparacion = ?',[id_usuario,1]));
    res.render('profile/reparacion.hbs',{id_usuario,prendas});
});




//REPARACION - ESTA SUCIO
router.get('/usuario/:id_usuario/reparacion/sucio/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,0,0,id_prenda]));
        req.flash('success_signup','Se movio a sucio');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } catch (error) {
        req.flash('success_signup','No se pudo mover');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } finally{
        connection.releaseConnection();
    }
});

//REPARACION - SE VA A LAVANDERIA
router.get('/usuario/:id_usuario/reparacion/lavanderia/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,0,1,id_prenda]));
        req.flash('success_signup','Se movio a lavanderia');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } catch (error) {
        req.flash('success_signup','No se pudo mover');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } finally{
        connection.releaseConnection();
    }
});



//REPARACION - SE VUELVE DISPONIBLE
router.get('/usuario/:id_usuario/reparacion/disponible/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,1,0,id_prenda]));
        req.flash('success_signup','Se volvio disponible');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } catch (error) {
        req.flash('success_signup','No se pudo mover');
        res.redirect('/armario/usuario/'+ id_usuario + '/reparacion');
    } finally{
        connection.releaseConnection();
    }
});


module.exports = router;