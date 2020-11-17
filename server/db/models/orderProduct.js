const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false
  }
})

module.exports = OrderProduct
