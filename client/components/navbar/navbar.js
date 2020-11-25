import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'
import bag from '../../images/shopping-bag.png'
import Quantity from '../bag/quantity'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const [active, setActive] = useState('')

  return (
    <div>
      {!isLoggedIn ? (
        <div className="account-details">
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
          <Link to="/bag">
            <div id="shopping-bag-icon">
              <img id="bag" src={bag} />
              <Quantity />
            </div>
          </Link>
        </div>
      ) : (
        <div className="account-details">
          <div>welcome back, {user.email}!</div>
          <a href="#" onClick={handleClick}>
            logout
          </a>
          <Link to="/bag">
            <div id="shopping-bag-icon">
              <img id="bag" src={bag} />
              <div id="quantity">({1})</div>
            </div>
          </Link>
        </div>
      )}
      <div id="navbar">
        <div id="logo-and-links">
          <div id="logo">
            <a href="/">miscellaneous</a>
            <div id="subtitle">*a curated collection of random goods*</div>
          </div>
          <nav>
            <div className="links">
              {/* The navbar will show these links after you log in */}
              {/* <Link to="/gifts" id="new">
                new
              </Link> */}
              {/* <Link to="/gifts">gifts</Link> */}
              <Link
                onClick={() => setActive('home-active')}
                to="/home"
                id="home"
                className={(active === 'home-active').toString()}
              >
                home+gifts
              </Link>
              <Link
                onClick={() => setActive('fashion-active')}
                to="/fashion"
                id="fashion"
                className={(active === 'fashion-active').toString()}
              >
                fashion
              </Link>
              {/* <Link to="/food" id="food">
            food
          </Link> */}
              <Link
                to="/beauty"
                id="beauty"
                onClick={() => setActive('beauty-active')}
                className={(active === 'beauty-active').toString()}
              >
                bath+beauty
              </Link>
              <Link
                to="/active"
                id="active"
                onClick={() => setActive('active-active')}
                className={(active === 'active-active').toString()}
              >
                active
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
