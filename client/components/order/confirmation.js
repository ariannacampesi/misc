import React, {Component} from 'react'
import './confirmation.css'
import {fetchProductsFromServer} from '../../store/product'
import {connect} from 'react-redux'

class Confirmation extends Component {
  constructor() {
    super()
    this.state = {
      productsInOrder: []
    }
    this.getQuantity = this.getQuantity.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()

    const ids = this.props.props.map(item => item.productId)
    const productsInOrder = ids.map(id =>
      this.props.products.find(product => product.id === id)
    )

    this.setState({productsInOrder: productsInOrder})
    console.log('productsInOrder', productsInOrder)
  }

  getQuantity(id) {
    return this.props.props.find(item => item.productId === id).quantity
  }

  render() {
    const {props} = this.props
    return (
      <div id="entire-bag">
        <div id="order-confirmation">
          <div id="confirmation-header" className="order-confirmation">
            <div>Thank you for shopping with us!</div>
            <div>Order No. {props[0].orderId}</div>
            <div>Order Total: ${this.props.total}</div>
          </div>
          <div id="details">
            {this.state.productsInOrder.map(product => (
              <div className="line-item-container" key={product}>
                <div>{product.name}</div>
                <img src={product.imgUrl} />
                <div>unit price: ${product.price}</div>
                <div>quantity: {this.getQuantity(product.id)}</div>
                <div>
                  line total: ${this.getQuantity(product.id) * product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    isLoading: state.product.isLoading,
    user: state.user,
    products: state.product.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    // getUser: () => dispatch(me()),
    getProducts: () => dispatch(fetchProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(Confirmation)
