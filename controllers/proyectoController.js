'use strict';
const db = require('../models');
const Proyecto = db.proyectos;

module.exports = {
    async getAllProyectos(req, res) {
        try {
            const proyectos = await Proyecto.findAll();
            if (proyectos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron proyectos' });
            }
            res.status(200).json(proyectos);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
    },

    async getProyectoById(req, res) {
        const { idProyecto } = req.params;
        try {
            const proyecto = await Proyecto.findOne({ where: { idProyecto } });
            if (!proyecto) {
                return res.status(404).json({ message: `Proyecto con id: ${idProyecto} no encontrado` });
            }
            res.status(200).json(proyecto);
        } catch (error) {
            console.error('Error al obtener el proyecto:', error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    },

    async createProyecto(req, res) {
        const { nombre_proyecto, fecha_inicio, fecha_final, porcentaje_completado } = req.body;
        try {
            const nuevoProyecto = await Proyecto.create({ nombre_proyecto, fecha_inicio, fecha_final, porcentaje_completado });
            res.status(201).json({ message: 'Proyecto creado exitosamente', proyecto: nuevoProyecto });
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            res.status(500).json({ error: 'Error al crear el proyecto' });
        }
    },

    async updateProyecto(req, res) {
        const { idProyecto } = req.params;
        const { nombre_proyecto, fecha_inicio, fecha_final, porcentaje_completado } = req.body;
        try {
            const proyecto = await Proyecto.findOne({ where: { idProyecto } });
            if (!proyecto) {
                return res.status(404).json({ message: `Proyecto con id: ${idProyecto} no encontrado` });
            }
            proyecto.nombre_proyecto = nombre_proyecto !== undefined ? nombre_proyecto : proyecto.nombre_proyecto;
            proyecto.fecha_inicio = fecha_inicio !== undefined ? fecha_inicio : proyecto.fecha_inicio;
            proyecto.fecha_final = fecha_final !== undefined ? fecha_final : proyecto.fecha_final;
            proyecto.porcentaje_completado = porcentaje_completado !== undefined ? porcentaje_completado : proyecto.porcentaje_completado;

            await proyecto.save();
            res.status(200).json({ message: `Proyecto con id: ${idProyecto} actualizado exitosamente`, proyecto });
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
    },

    async deleteProyecto(req, res) {
        const { idProyecto } = req.params;
        try {
            const proyecto = await Proyecto.findOne({ where: { idProyecto } });
            if (!proyecto) {
                return res.status(404).json({ message: `Proyecto con id: ${idProyecto} no encontrado` });
            }
            await proyecto.destroy();
            res.status(200).json({ message: `Proyecto con id: ${idProyecto} ha sido eliminado` });
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
            res.status(500).json({ error: 'Error al eliminar el proyecto' });
        }
    }
};
