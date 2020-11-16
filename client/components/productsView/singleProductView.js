import React, {Component} from 'react'
import {fetchProductFromServer} from '../../store/product'
import {connect} from 'react-redux'
import './singleProductView.css'

class SingleProductView extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleClickQuantity = this.handleClickQuantity.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    const {productId} = this.props.match.params
    console.log('productId', productId)
    await this.props.getProduct(+productId)
  }

  handleClickQuantity(event) {
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
    console.log('added to bag:', this.state.quantity)
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
          <button type="button" onClick={this.handleAddToCart}>
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
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapState', state.product)
  return {
    product: state.product.product,
    isLoading: state.product.isLoading
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: productId => dispatch(fetchProductFromServer(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProductView)
