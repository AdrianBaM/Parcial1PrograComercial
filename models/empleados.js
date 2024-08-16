'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empleados extends Model {
    static associate(models) {
      Empleados.belongsTo(models.Proyectos, {
        foreignKey: 'proyecto_id',
        as: 'proyecto' 
      });
    }
  }
  
  Empleados.init({
    idEmpleado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proyectos', 
        key: 'idProyecto'
      }
    }
  }, {
    sequelize,
    modelName: 'Empleados', 
    tableName: 'empleados', 
    timestamps: false 
  });

  return Empleados;
};
