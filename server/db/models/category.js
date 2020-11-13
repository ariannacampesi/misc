const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.ENUM('home', 'fashion', 'food', 'active', 'beauty'),
    allowNull: false
  }
})

module.exports = Category
