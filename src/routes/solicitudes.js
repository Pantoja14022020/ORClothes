const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


const nodemailer = require('nodemailer');
const tls = require('tls');

// Configuraciones
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Cambia al servidor de correo correspondiente
    port: process.env.PORT_GMAIL, // Cambia al puerto correspondiente
    secure: true,
    tls: {
        // Añade esta configuración para aceptar certificados autofirmados
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.USER_GMAIL, //dirección de correo
      pass: process.env.PASSWORD_GMAIL // contraseña
    }
});


router.get('/usuario/:id_usuario/solicitudes', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_us = req.params.id_usuario;
    
    const [pedidos,fields] = (await connection.execute('SELECT u.id_usuario,p.id_pedido,p.nombre_cliente, p.correo,pe.id_prenda, pe.nombre, pe.fotografia, pe.codigo_prenda FROM pedidos AS p INNER JOIN usuario AS u ON u.id_usuario = p.id_usuario INNER JOIN prenda AS pe ON p.id_prenda = pe.id_prenda WHERE p.id_usuario = ?',[id_us]));
    //console.log(pedidos)
    res.render('profile/solicitudes.hbs',{pedidos,id_us});
    /*const [prendas,fields] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ? AND esta_lavanderia = ?',[id_usuario,1]));
    */
});



router.get('/usuario/:id_usuario/solicitudes/rechazado/:id_pedido', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_pedido = req.params.id_pedido;
    const id_usuario = req.params.id_usuario;

    //OBTENER EL CORREO DEL CLIENTE
    const [cliente,fields] = (await connection.execute('SELECT p.correo, u.nombre_usuario FROM pedidos AS p INNER JOIN usuario AS u ON p.id_usuario = u.id_usuario WHERE id_pedido = ?',[id_pedido]));
    const {correo,nombre_usuario} = cliente[0];


    //ENVIAR CORREO
    const mailOptions = {
        from: 'tl419411@uaeh.edu.mx', // dirección de correo
        to: correo, // destinatario
        subject: 'Servicio de alquiler ORClothes',
        text: `Su solicitud para alquilar su producto con ${nombre_usuario} ha sido rechazado.`
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado con éxito:', info.response);
        }
    });


    //ELIMINAR PEDIDO DEBIDO A QUE FUE RECHAZADO
    const [pedido,fieldss] = (await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?',[id_pedido]));
    
    req.flash('success_signup',`Se nego solicitud al cliente`);
    res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
});



router.get('/usuario/:id_usuario/solicitudes/aceptado/:id_pedido/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_pedido = req.params.id_pedido;
    const id_usuario = req.params.id_usuario;
    const id_prenda = req.params.id_prenda;

    //OBTENER EL NOMBRE DEL ESTABLECIMEITNO
    const [cliente,fields] = (await connection.execute('SELECT p.correo, u.nombre_usuario FROM pedidos AS p INNER JOIN usuario AS u ON p.id_usuario = u.id_usuario WHERE id_pedido = ?',[id_pedido]));
    const {nombre_usuario} = cliente[0];


    try{
        //OBTENER EL CORREO Y NOMBRE DEL CLIENTE
        const [cliente,fields] = (await connection.execute('SELECT p.correo,p.nombre_cliente FROM pedidos AS p WHERE id_pedido = ?',[id_pedido]));
        const {correo,nombre_cliente} = cliente[0];



        //ENVIAR CORREO
        const mailOptions = {
            from: 'tl419411@uaeh.edu.mx', // dirección de correo
            to: correo, // destinatario
            subject: 'Servicio de alquiler ORClothes',
            text: `Su solicitud para alquilar su producto con ${nombre_usuario} ha sido aceptada.`
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
            console.error('Error al enviar el correo:', error);
            } else {
            console.log('Correo enviado con éxito:', info.response);
            }
        });


        //ACTUALIZAR ESTADO DE LA PRENDA
        const [prenda,fieldss] = (await connection.execute('UPDATE prenda SET disponible = ?, necesita_reparacion = ?, esta_lavanderia = ?, esta_alquilada = ? WHERE id_prenda = ?',[0,0,0,1,id_prenda]));

        //ELIMINAR PEDIDO
        const [pedido,fieldsss] = (await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?',[id_pedido]));
        
        req.flash('success_signup',`Se alquilo al ${nombre_cliente}`);
        //req.flash('success_signup',`Se alquilo`);
        res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
    }catch(e){
        console.log(e)
        req.flash('success_signup',`No se pudo alquilar`);
        res.redirect(`/armario/usuario/${id_usuario}/solicitudes`);
    }
});



module.exports = router;