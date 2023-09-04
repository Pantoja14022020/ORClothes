function noEstaLogeado(req, res, next) {
    if (!req.session.usuario) {//Sino ha iniciado sesion, entonces si lo dejo que acceda a este endpoint
        next();
    } else {//Pero si ya inicio sesion, mejor no dejo que acceda a este endpoint, sino que lo mando al dashboard
        const id_user = req.session.usuario;
        res.redirect(`/armario/usuario/${id_user}`);
    }
}

module.exports = {
    noEstaLogeado
}