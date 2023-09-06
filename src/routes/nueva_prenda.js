const express = require('express');//Importando express para crear nuestras rutas
const { connection } = require('../databases');


const multer = require('multer');//AGREGUE


const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);//Importamos la variable de entorno CLOUDINARY_URL


const fs = require('fs');
const path = require('path');


const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/usuario/:id/nueva_prenda', async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    const id_usuario = req.params.id;
    const [categorias,fields] = (await connection.execute('SELECT * FROM categoria WHERE id_usuario = ?',[id_usuario]));
    const [marcas,fields_1] = (await connection.execute('SELECT * FROM marca WHERE id_usuario = ?',[id_usuario]));
    const [subcategorias,fields_3] = (await connection.execute('SELECT * FROM subcategoria WHERE id_usuario = ?',[id_usuario]));
    const [estados,fields_2] = (await connection.execute('SELECT * FROM estado'));
    
    let mostrarForm = (marcas.length > 0 && subcategorias.length > 0 && categorias.length > 0) ? true : false;
    
    res.render('forms/nueva_prenda.hbs',{id_usuario, categorias, subcategorias,marcas, estados, mostrarForm});
});






//AGREGUE
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage
    //limits: {fileSize: 1000000}
});
//AGREGUE






router.post('/usuario/:id/nueva_prenda', uploadImage.single('prenda_img'), async (req,res)=>{//Creando una ruta llamada / que renderiza el signup para el registro
    
    
    let {
        codigo,//
        nombre, //-
        id_categoria,
        id_subcategoria,
        id_marca,
        color, //
        talla_descripcion,//
        id_estado,
        disponible,
        req_reparacion,
        descripcion_reparacion,//
        lavanderia
    } = req.body;
    let id_usuario = req.params.id;
    
    
    let _disponible = disponible ? 1 : 0;//
    let _necesita_reparacion = req_reparacion ? 1 : 0;//
    let _esta_lavanderia = lavanderia ? 1 : 0;//

    id_categoria = parseInt(id_categoria); //-
    id_subcategoria = parseInt(id_subcategoria); //-
    id_marca = parseInt(id_marca); //-
    id_estado = parseInt(id_estado);//
    id_usuario = parseInt(id_usuario);//
    
    try {


        //Obtener la ruta de destino donde esta la imagen
        const {path} = req.file;
        const {secure_url} = await cloudinary.uploader.upload(path);
        
        const [row,fields] = (await connection.execute('INSERT INTO prenda(nombre,id_categoria,id_subcategoria,id_marca,color,id_estado,fotografia,disponible,necesita_reparacion,tipo_reparacion,id_usuario,esta_lavanderia,talla_descripcion,codigo_prenda) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[nombre,id_categoria,id_subcategoria,id_marca,color,id_estado,secure_url,_disponible,_necesita_reparacion,descripcion_reparacion,id_usuario,_esta_lavanderia,talla_descripcion,codigo]));
        
        //Verificar si existe la ruta donde esta el archivo y poder eliminar
        if(fs.existsSync(path)){//Si existe esa ruta o directorio
            fs.unlinkSync(path);//Lo borramos la imagen
            //console.log("se booro la imagen")
        }
        
        //res.json({registrado: true});
        req.flash('success_signup','Creado con exito');
        res.redirect(`/armario/usuario/${id_usuario}/nueva_prenda`);
    } catch (error) {
        //res.json({registrado: false});
        req.flash('success_signup','No se pudo crear');
        res.redirect(`/armario/usuario/${id_usuario}/nueva_prenda`);
    } finally{
        connection.releaseConnection();
    }
});


module.exports = router;