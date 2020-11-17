import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_ORDER_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATORS
const getOrderProducts = products => {
  return {
    type: 'GET_ORDER_PRODUCTS',
    products
  }
}

//THUNK CREATOR
export const fetchOrderProductsFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products`)
    dispatch(getOrderProducts(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = {orderProducts: [], isLoading: true}, action) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    default:
      return state
  }
}
