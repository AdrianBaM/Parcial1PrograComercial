'use strict';
const db = require("../models");
const Empleado = db.empleados;

module.exports = {
    async getAllEmpleados(req, res) {
        try {
            const empleados = await Empleado.findAll();
            if (empleados.length === 0) {
                return res.status(404).json({ message: 'No se encontraron empleados' });
            }
            res.status(200).json(empleados);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    },

    async getEmpleadoById(req, res) {
        const { idEmpleado } = req.params;
        try {
            const empleado = await Empleado.findOne({ where: { idEmpleado } });
            if (!empleado) {
                return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
            }
            res.status(200).json(empleado);
        } catch (error) {
            console.error('Error al obtener el empleado:', error);
            res.status(500).json({ error: 'Error al obtener el empleado' });
        }
    },

    async createEmpleado(req, res) {
        const { nombre, telefono, salario, proyecto_id } = req.body;
        try {
            const nuevoEmpleado = await Empleado.create({ nombre, telefono, salario, proyecto_id });
            res.status(201).json({ message: 'Empleado creado exitosamente', empleado: nuevoEmpleado });
        } catch (error) {
            console.error('Error al crear el empleado:', error);
            res.status(500).json({ error: 'Error al crear el empleado' });
        }
    },

    async updateEmpleado(req, res) {
        const { idEmpleado } = req.params;
        const { nombre, telefono, salario, proyecto_id } = req.body;
        try {
            const empleado = await Empleado.findOne({ where: { idEmpleado } });
            if (!empleado) {
                return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
            }
            empleado.nombre = nombre !== undefined ? nombre : empleado.nombre;
            empleado.telefono = telefono !== undefined ? telefono : empleado.telefono;
            empleado.salario = salario !== undefined ? salario : empleado.salario;
            empleado.proyecto_id = proyecto_id !== undefined ? proyecto_id : empleado.proyecto_id;

            await empleado.save();
            res.status(200).json({ message: `Empleado con id: ${idEmpleado} actualizado exitosamente`, empleado });
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            res.status(500).json({ error: 'Error al actualizar el empleado' });
        }
    },

    async deleteEmpleado(req, res) {
        const { idEmpleado } = req.params;
        try {
            const empleado = await Empleado.findOne({ where: { idEmpleado } });
            if (!empleado) {
                return res.status(404).json({ message: `Empleado con id: ${idEmpleado} no encontrado` });
            }
            await empleado.destroy();
            res.status(200).json({ message: `Empleado con id: ${idEmpleado} ha sido eliminado` });
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
            res.status(500).json({ error: 'Error al eliminar el empleado' });
        }
    }
};
