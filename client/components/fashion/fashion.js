import React, {Component} from 'react'
import {fetchProductsInCategoryFromServer} from '../../store/product'
import {connect} from 'react-redux'
import './fashion.css'

class Fashion extends Component {
  async componentDidMount() {
    await this.props.getProducts('fashion')
  }

  render() {
    console.log('this.props', this.props)
    return this.props.isLoading === true ? (
      <div>loading...</div>
    ) : (
      <div className="all-products">
        {this.props.products.map(product => (
          <div className="single-product-container" key={product.id}>
            <img className="product" src={product.imgUrl} />
            <div>{product.name}</div>
            <div>{product.price}</div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in mapState', state.product)
  return {
    products: state.product.products,
    isLoading: state.product.isLoading
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: categoryName =>
      dispatch(fetchProductsInCategoryFromServer(categoryName))
  }
}

export default connect(mapState, mapDispatch)(Fashion)
