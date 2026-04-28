const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inventario = sequelize.define('Inventario', {
  item: { type: DataTypes.STRING, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, defaultValue: 0 },
  centro_acopio: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING, defaultValue: 'Disponible' }
});

module.exports = Inventario;