import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToOrderQuantityLocally} from '../../store/orderProduct'
import {getQuantity} from '../../functions/functions'

class Quantity extends Component {
  render() {
    console.log('this.props in quantity', this.props)
    if (localStorage.length === 0) return <div id="quantity">(0)</div>
    if (this.props.quantity === 0)
      return <div id="quantity">{getQuantity()}</div>
    return <div id="quantity">{this.props.quantity}</div>

    // return localStorage.length === 0 ? (
    //   <div id="quantity">{0}</div>
    // ) : (
    //   <div id="quantity">{this.props.quantity}</div>
    // )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    quantity: state.orderProduct.quantity
  }
}

const mapDispatch = dispatch => {
  return {
    addToOrderQuantity: quantity =>
      dispatch(addToOrderQuantityLocally(quantity))
  }
}

export default connect(mapState, mapDispatch)(Quantity)
