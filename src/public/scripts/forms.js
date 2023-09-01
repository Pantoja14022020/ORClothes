

/*INICIO. JS PARA FORMULARIO MARCA */
const marcaInterfaz = document.getElementById('marca-interfaz');
if(marcaInterfaz){
    setTimeout(()=>{
        marcaInterfaz.classList.add('show-marca-interfaz');
    },500);
}

const msgMarcaCorrecto = document.getElementById('msg-marca-correcto');
if(msgMarcaCorrecto){
    setTimeout(()=>{
        msgMarcaCorrecto.remove();
    },3000)
}

const btnMarcaGuardar = document.getElementById('btn-guardar-marca');
if(btnMarcaGuardar){
    btnMarcaGuardar.addEventListener('click', e => {
        const marcaInput = document.getElementById('marca-input').value;
        const msgMarcaError = document.getElementById('msg-marca-error');
        if(marcaInput == ''){
            e.preventDefault();
            msgMarcaError.classList.remove('hide-marca-msg');
            setTimeout(()=>{
                msgMarcaError.classList.add('hide-marca-msg');
            },1500);
        }
    });
}
/*FIN. JS PARA FORMULARIO MARCA */


















/*INICIO. JS PARA FORMULARIO CATEGORIA */
const categoriaInterfaz = document.getElementById('categoria-interfaz');
if(categoriaInterfaz){
    setTimeout(()=>{
        categoriaInterfaz.classList.add('show-categoria-interfaz');
    },500);
}

const msgCategoriaCorrecto = document.getElementById('msg-categoria-correcto');
if(msgCategoriaCorrecto){
    setTimeout(()=>{
        msgCategoriaCorrecto.remove();
    },3000)
}

const btnCategoriaGuardar = document.getElementById('btn-guardar-categoria');
if(btnCategoriaGuardar){
    btnCategoriaGuardar.addEventListener('click', e => {
        const categoriaInput = document.getElementById('categoria-input').value;
        const msgCategoriaError = document.getElementById('msg-categoria-error');
        if(categoriaInput == ''){
            e.preventDefault();
            msgCategoriaError.classList.remove('hide-categoria-msg');
            setTimeout(()=>{
                msgCategoriaError.classList.add('hide-categoria-msg');
            },1500);
        }
    });
}
/*FIN. JS PARA FORMULARIO CATEGORIA */























/*INICIO. JS PARA FORMULARIO SUBCATEGORIA */
const subcategoriaInterfaz = document.getElementById('subcategoria-interfaz');
if(subcategoriaInterfaz){
    setTimeout(()=>{
        subcategoriaInterfaz.classList.add('show-subcategoria-interfaz');
    },500);
}

const msgSubcategoriaCorrecto = document.getElementById('msg-subcategoria-correcto');
if(msgSubcategoriaCorrecto){
    setTimeout(()=>{
        msgSubcategoriaCorrecto.remove();
    },3000)
}

const btnSubcategoriaGuardar = document.getElementById('btn-guardar-subcategoria');
if(btnSubcategoriaGuardar){
    btnSubcategoriaGuardar.addEventListener('click', e => {
        const subcategoriaInput = document.getElementById('subcategoria-input').value;
        const msgSubcategoriaError = document.getElementById('msg-subcategoria-error');
        if(subcategoriaInput == ''){
            e.preventDefault();
            msgSubcategoriaError.classList.remove('hide-subcategoria-msg');
            setTimeout(()=>{
                msgSubcategoriaError.classList.add('hide-subcategoria-msg');
            },1500);
        }
    });
}
/*FIN. JS PARA FORMULARIO SUBCATEGORIA */