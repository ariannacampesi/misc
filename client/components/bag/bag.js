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
import {createOrderOnServer} from '../../store/order'
import {createOrderProductOnServer} from '../../store/orderProduct'
import {fetchPromosFromServer} from '../../store/promo'

class Bag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      localStorage: [],
      calculatedDiscount: 0,
      discount: 0,
      promoMessage: '',
      salesTax: 0.15,
      shipping: 5.99,
      checkout: false
    }
    this.getStorage = this.getStorage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handlePromoSubmit = this.handlePromoSubmit.bind(this)
    this.handlePromoChange = this.handlePromoChange.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    this.props.getOrderTotal()
    this.props.getPromos()
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
      localStorage: this.getStorage(),
      calculatedDiscount: this.state.discount * this.props.total
    })
  }

  handlePromoChange(event) {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({promo: event.target.value})
  }

  handlePromoSubmit(event) {
    event.preventDefault()
    // check to see if the promo is active
    const foundPromo = this.props.promos.find(
      element => element.code.toLowerCase() === this.state.promo.toLowerCase()
    )
    // if active, apply it to the total
    // if expired, show message saying not active
    if (foundPromo !== undefined) {
      const discount =
        foundPromo.discount < 1
          ? this.props.total * foundPromo.discount
          : foundPromo.discount
      this.setState({
        discount: foundPromo.discount,
        calculatedDiscount: +discount,
        promo: '',
        promoMessage: 'promo successfully applied'
      })
    } else {
      this.setState({promo: '', promoMessage: 'invalid promo code'})
    }
  }

  async handleCheckout() {
    const orderDetails = this.getStorage().map(
      lineItem => lineItem[Object.keys(lineItem)]
    )
    await this.props.createOrderProduct(orderDetails)

    localStorage.clear()
    this.props.setOrderQuantity(-this.props.quantity)
    this.setState({checkout: true, localStorage: []})
  }

  render() {
    console.log('this.state in render', this.state)
    console.log('this.props in render', this.props.quantity)
    const storage = this.getStorage()
    console.log('storage', storage)

    if (this.state.checkout === true) {
      return (
        <div id="entire-bag">
          <div id="empty-container">Thank you for shopping with us!</div>
        </div>
      )
    }

    if (this.props.quantity === 0) {
      return (
        <div id="entire-bag">
          <div id="empty-container">
            <div>Your bag is ☹️.</div>
            <div>Make it 😁by adding some items!</div>
          </div>
        </div>
      )
    } else if (this.props.user.id === undefined) {
      return (
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
                  {element[Object.keys(element)].available.length < 5 ? (
                    <div id="low-stock-notification">
                      hurry! only a few left.
                    </div>
                  ) : (
                    <div />
                  )}
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
          <div id="total-container">
            <div id="bag-details">bag details</div>
            <div id="units-and-price">
              <div id="total-details">
                <div className="total-group">
                  <div>total units </div>
                  <div>{this.props.quantity}</div>
                </div>
                <div className="total-group">
                  <div>subtotal </div>
                  <div>${this.props.total}</div>
                </div>
                <div className="total-group">
                  <div>discounts</div>
                  <div
                    className={
                      this.state.calculatedDiscount !== 0
                        ? 'discount'
                        : 'no-discount'
                    }
                  >
                    -${Math.ceil(this.state.calculatedDiscount)}
                  </div>
                </div>
                <div className="total-group">
                  <div>sales tax </div>
                  <div>
                    ${Math.ceil(this.state.salesTax * this.props.total)}
                  </div>
                </div>
                <div className="total-group">
                  <div>shipping </div>
                  <div>${this.state.shipping}</div>
                </div>
              </div>
              <div className="total-group">
                <div>grand total </div>
                <div>
                  $
                  {Math.ceil(
                    this.props.total +
                      this.state.salesTax * this.props.total +
                      this.state.shipping -
                      this.state.calculatedDiscount
                  )}
                </div>
              </div>
            </div>
            <div id="promo-container">
              <form id="promo" onSubmit={this.handlePromoSubmit}>
                <label>promo code</label>
                <input
                  name="promo"
                  value={this.state.promo}
                  onChange={this.handlePromoChange}
                />
                <button type="submit">apply</button>
              </form>
              <div id="promo-message">{this.state.promoMessage}</div>
            </div>
            <div>
              <button
                id="checkout-button"
                type="button"
                onClick={this.handleCheckout}
              >
                checkout
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>logged in</div>
    }
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    isLoading: state.product.isLoading,
    user: state.user,
    quantity: state.orderProduct.quantity,
    total: state.orderProduct.total,
    promos: state.promo.promos,
    order: state.order.order,
    orderDetails: state.orderProduct.orderDetails
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    setOrderQuantity: quantity => dispatch(setOrderQuantityLocally(quantity)),
    getOrderTotal: () => dispatch(getOrderTotalLocally()),
    getPromos: () => dispatch(fetchPromosFromServer()),
    createOrder: () => dispatch(createOrderOnServer()),
    createOrderProduct: details => dispatch(createOrderProductOnServer(details))
  }
}

export default connect(mapState, mapDispatch)(Bag)
