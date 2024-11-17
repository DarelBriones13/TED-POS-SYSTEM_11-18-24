'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    static associate(models) {
      // Define associations here
      // An inventory entry belongs to a product
      inventory.belongsTo(models.products, { foreignKey: 'product_id', as: 'product' });

      // An inventory entry belongs to a supplier
      inventory.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'Supplier' });

      // An inventory entry can belong to a user (if applicable)
      inventory.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  inventory.init({
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stocks: {
      type: DataTypes.INTEGER
    },
    date_received: {
      type: DataTypes.DATE
    },
    supplier_id: {
      type: DataTypes.INTEGER
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    inventory_status: { // New attribute
      type: DataTypes.STRING,
      allowNull: true // Adjust this based on your requirements
    }
  }, {
    sequelize,
    modelName: 'inventory',
  });

  return inventory;
};