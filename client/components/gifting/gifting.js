import React, {Component} from 'react'
import ProductsView from '../productsView/productsView'

class Gifting extends Component {
  render() {
    console.log('this.props.products in Gifting', this.props)
    return (
      <ProductsView
        filteredProducts={this.props.products}
        title={this.props.title}
      />
    )
  }
}

export default Gifting
