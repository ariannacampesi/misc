import axios from 'axios'
import history from '../history'
import {getQuantity} from '../functions/functions'

//ACTION TYPES
const GET_ORDER_PRODUCTS = 'GET_PRODUCTS'
const ADD_TO_ORDER_QUANTITY = 'ADD_TO_ORDER_QUANTITY'

//ACTION CREATORS
const getOrderProducts = products => {
  return {
    type: GET_ORDER_PRODUCTS,
    products
  }
}

const addToOrderQuantity = quantity => {
  return {
    type: ADD_TO_ORDER_QUANTITY,
    quantity
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

export const addToOrderQuantityLocally = quantity => dispatch => {
  try {
    dispatch(addToOrderQuantity(quantity))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(
  state = {
    orderProducts: [],
    quantity: localStorage.length === 0 ? 0 : getQuantity(),
    isLoading: true
  },
  action
) {
  switch (action.type) {
    case GET_ORDER_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case ADD_TO_ORDER_QUANTITY:
      return {
        ...state,
        quantity: state.quantity + +action.quantity
      }
    default:
      return state
  }
}
