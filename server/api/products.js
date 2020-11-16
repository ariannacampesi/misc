const router = require('express').Router()
const {Product, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    console.log('oroducts in route', products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryName', async (req, res, next) => {
  try {
    console.log('req.params', req.params)
    const {categoryName} = req.params
    const category = await Category.findOne({
      where: {
        name: categoryName
      }
    })
    console.log('categoryId', category.dataValues.id)

    const foundProducts = await Product.findAll({
      where: {
        categoryId: category.dataValues.id
      }
    })
    res.json(foundProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/singleProduct/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    const foundProduct = await Product.findByPk(productId)
    if (!foundProduct) console.error('Product not found.')
    res.json(foundProduct)
  } catch (err) {
    next(err)
  }
})
