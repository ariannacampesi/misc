import axios from 'axios'
import history from '../history'
import {getQuantity, getTotal} from '../functions/functions'

//ACTION TYPES
const GET_ORDER_PRODUCTS = 'GET_PRODUCTS'
const ADD_TO_ORDER_QUANTITY = 'ADD_TO_ORDER_QUANTITY'
const SET_ORDER_QUANTITY = 'SET_ORDER_QUANTITY'
const GET_ORDER_TOTAL = 'GET_ORDER_TOTAL'

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

const setOrderQuantity = quantityDiff => {
  return {
    type: SET_ORDER_QUANTITY,
    quantityDiff
  }
}

const getOrderTotal = total => {
  return {
    type: GET_ORDER_TOTAL,
    total
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

export const setOrderQuantityLocally = quantityDiff => dispatch => {
  try {
    dispatch(setOrderQuantity(+quantityDiff))
  } catch (err) {
    console.error(err)
  }
}

export const getOrderTotalLocally = () => dispatch => {
  try {
    const total = localStorage.length === 0 ? 0 : getTotal()
    dispatch(getOrderTotal(total))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(
  state = {
    orderProducts: [],
    quantity: localStorage.length === 0 ? 0 : +getQuantity(),
    isLoading: true,
    total: 0
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
    case SET_ORDER_QUANTITY:
      console.log('action.quantityDiff', action.quantityDiff)
      return {
        ...state,
        quantity: state.quantity + action.quantityDiff
      }
    case GET_ORDER_TOTAL:
      return {
        ...state,
        total: action.total
      }
    default:
      return state
  }
}
