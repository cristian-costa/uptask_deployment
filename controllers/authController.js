const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

const Op = Sequelize.Op;

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Revisa si el usuario esta logueado o no
exports.usuarioAutenticado = (req, res, next) => {
    //Si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }

    //si no esta autenticado, redirigir al form
    return res.redirect('/iniciar-sesion');
}

//Cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); 
    })
}

//Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //Verificar que el usuario existe!
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email}});

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe esa cuenta')
        res.redirect('reestablecer');
    }

    //Usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');

    //Expiracion
    usuario.expiracion = Date.now() + 3600000;

    //Guardarlos en la base de datos
    await usuario.save();

    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    
    //Envia el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });

    //Terminar
    req.flash('correcto', 'Se envio un mensaje a tu correo');
    res.redirect('/iniciar-sesion');
    
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({where: {token: req.params.token}});

    //Si no encuentra usuario
    if(!usuario){
        req.flash('error', 'No Valido');
        res.redirect('/reestablecer');
    }

    //Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contrasena'
    })
}

exports.actualizarPassword = async (req, res) => {
    //Verifica el token valido y la fecha de expiracion
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    })

    //Verificamos si el usuario existe
    if(!usuario){
        req.flash('error', 'No Valido')
        res.redirect('/reestablecer');
    }

    //Hashear el password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    //Guardamos el nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
    
}