import axios from 'axios'
import history from '../history'
import {getQuantity, getTotal} from '../functions/functions'

//ACTION TYPES
const ADD_TO_ORDER_QUANTITY = 'ADD_TO_ORDER_QUANTITY'
const SET_ORDER_QUANTITY = 'SET_ORDER_QUANTITY'
const GET_ORDER_TOTAL = 'GET_ORDER_TOTAL'
const CREATE_ORDER_PRODUCT = 'CREATE_ORDER_PRODUCT'

//ACTION CREATORS
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

const createOrderProduct = details => {
  return {
    type: CREATE_ORDER_PRODUCT,
    details
  }
}

//THUNK CREATOR
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

export const createOrderProductOnServer = details => async dispatch => {
  try {
    console.log('details in store', details)
    const {data} = await axios.post(`/api/orderProducts`, details)
    dispatch(createOrderProduct(data))
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
    total: 0,
    orderDetails: {}
  },
  action
) {
  switch (action.type) {
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
    case CREATE_ORDER_PRODUCT:
      return {
        ...state,
        orderDetails: action.details
      }
    default:
      return state
  }
}
