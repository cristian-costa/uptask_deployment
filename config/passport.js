const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

//local strategy - login con credenciales propias
passport.use(
    new LocalStrategy(
        //Por default passport espera usuario y password
        {
            //Tal cual tenemos en el modelo
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try{
                const usuario = await Usuarios.findOne({where: {email, activo: 1}});
                //Usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {message: 'Password Incorrecto'});
                }
                //Email existe, password correcto
                return done(null, usuario);
            } catch(error){
                //Ese usuaio no existe
                return done(null, false, {message: 'Esa cuenta no existe'});
            }
        }
    )
);

//Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;