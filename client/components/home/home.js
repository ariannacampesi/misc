import React, {Component} from 'react'
import './home.css'
import Gifting from '../gifting/gifting'
import {fetchProductsFromServer} from '../../store/product'
import {connect} from 'react-redux'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      priceSelection: false,
      filteredProducts: [],
      title: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    this.props.getAllProducts()
  }

  handleClick(event) {
    const message =
      +event.target.id <= 300 ? `gifts under $${event.target.id}` : `all gifts`
    const filteredProducts = this.props.allProducts.filter(
      product => product.price <= event.target.id
    )
    console.log('filteredProducts', filteredProducts)
    this.setState({
      filteredProducts: filteredProducts,
      priceSelection: !this.state.priceSelection,
      title: message
    })
  }

  render() {
    return !this.state.priceSelection ? (
      <div id="homepage">
        <div id="main">
          <div className="main">it's that time of year!</div>
          <div className="main">shop gifts for every budget</div>
        </div>
        <div id="star-container">
          <div id="star">
            <i className="star__part" />
          </div>
        </div>
        <div className="prices">
          <div id="25" onClick={this.handleClick}>
            under $25
          </div>
        </div>
        <div className="prices" id="tier-2">
          <div id="50" onClick={this.handleClick}>
            under $50
          </div>
          <div id="75" onClick={this.handleClick}>
            under $75
          </div>
        </div>
        <div className="prices" id="tier-3">
          <div id="100" onClick={this.handleClick}>
            under $100
          </div>
          <div id="200" onClick={this.handleClick}>
            under $200
          </div>
          <div id="300" onClick={this.handleClick}>
            under $300
          </div>
        </div>
        <div className="prices">
          <div id="10000000" onClick={this.handleClick} className="shop-all">
            shop all
          </div>
        </div>
      </div>
    ) : (
      <Gifting
        products={this.state.filteredProducts}
        title={this.state.title}
      />
    )
  }
}

const mapState = state => {
  console.log('state in mapState', state.product)
  return {
    isLoading: state.product.isLoading,
    allProducts: state.product.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(Home)
