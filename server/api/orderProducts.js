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
    const details = req.body
    console.log('req.body in post', req.body)
    const createdOrder = await Order.create({purchased: true})
    const createdOrderDetails = await details.forEach(lineItem =>
      OrderProduct.create({
        productId: lineItem.id,
        quantity: lineItem.quantity,
        orderId: createdOrder.id
        // imgUrl: lineItem.imgUrl,
        // name: lineItem.name,
        // price: lineItem.price,
      })
    )
    res.json(createdOrderDetails)
  } catch (err) {
    next(err)
  }
})
