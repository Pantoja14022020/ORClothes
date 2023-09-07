const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');
const { noEstaLogeado } = require('../middlewares/auth');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

router.get('/',async (req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    const [prendas,fields] = (await connection.execute('SELECT u.nombre_usuario, u.image_url ,p.fotografia,p.id_prenda,p.id_usuario,p.nombre, p.codigo_prenda, p.color, p.talla_descripcion AS talla, c.nombre AS categoria, s.nombre AS subcategoria, m.nombre AS marca, e.nombre AS estado FROM prenda AS p INNER JOIN categoria AS c ON p.id_categoria = c.id_categoria INNER JOIN subcategoria AS s ON p.id_subcategoria = s.id_subcategoria INNER JOIN marca AS m ON p.id_marca = m.id_marca INNER JOIN estado AS e ON p.id_estado = e.id_estado INNER JOIN usuario AS u ON p.id_usuario = u.id_usuario WHERE p.disponible = ?',[1]));

    res.render('plataformaWeb/index.hbs',{prendas});
});


//CUANDO SE CONSULTA UNA DETERMINADA PRENDA
router.get('/:id_prenda/:id_usuario',async (req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    const {id_prenda, id_usuario} = req.params;
    const [prenda,fields] = (await connection.execute('SELECT p.fotografia,p.id_prenda,p.id_usuario, p.nombre, p.codigo_prenda, p.color, p.talla_descripcion AS talla, c.nombre AS categoria, s.nombre AS subcategoria, m.nombre AS marca, e.nombre AS estado FROM prenda AS p INNER JOIN categoria AS c ON p.id_categoria = c.id_categoria INNER JOIN subcategoria AS s ON p.id_subcategoria = s.id_subcategoria INNER JOIN marca AS m ON p.id_marca = m.id_marca INNER JOIN estado AS e ON p.id_estado = e.id_estado WHERE p.id_prenda = ?',[id_prenda]));
    //console.log(prenda)
    const {fotografia,nombre,color,marca,categoria,subcategoria,estado,talla} = prenda[0];

    res.render('plataformaWeb/prenda_detalles.hbs',{fotografia,nombre,color,marca,categoria,subcategoria,estado,talla,id_prenda,id_usuario});
});



//CUANDO EL CLIENTE MANDA SU CORREO Y NOMBRE PARA SOLICITAR
router.post('/:id_prenda/:id_usuario/solicitar',async (req,res)=>{//Creando una ruta llamada / que renderiza el signin para entrar a la aplicacion
    const {id_prenda, id_usuario} = req.params;
    const {email_apartar,nombre_cliente} = req.body;
    const [user,fields] = (await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?',[id_usuario]));
    const [prenda,fieldss] = (await connection.execute('SELECT fotografia FROM prenda WHERE id_prenda = ?',[id_prenda]));
    const {nombre_usuario} = user[0];
    const {fotografia} = prenda[0];
    //const [user,fields] = (await connection.execute('SELECT p.fotografia,p.id_prenda,p.id_usuario, p.nombre, p.codigo_prenda, p.color, p.talla_descripcion AS talla, c.nombre AS categoria, s.nombre AS subcategoria, m.nombre AS marca, e.nombre AS estado FROM prenda AS p INNER JOIN categoria AS c ON p.id_categoria = c.id_categoria INNER JOIN subcategoria AS s ON p.id_subcategoria = s.id_subcategoria INNER JOIN marca AS m ON p.id_marca = m.id_marca INNER JOIN estado AS e ON p.id_estado = e.id_estado WHERE p.id_prenda = ?',[id_prenda]));
    try {
        const [pedido,fields] = (await connection.execute('INSERT INTO pedidos(nombre_cliente,correo,id_usuario,id_prenda,img) VALUES(?,?,?,?,?)',[nombre_cliente,email_apartar,id_usuario,id_prenda,fotografia]));
        req.flash('success_signup',`Solicitud enviada. Espera nuestro correo de ${nombre_usuario}`);
    } catch (error) {
        req.flash('success_signup',`No se pudo procesar solicitud`);
    }
    //const {fotografia,nombre,color,marca,categoria,subcategoria,estado,talla} = prenda[0];
    res.redirect(`/orclothes/${id_prenda}/${id_usuario}`);
    //res.render('plataformaWeb/prenda_detalles.hbs',{fotografia,nombre,color,marca,categoria,subcategoria,estado,talla,id_prenda,id_usuario});
});

module.exports = router;//Exportando el router