import React, {Component} from 'react'
import {
  fetchProductsInCategoryFromServer,
  fetchProductsFromServer
} from '../../store/product'
import {connect} from 'react-redux'
import './productsView.css'
import {SingleProductView} from '../index'
import {Link} from 'react-router-dom'

class ProductsView extends Component {
  constructor() {
    super()
    this.state = {
      category: '',
      sortValue: '',
      products: []
    }
    this.handleProductSort = this.handleProductSort.bind(this)
  }

  async componentDidMount() {
    console.log('this.props', this.props)
    if (this.props.props) {
      let category = this.props.props.match.path.split('')
      category.shift()
      category = category.join('')
      console.log('category', category)
      this.setState({category: category})
      await this.props.getProducts(category)
      this.setState({products: this.props.products})
    } else {
      this.setState({
        products: this.props.filteredProducts,
        category: this.props.title
      })
    }
  }

  handleProductSort(event) {
    this.setState({sortValue: event.target.value})
  }
  render() {
    if (this.props.isLoading === true) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <div>
            <h1 id="section-header">{this.state.category}</h1>
            <div className="sort">
              <label>sort by</label>
              <select name="sortValue" onChange={this.lampHandleSort}>
                {/* <option value="all">All</option> */}
                <option value="a-z">name, a-z</option>
                <option value="z-a">name, z-a</option>
                <option value="low-to-high">price, low to high</option>
                <option value="high-to-low">price, high to low</option>
              </select>
            </div>
          </div>
          <div className="all-products">
            {this.state.products.map(product => (
              <Link key={product.name} to={`/singleProduct/${product.id}`}>
                <div
                  className="single-product-container"
                  key={product.id}
                  onClick={this.handleClick}
                  product={product.id}
                >
                  <img className="product" src={product.imgUrl} />
                  <div className="product-name">{product.name}</div>
                  <div className="price">${product.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  console.log('state in mapState', state.product)
  return {
    products: state.product.products,
    isLoading: state.product.isLoading,
    allProducts: state.product.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: categoryName =>
      dispatch(fetchProductsInCategoryFromServer(categoryName)),
    getAllProducts: () => dispatch(fetchProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(ProductsView)
