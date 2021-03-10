const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //Obtenemos proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    })
    //Leer el valor del input
    const {tarea} = req.body;

    //Estado 0 = incompleta
    const estado = 0;

    //id proyecto
    const proyectoId = proyecto.id;

    //insertar en bd
    const resultado = await Tareas.create({tarea, estado, proyectoId});
    if(!resultado){
        return next();
    }

    //redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({where: {id}});
    
    //Cambiar estado
    let estado = 0;
    if(tarea.estado === estado){
        tarea.estado = 1;
    } else{
        tarea.estado = 0
    }

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
    const {id} = req.params;
    const resultado = await Tareas.destroy({where:{id}});
    if(!resultado) return next();
    
    res.status(200).send('Tarea eliminada');
}