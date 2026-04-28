const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CentroAcopio = sequelize.define('CentroAcopio', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING },
    capacidad_max: { type: DataTypes.INTEGER },
    stock_actual: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'centros_acopio',
    timestamps: true
});

module.exports = CentroAcopio;