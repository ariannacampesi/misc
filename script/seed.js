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
    Category.create({id: 1, name: 'home'}),
    // Category.create({name: 'food'}),
    Category.create({id: 2, name: 'fashion'}),
    Category.create({id: 4, name: 'active'}),
    Category.create({id: 3, name: 'beauty'})
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
        'https://cdn.shopify.com/s/files/1/0007/8151/6860/products/BALA_1LB_BANANA_HERO_99225ad3-f73d-4af6-9765-c5bcdc3b8126_1024x.png?v=1605259489',
      quantity: 10,
      specs: [{totalWeight: '2lbs'}],
      price: 48,
      categoryId: 4
    }),
    Product.create({
      name: 'Silk Pillowcase',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/8/optimized/10854938_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
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
      name: 'Leather Journal',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400010043254_SKYBLUE?wid=480&hei=640&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 1,
      quantity: 8,
      specs: [{fabrication: '100% leather', color: 'black'}],
      price: 198
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
      name: 'Ice Cream Vase',
      imgUrl:
        'https://images.horchow.com/ca/2/product_assets/H/C/8/X/X/HCHC8XX_mu.jpg',
      price: 88,
      specs: [{fabrication: 'porcelain'}],
      categoryId: 1,
      quantity: 3
    }),
    Product.create({
      name: 'Feather Tray',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/8102920_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      price: 108,
      specs: [{fabrication: 'gold plate'}],
      categoryId: 1,
      quantity: 3
    }),
    Product.create({
      name: 'Hot Water Bottle Cover',
      imgUrl:
        'https://www.amara.com/static/uploads/images-2/products/huge/157266/amara-x-es-velvet-bee-hot-water-bottle-dusky-orchi-910939.jpg',
      price: 48,
      specs: [{fabrication: '100% cotton', color: 'pink/gold'}],
      categoryId: 1,
      quantity: 15
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
      name: 'Gray Sweatshirt',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/agole/agole3039616534/agole3039616534_q6_2-0._UX357_QL90_.jpg',
      price: 78,
      specs: [{fabrication: '100% cotton'}],
      quantity: 15,
      categoryId: 2
    }),
    Product.create({
      name: 'Pearl Necklace',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/5/optimized/9358705_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      price: 348,
      specs: [{fabrication: '18k gold vermeil/organic man-made pearls'}],
      quantity: 15,
      categoryId: 2
    }),
    Product.create({
      name: 'Baguette Hoops',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/1118760_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      price: 758,
      specs: [{fabrication: '14k gold/diamonds'}],
      quantity: 15,
      categoryId: 2
    }),
    Product.create({
      name: 'Leather Collar',
      imgUrl:
        'https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/34/P00490668.jpg',
      price: 218,
      specs: [{fabrication: '100% leather', color: 'black'}],
      categoryId: 2,
      quantity: 7
    }),
    Product.create({
      name: 'Pink Leather Satchel',
      imgUrl:
        'https://cdn-images.farfetch-contents.com/13/86/92/60/13869260_21901903_600.jpg',
      price: 548,
      specs: [{fabrication: '100% leather', color: 'pink'}],
      categoryId: 2,
      quantity: 7
    }),
    Product.create({
      name: 'Colorblock Scarf',
      imgUrl: 'https://cdn.modesens.com/media/77896387',
      price: 198,
      specs: [{fabrication: '100% wool', color: 'multi'}],
      categoryId: 2,
      quantity: 7
    }),
    Product.create({
      name: 'Metallic Gym Bag',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400099497385?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      price: 248,
      specs: [{fabrication: '100% nylon', color: 'silver/gunmetal'}],
      categoryId: 2,
      quantity: 17
    }),
    Product.create({
      name: 'Leather Coasters (4)',
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
      name: 'Faux Fur Tote',
      imgUrl:
        'https://cdn.modaoperandi.com/img/images/products/813476/433389/large_stand-studio-brown-liz-faux-fur-check-tote.jpg?_v=1605722726&h=1200&operation=resize&w=1400',
      specs: [{color: 'brown'}],
      price: 198,
      quantity: 10,
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
      name: 'Woven Wallet',
      imgUrl:
        'https://cdn-images.farfetch-contents.com/14/75/60/51/14756051_23564728_1000.jpg',
      specs: [{fabrication: '100% leather', color: 'black'}],
      price: 748,
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
      name: 'Metallic Legging',
      imgUrl:
        'https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/14/_106391634.jpg?h=365&w=240&dpr=2&quality=45&fit=fill&fm=jpg',
      categoryId: 4,
      quantity: 10,
      specs: [{fabrication: 'nylon/spandex'}],
      price: 128
    }),
    Product.create({
      name: 'Water Bottle',
      imgUrl:
        'https://res.cloudinary.com/ssenseweb/image/upload/b_white%2Cc_lpad%2Cg_center%2Ch_960%2Cw_960/c_scale%2Ch_680/f_auto%2Cdpr_1.0/v572/202236F025018_1.jpg',
      categoryId: 4,
      quantity: 10,
      specs: [{}],
      price: 89
    }),
    Product.create({
      name: 'Insulated Bottle',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0146/0862/9808/products/20932_1000x.jpg?v=1550557368',
      categoryId: 4,
      quantity: 5,
      specs: [{fabrication: 'stainless steel', dimensions: '8"H'}],
      price: 38
    }),
    Product.create({
      name: 'Mint Lip Balm',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0283/2308/6410/products/Lanolips101OintmentMinty-squeezed_shadow_1_3869f5de-b363-4613-95c8-4f1cd2a92d50_1080x.jpg?v=1587002965',
      categoryId: 3,
      quantity: 20,
      specs: [{}],
      price: 18
    }),
    Product.create({
      name: 'Glitter Gloss',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1533/1801/products/SMLG-Pearl-main_1024x1024.progressive.jpg?v=1601075134',
      categoryId: 3,
      quantity: 20,
      specs: [{}],
      price: 18
    }),
    Product.create({
      name: 'Face Brush',
      imgUrl:
        'https://www.sephora.com/productimages/sku/s2111565-main-zoom.jpg?imwidth=1166',
      categoryId: 3,
      quantity: 10,
      specs: [{color: 'blue'}],
      price: 98
    }),
    Product.create({
      name: 'Hand Sanitzer Case',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0178/8417/products/2020-9-30-Kara-D12_White_CrystalMesh_HandSanitizer_Keychain-0109copy_2048x2048.jpg?v=1602648055',
      categoryId: 3,
      quantity: 30,
      specs: [{}],
      price: 48
    }),
    Product.create({
      name: 'Rose Quartz Gua Sha',
      imgUrl:
        'https://www.sephora.com/productimages/sku/s2201937-main-zoom.jpg?imwidth=1166',
      categoryId: 3,
      quantity: 30,
      specs: [{fabrication: 'rose quartz'}],
      price: 18
    }),
    Product.create({
      name: 'Brush Set (10)',
      imgUrl:
        'https://www.sephora.com/productimages/sku/s2077550-main-zoom.jpg?imwidth=1166',
      categoryId: 3,
      quantity: 30,
      specs: [{}],
      price: 368
    }),
    Product.create({
      name: 'Cooler Backpack',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/8/optimized/11048008_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      categoryId: 1,
      quantity: 8,
      specs: [{fabrication: '100% leather', color: 'navy'}],
      price: 198
    }),
    Product.create({
      name: 'Striped Terry Robe',
      imgUrl:
        'https://n.io.nordstrommedia.com/id/sr3/31ba7b43-5abc-424d-8dcb-361ee9bb30e9.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2',
      categoryId: 3,
      quantity: 30,
      specs: [{fabrication: '100% cotton'}],
      price: 198
    }),
    Product.create({
      name: 'Bracelet Stack',
      imgUrl:
        'https://static1.squarespace.com/static/5bb32c329b7d150d0ef31e23/5bd043bab0ad02ca6085be43/5e3492195acf4408945289f1/1580503856070/?format=1500w',
      categoryId: 2,
      specs: [{}],
      quantity: 15,
      price: 58
    }),
    Product.create({
      name: 'White Bucket Bag',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/staud/staud305291893b/staud305291893b_q6_2-0._UX357_QL90_.jpg',
      categoryId: 2,
      specs: [{fabrication: '100% leather', color: 'white'}],
      quantity: 7,
      price: 298
    }),
    Product.create({
      name: 'Faux Fur Jacket',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400012583339_ECRU?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{fabrication: 'alpaca/wool', color: 'ivory'}],
      quantity: 7,
      price: 458
    }),
    Product.create({
      name: 'Leather Pants',
      imgUrl:
        'https://www.theoutnet.com/variants/images/2704970802229727/F/w1020.jpg',
      categoryId: 2,
      specs: [{fabrication: '100% leather', color: 'black'}],
      quantity: 7,
      price: 398
    }),
    Product.create({
      name: 'Asymmetric Knit',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400013304534_CAMEL?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{fabrication: 'cotton/cashmere/silk', color: 'camel'}],
      quantity: 7,
      price: 748
    }),
    Product.create({
      name: 'Abstract Knit',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400013148115_MULTI?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{fabrication: 'cotton/cashmere/silk', color: 'multi'}],
      quantity: 7,
      price: 428
    }),
    Product.create({
      name: 'Leather Gloves',
      imgUrl:
        'https://s7.landsend.com/is/image/LandsEnd/472919_A516_LF_44Y?$1960x2940$',
      categoryId: 2,
      specs: [{fabrication: '100% leather', color: 'green'}],
      quantity: 7,
      price: 48
    }),
    Product.create({
      name: 'Leather Overcoat',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400010464915_LIGHTPOPPY?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{fabrication: '100% leather', color: 'red'}],
      quantity: 7,
      price: 748
    }),
    Product.create({
      name: 'Leather A-line Skirt',
      imgUrl:
        'https://www.prada.com/content/dam/pradanux_products/5/517/51782/1XDAF0134/51782_1XDA_F0134_SLF.png/_jcr_content/renditions/cq5dam.web.white.1200.1500.webp',
      categoryId: 2,
      specs: [{fabrication: '100% leather', color: 'brown'}],
      quantity: 4,
      price: 248
    }),
    Product.create({
      name: 'Top Handle Bag',
      imgUrl:
        'https://cdn.modaoperandi.com/img/images/products/809791/429313/large_by-far-yellow-martin-2.jpg?_v=1604892580&h=1200&operation=resize&w=1400',
      specs: [{fabrication: '100% leather', color: 'butter yellow'}],
      price: 368,
      quantity: 10,
      categoryId: 2
    }),
    Product.create({
      name: 'Silk Blouse',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400013227557?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{fabrication: '100% silk', color: 'pink'}],
      quantity: 4,
      price: 328
    }),
    Product.create({
      name: 'Velvet Jacket',
      imgUrl:
        'https://n.io.nordstrommedia.com/id/sr3/9bcc57ce-c8e5-4ad0-a6f1-8f40573af34a.jpeg?crop=pad&pad_color=FFF&format=jpeg&w=780&h=1196&dpr=2',
      categoryId: 2,
      specs: [{fabrication: 'cotton', color: 'black'}],
      quantity: 4,
      price: 598
    }),
    Product.create({
      name: 'Wrap Cardigan',
      imgUrl:
        'https://cdn-static.debijenkorf.nl/INTERSHOP/static/WFS/dbk-shop-Site/-/dbk-shop/nl_BE/product-images/023/120/13_0231201854800000_pro_mod_frt_01_1108_1528_4518007.jpg',
      categoryId: 2,
      specs: [{fabrication: '100% cashmere', color: 'multi'}],
      quantity: 7,
      price: 348
    }),
    Product.create({
      name: 'Heart Earrings',
      imgUrl:
        'https://cdna.lystit.com/photos/olivela/65ce39db/lizzie-fortunato-MULTIPLE-Venice-Earrings.jpeg',
      categoryId: 2,
      specs: [{fabrication: 'gold plated sterline silver', color: 'green'}],
      quantity: 7,
      price: 198
    }),
    Product.create({
      name: 'Embellished Headband',
      imgUrl:
        'https://image.s5a.com/is/image/saks/0400012542892?wid=984&hei=1312&qlt=90&resMode=sharp2&op_usm=0.9,1.0,8,0',
      categoryId: 2,
      specs: [{}],
      quantity: 7,
      price: 198
    }),
    Product.create({
      name: 'Silver Cuff',
      imgUrl:
        'https://www.ross-simons.com/dw/image/v2/BCFL_PRD/on/demandware.static/-/Sites-lbh-master/default/dw97a79c72/images/jewelry-sterling-bracelets/827874.jpg?sw=700',
      categoryId: 2,
      specs: [{}],
      quantity: 4,
      price: 158
    }),
    Product.create({
      name: 'Patent Boot',
      imgUrl:
        'https://images.bloomingdalesassets.com/is/image/BLM/products/9/optimized/10971179_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$&fmt=webp',
      categoryId: 2,
      specs: [{fabrication: 'leather', color: 'black'}],
      quantity: 7,
      price: 648
    }),
    Product.create({
      name: 'Knit Flats',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0877/4986/products/018_Golden_Gingham_pdp_A.jpg?v=1599698277',
      categoryId: 2,
      specs: [{fabrication: 'knit', color: 'gold'}],
      quantity: 17,
      price: 158
    }),
    Product.create({
      name: 'Leather + Tortoise Bag',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1234/2092/products/LSHB003DN_MATINEEBEADEDSTRAP_DENIM_LSHB016RTO_PETITEDALLASBAG_TORTOISE_2000x.jpg?v=1584480105',
      categoryId: 2,
      specs: [{color: 'navy'}],
      quantity: 6,
      price: 328
    }),
    Product.create({
      name: 'Pearl Cosmetic Bag',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/1234/2092/products/1_c85295a8-9c2a-41a8-a120-39f7866f23b6_2000x.jpg?v=1604700521',
      categoryId: 3,
      specs: [{color: 'black'}],
      quantity: 11,
      price: 148
    }),
    Product.create({
      name: 'Metallic Detail Sneaker',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0049/9112/products/6dd9b0213404975cc920061124bbd0ba_1200x.jpg?v=1591797596',
      categoryId: 4,
      quantity: 10,
      price: 178
    }),
    Product.create({
      name: 'Cow Print Legging',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/zarat/zarat3053319fca/zarat3053319fca_q6_2-0._UX357_QL90_.jpg',
      categoryId: 4,
      quantity: 10,
      price: 98
    }),

    Product.create({
      name: 'Purple Legging',
      imgUrl:
        'https://m.media-amazon.com/images/G/01/Shopbop/p/prod/products/astel/astel3153818f6c/astel3153818f6c_q6_2-1._UX357_QL90_.jpg',
      categoryId: 4,
      quantity: 10,
      price: 118,
      specs: [{color: 'purple'}]
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
