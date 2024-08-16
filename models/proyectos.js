'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proyectos extends Model {
    static associate(models) {
      Proyectos.hasMany(models.Empleados, {
        foreignKey: 'proyecto_id',
        as: 'empleados' 
      });
    }
  }
  
  Proyectos.init({
    idProyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre_proyecto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_final: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    porcentaje_completado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proyectos', 
    tableName: 'proyectos', 
    timestamps: false 
  });

  return Proyectos;
};
