const Sequelize = require('sequelize')
const db = require('../db')

const Promo = db.define('promo', {
  code: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('active', 'expired'),
    allowNull: false
  },
  discount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = Promo
