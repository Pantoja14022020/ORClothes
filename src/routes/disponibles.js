const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/disponibles', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_user = req.params.id;
    const [prendas,fields] = (await connection.execute('SELECT p.id_prenda,p.id_usuario, p.nombre, p.codigo_prenda, p.color, p.talla_descripcion AS talla, c.nombre AS categoria, s.nombre AS subcategoria, m.nombre AS marca, e.nombre AS estado FROM prenda AS p INNER JOIN categoria AS c ON p.id_categoria = c.id_categoria INNER JOIN subcategoria AS s ON p.id_subcategoria = s.id_subcategoria INNER JOIN marca AS m ON p.id_marca = m.id_marca INNER JOIN estado AS e ON p.id_estado = e.id_estado WHERE p.id_usuario = ? AND p.disponible = ?',[id_user,1]));
    res.render('profile/disponibles.hbs',{id_user,prendas});
});






//DISPONIBLE - SE VA A REPARACION
router.get('/usuario/:id_usuario/disponibles/reparacion/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[1,0,0,id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } finally{
        connection.releaseConnection();
    }
});



//DISPONIBLE SE VA  LAVANDERIA
router.get('/usuario/:id_usuario/disponibles/lavanderia/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,0,1,id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } finally{
        connection.releaseConnection();
    }
});




//ELIMINAR PRENDA
router.get('/usuario/:id_usuario/disponibles/eliminar/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('DELETE FROM prenda WHERE id_prenda = ?',[id_prenda]));
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } catch (error) {
        res.redirect('/armario/usuario/'+ id_usuario + '/disponibles');
    } finally{
        connection.releaseConnection();
    }
});


module.exports = router;