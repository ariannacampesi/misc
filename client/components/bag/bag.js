import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../../store/user'
const localStorage = window.localStorage
import './bag.css'

class Bag extends Component {
  constructor() {
    super()
    this.state = {
      localStorage: []
    }
    this.getStorage = this.getStorage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    console.log('this.getStorage()', this.getStorage())
    this.setState({
      localStorage: this.getStorage(),
      updated: true
    })
  }

  getStorage() {
    const keys = Object.keys(localStorage)
    const values = Object.values(localStorage)
    let localStorageArr = []
    console.log('keys', keys)
    console.log('values', values)
    for (let num in keys) {
      let currValue = JSON.parse(values[num])
      localStorageArr.push({[keys[num]]: currValue})
    }
    return localStorageArr
  }

  handleClick(event) {
    localStorage.removeItem(event.target.value)
    this.setState({localStorage: this.getStorage()})
  }

  handleQuantityChange(event) {
    //extract the key and values from the target
    const {name, value} = event.target

    //access the value object and convert back to JSON obj
    let valueObj = JSON.parse(localStorage.getItem(name))

    //set the quantity value to the new quantity
    valueObj.quantity = value

    //convert the entire JSON obj back to string
    valueObj = JSON.stringify(valueObj)

    //set the item in localStorage
    localStorage.setItem(name, valueObj)
    this.setState({updated: !this.state.updated})
  }

  render() {
    console.log('this.state in render', this.state)
    const storage = this.getStorage()
    console.log('storage', storage)

    return this.props.user.id === undefined ? (
      <div id="entire-bag">
        {storage.map((element, index) => (
          <div key={index} id="line-item-in-bag">
            <img id="line-img" src={element[Object.keys(element)].imgUrl} />
            <div>
              <div id="line-name">{element[Object.keys(element)].name}</div>
              {/* <div>product id: {Object.keys(element)}</div> */}
              <div>
                quantity:{' '}
                <select
                  defaultValue={element[Object.keys(element)].quantity}
                  onChange={this.handleQuantityChange}
                  name={element[Object.keys(element)].id}
                >
                  {element[Object.keys(element)].available.map(num => (
                    <option key={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div>unit price: ${element[Object.keys(element)].price}</div>
              <div>
                total price: $
                {element[Object.keys(element)].price *
                  element[Object.keys(element)].quantity}
              </div>
            </div>
            <button
              type="button"
              id="delete-button"
              value={Object.keys(element)}
              onClick={this.handleClick}
            >
              x
            </button>
          </div>
        ))}
        <div>TOTAL ITEMS</div>
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
