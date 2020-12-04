import React, {Component} from 'react'
import {fetchProductFromServer} from '../../store/product'
import {addToOrderQuantityLocally} from '../../store/orderProduct'
import {connect} from 'react-redux'
import {me} from '../../store/user'
import './singleProductView.css'
const localStorage = window.localStorage

class SingleProductView extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      message: '',
      totalQuantity: 0
    }
    this.handleClickQuantity = this.handleClickQuantity.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    const {productId} = this.props.match.params
    console.log('productId', productId)
    await this.props.getProduct(+productId)
    await this.props.getUser()
  }

  handleClickQuantity(event) {
    this.setState({message: ''})
    console.log('event.target.value', event.target.value)
    const {value} = event.target
    console.log('this.state.quantity', this.state.quantity)
    if (value === '+' && this.state.quantity === this.props.product.quantity)
      return alert('Maximum quantity reached')
    if (value === '+') {
      this.setState({quantity: this.state.quantity + 1})
    } else if (value === '-' && this.state.quantity === 1) {
      return alert('Minimum quantity of 1')
    } else {
      this.setState({quantity: this.state.quantity - 1})
    }
  }

  handleAddToCart(event) {
    event.preventDefault()

    if (this.props.user.length === undefined) {
      console.log('added to bag:', this.state.quantity)

      //available units converted to an array to use in the select menu in bag component
      let available = []
      for (let i = 1; i <= this.props.product.quantity; i++) available.push(i)
      console.log('avail', available)

      //item to be added to localStorage
      let item = {
        name: this.props.product.name,
        id: this.props.product.id,
        quantity: this.state.quantity,
        price: this.props.product.price,
        imgUrl: this.props.product.imgUrl,
        available: available
      }

      //access the quantity in bag, if any
      let lineItem = localStorage.getItem(`${item.id}`)
        ? JSON.parse(localStorage.getItem(`${item.id}`)).quantity
        : 0

      console.log('lineItem', lineItem)
      console.log('line item > available', lineItem > available.length)
      if (lineItem >= +available.length) {
        lineItem = 0

        this.setState({
          message: `all ${
            this.props.product.quantity
          } available units are already in your bag. cannot add more units than available`
        })
      } else {
        //add the new quantity to the existing quantity
        item.quantity += +lineItem

        //set the item in localStorage, passing the JSON object as a string
        localStorage.setItem(`${item.id}`, JSON.stringify(item))

        //add the new quantity to the redux state, so component will update
        this.props.addToOrderQuantity(this.state.quantity)

        //message to notify user of success and reset
        this.setState({
          message: `${this.state.quantity} unit(s) sucessfully added to cart!`
        })
        this.setState({
          quantity: 1
        })
        setTimeout(() => this.setState({message: ''}), 1500)
      }
    } else {
      console.log('logged in')
    }
  }

  render() {
    console.log('this.props in single', this.props)
    return this.props.isLoading === true ? (
      <div>Loading...</div>
    ) : (
      <div className="single-view-entire-container">
        <div className="single-view-container">
          <div className="name-and-img">
            <div>{this.props.product.name}</div>
            <img className="single-view-img" src={this.props.product.imgUrl} />
          </div>
          <form className="details" onSubmit={this.handleAddToCart}>
            <div>${this.props.product.price}</div>
            {/* <div>specs here</div> */}
            <button id="add-to-bag" type="submit">
              add to bag
            </button>
            <div>
              <div>quantity: {this.state.quantity}</div>
              <button
                type="button"
                onClick={this.handleClickQuantity}
                value="+"
              >
                +
              </button>
              <button
                type="button"
                onClick={this.handleClickQuantity}
                value="-"
              >
                -
              </button>
              <div id="message">{this.state.message}</div>
            </div>
          </form>
        </div>
        {/* <div id="message">{this.state.message}</div> */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    product: state.product.product,
    isLoading: state.product.isLoading,
    user: state.user,
    quantity: state.orderProduct.quantity
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => dispatch(fetchProductFromServer(productId)),
    getUser: () => dispatch(me()),
    addToOrderQuantity: quantity =>
      dispatch(addToOrderQuantityLocally(quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleProductView)
