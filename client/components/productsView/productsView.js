import React, {Component} from 'react'
import {fetchProductsInCategoryFromServer} from '../../store/product'
import {connect} from 'react-redux'
import './productsView.css'
import {SingleProductView} from '../index'
import {Link} from 'react-router-dom'

class ProductsView extends Component {
  componentDidMount() {
    console.log('this.props', this.props)
    let category = this.props.props.match.path.split('')
    category.shift()
    category = category.join('')
    console.log('category', category)
    this.props.getProducts(category)
  }

  render() {
    if (this.props.isLoading === true) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="all-products">
          {this.props.products.map(product => (
            <Link key={product.name} to={`/singleProduct/${product.id}`}>
              <div
                className="single-product-container"
                key={product.id}
                onClick={this.handleClick}
                product={product.id}
              >
                <img className="product" src={product.imgUrl} />
                <div>{product.name}</div>
                <div>{product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      )
    }
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

export default connect(mapState, mapDispatch)(ProductsView)
