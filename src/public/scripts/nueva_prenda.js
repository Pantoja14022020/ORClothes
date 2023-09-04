window.addEventListener('load', async () => {


    const nuevaPrenda = document.getElementById('nueva-prenda');

    if(nuevaPrenda){
        setTimeout(()=>{
            nuevaPrenda.classList.add('show-nueva-prenda');
        },500);
    }



    //CATEGORIA - SUBCATEGORIAS
    //Logica para mostrar las subcategorias segun la categoria seleccionada
    const categoriaInputSelect = document.getElementById('categoria-input');//Selecciono el select de seleccionar categoria
    const subcategoriaInputSelect = document.getElementById('subcategoria-input');//Selecciono el select de subcategroias
    if(categoriaInputSelect && subcategoriaInputSelect){
    
        /*const {subcategorias} = await obtenerSubcategorias(5);
        subcategoriaInputSelect.innerHTML = ''//Limipiamos el select subcategoria
        subcategorias.forEach(subcategoria => {//Agregando los diferentes options al select subcategoria
            let {id_subcategoria, nombre} = subcategoria;
            let option = document.createElement('option');
            option.setAttribute('value',id_subcategoria);
            option.innerText = nombre;
            subcategoriaInputSelect.appendChild(option);
        });*/
        
        /*categoriaInputSelect.addEventListener('change', async e => {
            const id_categoria = e.target.value;
            let {subcategorias} = await obtenerSubcategorias(id_categoria);
            subcategoriaInputSelect.innerHTML = ''//Limipiamos el select subcategoria
            subcategorias.forEach(subcategoria => {//Agregando los diferentes options al select subcategoria
                let {id_subcategoria, nombre} = subcategoria;
                let option = document.createElement('option');
                option.setAttribute('value',id_subcategoria);
                option.innerText = nombre;
                subcategoriaInputSelect.appendChild(option);
            });
        });*/

    }

    //Funcion que hace fetch para obtener las subcatageorias
    async function obtenerSubcategorias(id_categoria){
        return new Promise( async (resolve, reject) => {
            await fetch(`/obtenerSubcategorias/${id_categoria}`)
            .then( res => {
                return res.json();
            })
            .then( datos => {
                resolve(datos)
            })
            .catch( err => {
                reject(err)
            })
        })
    }















    //Checked
    //REPARACION
    const reparacionInput = document.getElementById('fix-input');
    const descripcionReparacionInput = document.getElementById('descripcion-reparacion');
    if(reparacionInput){
        reparacionInput.addEventListener('change', e => {
            if(e.target.checked == true){
                descripcionReparacionInput.classList.remove('hide-form-prenda');
            }else{
                descripcionReparacionInput.classList.add('hide-form-prenda');
            }
        });
    }

    //DISPONIBLE
    const disponibleInput =  document.getElementById('diponibilidad');
    const requiereReparacion = document.getElementById('fix-input');
    const estaLavanderia =  document.getElementById('lavanderia-input');
    if(disponibleInput && requiereReparacion && estaLavanderia){
        disponibleInput.addEventListener('change', e => {
            if(e.target.checked == true){
                requiereReparacion.disabled = true;
                estaLavanderia.disabled = true;
            }else{
                requiereReparacion.disabled = false;
                estaLavanderia.disabled = false;
            }
        });

        requiereReparacion.addEventListener('change', e => {
            if(e.target.checked == true){
                disponibleInput.disabled = true;
                estaLavanderia.disabled = true;
            }else{
                disponibleInput.disabled = false;
                estaLavanderia.disabled = false;
                descripcionReparacionInputForm.value = "";
            }
        });


        estaLavanderia.addEventListener('change', e => {
            if(e.target.checked == true){
                disponibleInput.disabled = true;
                requiereReparacion.disabled = true;
            }else{
                disponibleInput.disabled = false;
                requiereReparacion.disabled = false;
            }
        });
    }
    
    



    //Form - Validar campos   PARA PODER MANDAR EL FORMULARIO
    const formNuevaPrenda = document.getElementById('form-nueva-prenda');
    
    const codigoPrenda = document.getElementById('codigo_prenda');
    const nombrePrenda = document.getElementById('nombre_prenda');
    const categoriaInputForm = document.getElementById('categoria-input');
    const subcategoriaInputForm =  document.getElementById('subcategoria-input');
    const marcaInputForm =  document.getElementById('marca-input');
    const colorInputForm =  document.getElementById('color-form-prenda');
    const descripcionTallaInputForm = document.getElementById('talla-text-area');
    const estadoInputForm = document.getElementById('estado-input');
    const disponibilidadInputForm = document.getElementById('diponibilidad');
    const reparacionInputForm = document.getElementById('fix-input');
    const descripcionReparacionInputForm = document.getElementById('descripcion_reparacion');
    const estaLavanderiaInputForm = document.getElementById('lavanderia-input');


    if(codigoPrenda && nombrePrenda && formNuevaPrenda && categoriaInputForm && subcategoriaInputForm && marcaInputForm && colorInputForm && descripcionTallaInputForm && estadoInputForm && disponibilidadInputForm && reparacionInputForm && descripcionReparacionInputForm && estaLavanderiaInputForm){
        formNuevaPrenda.addEventListener('submit', async e => {
            e.preventDefault();
            if( codigoPrenda.value == "" || nombrePrenda.value == ""  || colorInputForm.value == "" || descripcionTallaInputForm.value == "" || (disponibilidadInputForm.checked == false && reparacionInput.checked == false && estaLavanderiaInputForm.checked == false)){
                const msgAlertPrenda = document.getElementById('msg-algunos-campos-vacios-nuevaprenda');
                const p =  document.querySelector('#msg-nueva-prenda > p');
                p.textContent = '';
                p.textContent = 'Todos los campos son obligatorios';
                msgAlertPrenda.classList.add('show-alert-prenda');
                setTimeout(()=>{
                    msgAlertPrenda.classList.remove('show-alert-prenda');
                },2000)
            }else{
                
                let codigo_prenda = codigoPrenda.value;
                let nombre_prenda = nombrePrenda.value;
                let _categoria = categoriaInputForm.value;
                let _subcategoria = subcategoriaInputForm.value;
                let _marca = marcaInputForm.value;
                let _color = colorInputForm.value;
                let _talla = descripcionTallaInputForm.value;
                let _estado = estadoInputForm.value;
                let esta_disponible = disponibilidadInputForm.checked ? 1 : 0;
                let requiere_repararse = reparacionInputForm.checked ? 1 : 0;
                let _descripcion_rep = descripcionReparacionInputForm.value;
                let esta_en_lavanderia = estaLavanderiaInputForm.checked ? 1 : 0;
                let id_usuario_form = e.target.getAttribute('itemid')
    
                let prenda = {
                    "nombre": nombre_prenda,
                    "id_categoria": _categoria,
                    "id_subcategoria": _subcategoria,
                    "id_marca": _marca,
                    "color": _color,
                    "id_estado": _estado,
                    "fotografia": "",
                    "disponible": esta_disponible,
                    "necesita_reparacion": requiere_repararse,
                    "tipo_reparacion": _descripcion_rep,
                    "id_usuario": id_usuario_form,
                    "esta_lavanderia": esta_en_lavanderia,
                    "talla_descripcion": _talla,
                    "codigo_prenda": codigo_prenda
                }
    
    
                // Opciones de configuración de la solicitud
                const options = {
                    method: 'POST', // Método HTTP POST
                    headers: {
                    'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(prenda)
                };
    
                const {registrado} = await registrarPrenda(id_usuario_form,options);
                

                if(registrado){//Si si se registro en la base de datos... mostrar notificacion
                    const msgSuccessPrenda = document.getElementById('registro-exitoso');
                    msgSuccessPrenda.classList.add('show-success-prenda');
                    setTimeout(()=>{
                        msgSuccessPrenda.classList.remove('show-success-prenda');
                        formNuevaPrenda.reset();
                    },2000)
                }else{
                    const msgAlertPrenda = document.getElementById('msg-algunos-campos-vacios-nuevaprenda');
                    const p =  document.querySelector('#msg-nueva-prenda > p');
                    p.textContent = '';
                    p.textContent = 'No se pudo crear';
                    msgAlertPrenda.classList.add('show-alert-prenda');
                    setTimeout(()=>{
                        msgAlertPrenda.classList.remove('show-alert-prenda');
                    },2000)
                }
                
            }
        });
    }



    //Funcion que hace fetch para hacer el registro de la prenda
    async function registrarPrenda(id_categoria, options){
        return new Promise( async (resolve, reject) => {
            await fetch(`/armario/usuario/${id_categoria}/nueva_prenda`, options)
                .then(res => {
                    return res.json();
                })
                .then( datos => {
                    resolve(datos)
                })
                .catch( err => {
                    reject(err)
                })
        })
    }



})