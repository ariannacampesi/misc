const router = require('express').Router()
const {Promo} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const promos = await Promo.findAll({
      where: {
        status: 'active'
      },
      attributes: ['code', 'discount']
    })
    res.json(promos)
  } catch (err) {
    next(err)
  }
})
