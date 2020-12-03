const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('req', req.user)
    const orders = await OrderProduct.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let details = req.body
    const createdOrder = await Order.create({purchased: true})
    details = details.map(detail => ({
      productId: detail.id,
      orderId: createdOrder.id,
      quantity: detail.quantity
    }))
    const createdOrderDetails = await OrderProduct.bulkCreate(details)
    console.log('createdOrderDetails', createdOrderDetails)
    res.json(createdOrderDetails)
  } catch (err) {
    next(err)
  }
})
