const { Router } = require('express');
const router = Router();

const empleadoController = require('../controllers/empleadoController');
const proyectoController = require('../controllers/proyectoController');

module.exports = (app) => {
    router.get('/empleados', empleadoController.getAllEmpleados);
    router.get('/empleados/:idEmpleado', empleadoController.getEmpleadoById);
    router.post('/empleados', empleadoController.createEmpleado);
    router.put('/empleados/:idEmpleado', empleadoController.updateEmpleado);
    router.delete('/empleados/:idEmpleado', empleadoController.deleteEmpleado);

    router.get('/proyectos', proyectoController.getAllProyectos);
    router.get('/proyectos/:idProyecto', proyectoController.getProyectoById);
    router.post('/proyectos', proyectoController.createProyecto);
    router.put('/proyectos/:idProyecto', proyectoController.updateProyecto);
    router.delete('/proyectos/:idProyecto', proyectoController.deleteProyecto);
}
