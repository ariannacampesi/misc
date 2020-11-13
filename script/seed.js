'use strict'

const db = require('../server/db')
const {User, Category, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all([
    Category.create({name: 'home'}),
    Category.create({name: 'fashion'}),
    Category.create({name: 'food'}),
    Category.create({name: 'active'}),
    Category.create({name: 'beauty'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Canvas Tote',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/baggu/baggu30366122fd/baggu30366122fd_q6_2-0._UX357_QL90_.jpg',
      quantity: 10,
      specs: [
        {
          color: 'green',
          fabrication: '100% cotton canvas',
          dimensions: '16 ½" × 12" × 7'
        }
      ],
      price: 48,
      categoryId: 1
    }),
    Product.create({
      name: 'Ankle/Wrist Weights',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0007/8151/6860/products/BALA_1LB_DEEP_BLUE_HERO_aef49cd8-45c2-4182-a122-d8a6b6baa874_1024x.png?v=1605259489',
      quantity: 10,
      specs: [{totalWeight: '2lbs'}],
      price: 48,
      categoryId: 4
    }),
    Product.create({
      name: 'Silk Pillowcase',
      imgUrl:
        'https://www.sephora.com/productimages/sku/s1771229-main-zoom.jpg?imwidth=1166',
      specs: [{fabrication: '100% silk'}],
      price: 88,
      categoryId: 1,
      quantity: 10
    }),
    Product.create({
      name: 'Purple Candle',
      imgUrl:
        'https://www.sephora.com/productimages/sku/s2329910-main-zoom.jpg?imwidth=1166',
      specs: [{scent: 'fruity'}],
      price: 58,
      categoryId: 1,
      quantity: 10
    }),
    Product.create({
      name: 'Electric Kettle',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/3/optimized/11035763_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      specs: [
        {
          dimensions: '9" x 7" x 10"',
          capacity: '7 cups',
          fabrication: 'stainless steel'
        }
      ],
      price: 208,
      categoryId: 1,
      quantity: 10
    }),
    Product.create({
      name: 'Polka Dot Toaster',
      imgUrl:
        'https://secure.img1-fg.wfcdn.com/im/65651162/resize-h800-w800%5Ecompr-r85/4685/46859241/2+Slice+All+in+Good+Taste+Deco+Dot+Toaster.jpg',
      specs: [{capacity: '2 slices', fabrication: 'enamel on steel'}],
      price: 58,
      categoryId: 1,
      quantity: 10
    }),
    Product.create({
      name: 'Alpaca Throw',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0270/1082/6274/products/nixonthrow_or_db16a096-d05d-45d7-9575-8f605e5a3d5c_x1200.jpg?v=1604991435',
      price: 368,
      specs: [{fabrication: '100% alpaca', size: '60" on all sides'}],
      categoryId: 1,
      quantity: 5
    }),
    Product.create({
      name: 'Leopard Crossbody',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1240/1014/products/Midi-Sac---Cognac-Pablo-Cat-Suede-w-Violet-Fern-_Lipstick-Italian-Nappa-Mini-Stripes---HB-CB-MS-100094-COG---1-FRONT_2400x.jpg?v=1597684542',
      price: 348,
      specs: [
        {fabrication: 'genuine suede', dimensions: '7.5”W x 5.5”H x 2.5”D'}
      ],
      quantity: 5,
      categoryId: 2
    }),
    Product.create({
      name: 'Leather Coasters (set of 4)',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0309/2830/6316/products/Coaster_Set_Marbled_Colorful_01_f287f043-976a-48d4-842f-d7a18d5df491_1296x.jpg?v=1597085399',
      specs: [{fabrication: 'genuine leather'}],
      price: 28,
      quantity: 10,
      categoryId: 1
    }),
    Product.create({
      name: 'Pink Combat Boots',
      imgUrl:
        'https://cdn-images.farfetch-contents.com/14/83/92/01/14839201_24465015_1000.jpg',
      specs: [{fabrication: 'genuine leather'}],
      price: 148,
      quantity: 20,
      categoryId: 2
    }),
    Product.create({
      name: 'Yellow Sandal',
      imgUrl:
        'https://www.birkenstock.com/on/demandware.static/-/Sites-master-catalog/default/dwba2aea66/1018089/1018089.jpg',
      specs: [{fabrication: 'genuine leather'}],
      price: 368,
      quantity: 20,
      categoryId: 2
    }),
    Product.create({
      name: 'Pink Cord Bucket Hat',
      imgUrl:
        'https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/8d/P00506479.jpg',
      specs: [{fabrication: '100% cotton'}],
      price: 158,
      quantity: 10,
      categoryId: 2
    }),
    Product.create({
      name: 'Recycled Nylon Jacket',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400013074292_A1?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      specs: [{fabrication: 'nylon'}],
      price: 428,
      quantity: 4,
      categoryId: 2
    }),
    Product.create({
      name: 'Pink Sheer Socks',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/8/optimized/10684328_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      price: 18,
      quantity: 15,
      categoryId: 2,
      specs: [{fabrication: 'nylon/metallic thread/elastane'}]
    }),
    Product.create({
      name: 'Convertible Tote Bag',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0202/7480/products/Notabag_OliveDots_1920x2160_5909fa88-4cfb-40fd-96a2-4da3060826d7_1600x.jpg?v=1603794905',
      price: 28,
      quantity: 10,
      categoryId: 2,
      specs: [{fabrication: 'cotton/nylon', dimensions: '16"H x 16 ½"W x ¼"D'}]
    }),
    Product.create({
      name: 'Coffee Sweater',
      imgUrl:
        'https://di2ponv0v5otw.cloudfront.net/posts/2020/09/28/5f71f95f88cce33680050e16/m_5f71f96b9e1559656a184583.jpg',
      price: 48,
      categoryId: 2,
      quantity: 2,
      specs: [{fabrication: 'wool blend'}]
    }),
    Product.create({
      name: 'Leather Handbag',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/staud/staud3058718ced/staud3058718ced_q6_2-0._UX357_QL90_.jpg',
      price: 328,
      categoryId: 2,
      quantity: 5,
      specs: [{fabrication: 'leather', dimensions: '6.75 x 6.75 x 4'}]
    }),
    Product.create({
      name: 'Ribbed Legging',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/6/optimized/11071506_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      categoryId: 4,
      quantity: 10,
      specs: [{fabrication: 'nylon/spandex'}],
      price: 98
    }),
    Product.create({
      name: 'Modern Waterbottle',
      imgUrl:
        'https://images.hermanmiller.group/m/e0fc28964a660717/W-HAY_2515061_100129805_blue_f.png?blend-mode=darken&blend=f8f8f8&trim-color=ffffff&trim=color&bg=f8f8f8&auto=format&w=1200&q=68&h=1000',
      categoryId: 4,
      quantity: 5,
      specs: [{fabrication: 'stainless steel', dimensions: '8"H'}],
      price: 38
    }),
    Product.create({
      name: 'Mint Lip Balm',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0283/2308/6410/products/Lanolips101OintmentMinty-squeezed_shadow_1_3869f5de-b363-4613-95c8-4f1cd2a92d50_1080x.jpg?v=1587002965',
      categoryId: 5,
      quantity: 20,
      specs: [{}],
      price: 18
    })
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
