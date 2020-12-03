import React from 'react'
import './confirmation.css'

const Confirmation = props => {
  console.log('props.props', props.props)
  return (
    <div id="entire-bag">
      <div id="order-confirmation">
        <div id="confirmation-header" className="order-confirmation">
          <div>Thank you for shopping with us!</div>
          <div>Order No. {props.props[0].orderId}</div>
        </div>
        <div id="details">
          {props.props.map(product => (
            <div key={product}>
              <div>id: {product.productId}</div>
              <div>quantity: {product.quantity}</div>
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Confirmation
