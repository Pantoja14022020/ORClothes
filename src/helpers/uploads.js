/*const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagenCloudinary = async (req, res = response)=> {
    

    //Limpiar imagenes previas
    if(modelo.img){ aqui decimos si existe una url en el campo img de la entidad modelo
        //Hay que borrar la imagen del servidor
        /*const pathImagen = path.join(__dirname, '../uploads',coleccion, modelo.img);

        //Verificar si existe
        if(fs.existsSync(pathImagen)){//Si existe esa ruta o directorio
            fs.unlinkSync(pathImagen);//Lo borramos la imagen
        }*/

        /*const nombreArr = modelo.img.split('/');-----------------
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo;
    
    //const nombre = await subirArchivo(req.files,undefined,coleccion);//El tercer parametro es por la coleccion
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);//Regresa una promesa y obtenemos el url de la imagen

    //modelo.img = nombre;//Nombre del archivo
    modelo.img = secure_url;

    await modelo.save();
    //res.json(nombre);

    res.json(modelo);
};*/