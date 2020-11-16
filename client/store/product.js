import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_IN_CATEGORY = 'GET_PRODUCTS_IN_CATEGORY'
const GET_PRODUCT = 'GET_PRODUCT'

//ACTION CREATORS
const getProducts = products => {
  return {
    type: 'GET_PRODUCTS',
    products
  }
}

const getProductsInCategory = products => {
  return {
    type: 'GET_PRODUCTS_IN_CATEGORY',
    products
  }
}

const getProduct = product => {
  return {
    type: 'GET_PRODUCT',
    product
  }
}

//THUNK CREATOR
export const fetchProductsFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProductsInCategoryFromServer = categoryName => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${categoryName}`)
    dispatch(getProductsInCategory(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProductFromServer = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/singleProduct/${productId}`)
    dispatch(getProduct(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(
  state = {products: [], product: {}, isLoading: true},
  action
) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case GET_PRODUCTS_IN_CATEGORY:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case GET_PRODUCT:
      return {
        ...state,
        isLoading: false,
        product: action.product
      }
    default:
      return state
  }
}
