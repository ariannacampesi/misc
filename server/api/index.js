const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orderProducts', require('./orderProducts'))
router.use('/orders', require('./orders'))
router.use('/promos', require('./promos'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
