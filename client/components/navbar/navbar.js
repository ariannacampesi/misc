import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div id="logo">
      <a href="/">miscellaneous</a>
      <div id="subtitle">*a curated collection*</div>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="links">
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
          <Link to="/gifts" id="new">
            new
          </Link>
          {/* <Link to="/gifts">gifts</Link> */}
          <Link to="/home" id="home">
            home
          </Link>
          <Link to="/fashion" id="fashion">
            fashion
          </Link>
          <Link to="/food" id="food">
            food
          </Link>
          <Link to="/beauty" id="beauty">
            beauty
          </Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
