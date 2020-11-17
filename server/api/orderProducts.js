const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('req', req.user)
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
