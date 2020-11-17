import React, {Component} from 'react'
import {fetchProductFromServer} from '../../store/product'
import {connect} from 'react-redux'
import {me} from '../../store/user'
import './singleProductView.css'
const localStorage = window.localStorage

class SingleProductView extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      message: ''
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

  handleAddToCart() {
    // see if they are logged in
    // if they are logged in, add everything to database
    // if they are a guest, add to localStorage
    if (this.props.user.length === undefined) {
      console.log('added to bag:', this.state.quantity)
      let item = {
        name: this.props.product.name,
        id: this.props.product.id,
        quantity: this.state.quantity
      }
      let lineItem = localStorage.getItem(`${item.id}`)
        ? localStorage.getItem(`${item.id}`)
        : 0
      console.log('lineItem', lineItem)
      localStorage.setItem(`${item.id}`, +item.quantity + +lineItem)
      console.log('localStorage', localStorage)
      this.setState({
        message: `${this.state.quantity} units sucessfully added to cart!`
      })
      this.setState({quantity: 1})
    } else {
      console.log('logged in')
    }
  }

  render() {
    return this.props.isLoading === true ? (
      <div>Loading.../</div>
    ) : (
      <div className="single-view-container">
        <div className="name-and-img">
          <div>{this.props.product.name}</div>
          <img className="single-view-img" src={this.props.product.imgUrl} />
        </div>
        <div className="details">
          <div>${this.props.product.price}</div>
          <div>specs here</div>
          <button id="add-to-bag" type="button" onClick={this.handleAddToCart}>
            add to bag
          </button>
          <div>
            <div>quantity: {this.state.quantity}</div>
            <button type="button" onClick={this.handleClickQuantity} value="+">
              +
            </button>
            <button type="button" onClick={this.handleClickQuantity} value="-">
              -
            </button>
          </div>
        </div>
        {this.state.message === '' ? (
          <div>{}</div>
        ) : (
          <div id="message">{this.state.message}</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    product: state.product.product,
    isLoading: state.product.isLoading,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => dispatch(fetchProductFromServer(productId)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(SingleProductView)
