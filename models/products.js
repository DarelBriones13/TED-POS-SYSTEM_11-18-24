'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      // Define associations here
      // A product belongs to a category
      products.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    }
  }

  products.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING
    },
    product_model: {
      type: DataTypes.STRING
    },
    product_img: {
      type: DataTypes.STRING
    },
    product_quantity: {
      type: DataTypes.INTEGER
    },
    purchase_price: {
      type: DataTypes.DECIMAL
    },
    selling_price: {
      type: DataTypes.DECIMAL
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    product_status: { // New attribute
      type: DataTypes.STRING,
      allowNull: true // Adjust as per your requirements
    }
  }, {
    sequelize,
    modelName: 'products',
  });

  return products;
};