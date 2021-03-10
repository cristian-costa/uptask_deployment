const express = require('express');

const router = express.Router();

//Importar express validator
const {body} = require('express-validator/check');

//Importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function() {
    
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );

    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado, 
        proyectosController.formularioProyecto
    );

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado, 
        body('nombre').not().isEmpty().trim().escape(), 
        proyectosController.nuevoProyecto
    );

    //Listar Proyecto
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    //Actualizar Proyecto
    router.get('/proyectos/editar/:id', 
        authController.usuarioAutenticado,
        proyectosController.formularioEditar
    );

    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(), 
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );

    //Tareas
    router.post('/proyectos/:url', 
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    //Actualizar Tarea, patch solo cambia una parte, put reescribe todo el registro
    router.patch('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    //Eliminar tarea
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Restablecer contrasena
    router.get('/reestablecer', usuariosController.formRestablecerPassword);
    router.post('/reestablecer', authController.enviarToken);
    router.get('/reestablecer/:token', authController.validarToken);
    router.post('/reestablecer/:token', authController.actualizarPassword)


    return router;
}