const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

//Importar viarbles
require('dotenv').config({path:'variables.env'});

//Helpers
const helpers = require('./helpers');

//Crear conexion a la bd
const db = require('./config/db');
const { cookie } = require('express-validator/check');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');



db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch((error) => console.log(error));

//Crear una app de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar pug
app.set('view engine', 'pug');

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

//Agregamos express validator a toda la aplicacion
app.use(expressValidator());



//Anadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sesiones, nos permiten navegar entre distintas paginas sin volvernos a autenticar.
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar var dump a la app
app.use((req, res, next) => {
    //res.locals crea variables que puedo consumir en cualquier archivo
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})





//.use ejecuta post, get...
app.use('/', routes());

//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Servidor Funcionando');
})