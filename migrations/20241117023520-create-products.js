'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_model: {
        type: Sequelize.STRING
      },
      product_img: {
        type: Sequelize.STRING
      },
      product_quantity: {
        type: Sequelize.INTEGER
      },
      purchase_price: {
        type: Sequelize.DECIMAL
      },
      selling_price: {
        type: Sequelize.DECIMAL
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      product_status: { // New column
        type: Sequelize.STRING,
        allowNull: true // Adjust as per your requirements
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
