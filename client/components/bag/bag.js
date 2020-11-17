import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../../store/user'
const localStorage = window.localStorage

class Bag extends Component {
  constructor() {
    super()
    this.state = {
      localStorage: []
    }
    this.getStorage = this.getStorage.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    console.log('this.props', this.props)
  }

  getStorage() {
    const keys = Object.keys(localStorage)
    const values = Object.values(localStorage)
    let localStorageArr = []
    for (let num in keys) localStorageArr.push({[keys[num]]: values[num]})
    return localStorageArr
  }

  render() {
    const storage = this.getStorage()
    console.log('storage', storage)
    return this.props.user.id === undefined ? (
      <div>
        {storage.map((element, index) => (
          <div key={index}>
            <div>product id: {Object.keys(element)}</div>
            <div>quantity: {element[Object.keys(element)]}</div>
          </div>
        ))}
      </div>
    ) : (
      <div>logged in</div>
    )
  }
}

const mapState = state => {
  console.log('state in mapstate', state)
  return {
    isLoading: state.product.isLoading,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Bag)
