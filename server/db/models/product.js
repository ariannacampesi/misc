const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  specs: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
