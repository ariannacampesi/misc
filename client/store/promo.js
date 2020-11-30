import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PROMOS = 'GET_PROMOS'

//ACTION CREATORS
const getPromos = promos => {
  return {
    type: 'GET_PROMOS',
    promos
  }
}

export const fetchPromosFromServer = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/promos`)
    dispatch(getPromos(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(
  state = {
    promos: []
  },
  action
) {
  switch (action.type) {
    case GET_PROMOS:
      return {
        ...state,
        isLoading: false,
        promos: action.promos
      }
    default:
      return state
  }
}
