const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()




router.get('/usuario/:id_usuario/solicitudes', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id_usuario;
    const [pedidos,fields] = (await connection.execute('SELECT u.id_usuario,p.id_pedido,p.nombre_cliente, p.correo,pe.id_prenda, pe.nombre, pe.fotografia, pe.codigo_prenda FROM pedidos AS p INNER JOIN usuario AS u ON u.id_usuario = p.id_usuario INNER JOIN prenda AS pe ON p.id_prenda = pe.id_prenda WHERE p.id_usuario = ?',[id_usuario]));
    //console.log(pedidos)
    res.render('profile/solicitudes.hbs',{pedidos});
    /*const [prendas,fields] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ? AND esta_lavanderia = ?',[id_usuario,1]));
    */
});



router.get('/usuario/:id_usuario/solicitudes/rechazado/:id_pedido', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_pedido = req.params.id_pedido;
    const id_usuario = req.params.id_usuario;
    
    //OBTENER EL CORREO DEL CLIENTE
    //const [cliente,fields] = (await connection.execute('SELECT p.correo FROM pedidos AS p WHERE id_pedido = ?',[id_pedido]));
    //const {correo} = cliente[0];

    //ELIMINAR PEDIDO DEBIDO A QUE FUE RECHAZADO
    //const [pedido,fields] = (await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?',[id_pedido]));
    
    req.flash('success_signup',`Se nego solicitud al cliente`);
    res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
});



router.get('/usuario/:id_usuario/solicitudes/aceptado/:id_pedido/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_pedido = req.params.id_pedido;
    const id_usuario = req.params.id_usuario;
    const id_prenda = req.params.id_prenda;

    try{
         //OBTENER EL CORREO Y NOMBRE DEL CLIENTE
        //const [cliente,fields] = (await connection.execute('SELECT p.correo,p.nombre_cliente FROM pedidos AS p WHERE id_pedido = ?',[id_pedido]));
        //const {correo,nombre_cliente} = cliente[0];

        //ACTUALIZAR ESTADO DE LA PRENDA
        //const [prenda,fields] = (await connection.execute('UPDATE prenda SET disponible = ?, necesita_reparacion = ?, esta_lavanderia = ?, esta_alquilada = ?',[id_prenda,0,0,0,1]));

        //ELIMINAR PEDIDO DEBIDO A QUE FUE RECHAZADO
        //const [pedido,fields] = (await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?',[id_pedido]));
        
        //req.flash('success_signup',`Se alquilo al ${nombre_cliente}`);
        req.flash('success_signup',`Se alquilo`);
        res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
    }catch(e){
        req.flash('success_signup',`No se pudo alquilar`);
        res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
    }
});



module.exports = router;