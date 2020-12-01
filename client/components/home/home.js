import React from 'react'
import './home.css'

const Home = () => {
  return (
    <div id="homepage">
      <div className="main">it's that time of year!</div>
      <div className="main">shop gifts for every budget</div>
      <div id="star">
        <i className="star" />
      </div>
      <div className="prices">
        <div>under $25</div>
      </div>
      <div className="prices" id="tier-2">
        <div>
          <a>under $50</a>
        </div>
        <div>
          <a>under $75</a>
        </div>
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
