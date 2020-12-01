import React from 'react'
import './home.css'

const Home = () => {
  return (
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
        <div>under $25</div>
      </div>
      <div className="prices" id="tier-2">
        <div>under $50</div>
        <div>under $75</div>
      </div>
      <div className="prices" id="tier-3">
        <div>under $100</div>
        <div>under $150</div>
        <div>splurge</div>
      </div>
      <div className="prices">
        <div id="shop-all">shop all</div>
      </div>
    </div>
  )
}

export default Home
