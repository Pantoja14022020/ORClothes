const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


//TWILIO
const twilio = require('twilio');
// Configura tus credenciales de Twilio
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);



router.get('/usuario/:id/lavanderia', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [prendas,fields] = (await connection.execute('SELECT * FROM prenda WHERE id_usuario = ? AND esta_lavanderia = ?',[id_usuario,1]));
    res.render('profile/lavanderia.hbs',{id_usuario,prendas});
});






//LAVANDERIA - SE VA A REPARACION
router.get('/usuario/:id_usuario/lavanderia/reparacion/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[1,0,0,id_prenda]));
        
        

        const [row_1,fields_1] = (await connection.execute('SELECT nombre,codigo_prenda FROM prenda WHERE id_prenda = ?',[id_prenda]))
        const {nombre,codigo_prenda} = row_1[0];

        const [row_2,fields_2] = (await connection.execute('SELECT telefono FROM usuario WHERE id_usuario = ?',[id_usuario]));
        const {telefono} = row_2[0];

        client.messages
        .create({
            body: `La prenda ${nombre} con el codigo ${codigo_prenda} requiere reparación`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${telefono}`
        })
        .then(message => console.log(message.sid))


        
        req.flash('success_signup','Se movio a reparación');
        res.redirect('/armario/usuario/'+ id_usuario + '/lavanderia');
    } catch (error) {
        req.flash('success_signup','No se pudo mover');
        res.redirect('/armario/usuario/'+ id_usuario + '/lavanderia');
    } finally{
        connection.releaseConnection();
    }
});



//ESTA EN LAVANDERIA - SE VUELVE DISPONIBLE
router.get('/usuario/:id_usuario/lavanderia/disponible/:id_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    let id_usuario = req.params.id_usuario;
    let id_prenda = req.params.id_prenda;
    
    try {
        const [row,fields] = (await connection.execute('UPDATE prenda SET necesita_reparacion = ?, disponible = ?, esta_lavanderia = ?  WHERE id_prenda = ?',[0,1,0,id_prenda]));
        
        
        const [row_1,fields_1] = (await connection.execute('SELECT nombre,codigo_prenda FROM prenda WHERE id_prenda = ?',[id_prenda]))
        const {nombre,codigo_prenda} = row_1[0];

        const [row_2,fields_2] = (await connection.execute('SELECT telefono FROM usuario WHERE id_usuario = ?',[id_usuario]));
        const {telefono} = row_2[0];

        client.messages
        .create({
            body: `La prenda ${nombre} con el codigo ${codigo_prenda} esta disponible`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${telefono}`
        })
        .then(message => console.log(message.sid))
        
        
        
        req.flash('success_signup','Se volvio disponible');
        res.redirect('/armario/usuario/'+ id_usuario + '/lavanderia');
    } catch (error) {
        req.flash('success_signup','No se pudo mover');
        res.redirect('/armario/usuario/'+ id_usuario + '/lavanderia');
    } finally{
        connection.releaseConnection();
    }
});


module.exports = router;