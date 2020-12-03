import axios from 'axios'
import history from '../history'

//ACTION TYPES
const CREATE_ORDER = 'CREATE_ORDER'

//ACTION CREATORS
const createOrder = order => {
  return {
    type: 'CREATE_ORDER',
    order
  }
}

export const createOrderOnServer = () => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders`)
    dispatch(createOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(
  state = {
    order: {},
    isLoading: true
  },
  action
) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        isLoading: false,
        order: action.order
      }
    default:
      return state
  }
}
