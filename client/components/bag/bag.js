import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../../store/user'
const localStorage = window.localStorage
import './bag.css'
import Quantity from './quantity'
import {
  setOrderQuantityLocally,
  getOrderTotalLocally
} from '../../store/orderProduct'

class Bag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localStorage: []
    }
    this.getStorage = this.getStorage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    this.props.getOrderTotal()
    console.log('this.getStorage()', this.getStorage())
    this.setState({
      localStorage: this.getStorage(),
      updated: true,
      totalQuantity: this.getStorage()
        .map(element => +element[Object.keys(element)].quantity)
        .reduce((accum, curr) => accum + curr)
    })
  }

  getStorage() {
    const keys = Object.keys(localStorage)
    const values = Object.values(localStorage)
    let localStorageArr = []
    console.log('keys', keys)
    console.log('values', values)
    for (let num in keys) {
      let currValue = JSON.parse(values[num])
      localStorageArr.push({[keys[num]]: currValue})
    }
    return localStorageArr
  }

  handleClick(event) {
    const item = localStorage.getItem(event.target.value)
    const {quantity} = JSON.parse(item)

    localStorage.removeItem(event.target.value)

    this.props.setOrderQuantity(-quantity)
    this.props.getOrderTotal()

    this.setState({localStorage: this.getStorage()})
  }

  handleQuantityChange(event) {
    //extract the key and values from the target
    const {name, value} = event.target

    //access the value object and convert back to JSON obj
    let valueObj = JSON.parse(localStorage.getItem(name))
    const originalQty = valueObj.quantity

    //set the quantity value to the new quantity
    valueObj.quantity = value

    //find the difference between the original qty and the new qty
    const diff = +value - originalQty
    console.log('diff', diff)
    console.log('typeof diff', typeof diff)
    //convert the entire JSON obj back to string
    valueObj = JSON.stringify(valueObj)

    //set the item in localStorage
    localStorage.setItem(name, valueObj)

    this.props.setOrderQuantity(diff)
    this.props.getOrderTotal()

    this.setState({
      updated: !this.state.updated,
      localStorage: this.getStorage()
    })
  }

  render() {
    console.log('this.state in render', this.state)
    console.log('this.props in render', this.props.quantity)
    const storage = this.getStorage()
    console.log('storage', storage)

    return this.props.user.id === undefined ? (
      <div id="entire-bag">
        <div id="all-items">
          {storage.map((element, index) => (
            <div key={index} id="line-item-in-bag">
              <img id="line-img" src={element[Object.keys(element)].imgUrl} />
              <div>
                <div id="line-name">{element[Object.keys(element)].name}</div>
                {/* <div>product id: {Object.keys(element)}</div> */}
                <div>
                  quantity:{' '}
                  <select
                    defaultValue={element[Object.keys(element)].quantity}
                    onChange={this.handleQuantityChange}
                    name={element[Object.keys(element)].id}
                  >
                    {element[Object.keys(element)].available.map(num => (
                      <option key={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>unit price: ${element[Object.keys(element)].price}</div>
                <div>
                  total price: $
                  {element[Object.keys(element)].price *
                    element[Object.keys(element)].quantity}
                </div>
              </div>
              <button
                type="button"
                id="delete-button"
                value={Object.keys(element)}
                onClick={this.handleClick}
              >
                x
              </button>
            </div>
          ))}
        </div>
        {this.props.quantity === 0 ? (
          <div id="empty-container">
            <div>Your bag is ☹️.</div>
            <div>Make it 😁by adding some items!</div>
          </div>
        ) : (
          <div id="total-container">
            <div>total units: {this.props.quantity}</div>
            <div>total price: ${this.props.total}</div>
          </div>
        )}
      </div>
    ) : (
      <div>logged in</div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    isLoading: state.product.isLoading,
    user: state.user,
    quantity: state.orderProduct.quantity,
    total: state.orderProduct.total
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    setOrderQuantity: quantity => dispatch(setOrderQuantityLocally(quantity)),
    getOrderTotal: () => dispatch(getOrderTotalLocally())
  }
}

export default connect(mapState, mapDispatch)(Bag)
