/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar/navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Bag} from './bag/bag'
export {default as ProductsView} from './productsView/productsView'
export {default as Home} from './home/home'
export {default as Fashion} from './productsView/fashion'
export {default as Food} from './productsView/food'
export {default as Beauty} from './productsView/beauty'
export {default as Active} from './productsView/active'
export {default as SingleProductView} from './productsView/singleProductView'
