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
  }

  async componentDidMount() {
    await this.props.getUser()
    this.setState({localStorage: this.getStorage()})
  }

  getStorage() {
    const keys = Object.keys(localStorage)
    const values = Object.values(localStorage)
    let localStorageArr = []
    for (let num in keys) localStorageArr.push({[keys[num]]: values[num]})
    return localStorageArr
  }

  handleClick(event) {
    localStorage.removeItem(event.target.value)
    this.setState({localStorage: this.getStorage()})
  }

  render() {
    console.log('this.state in render', this.state)
    const storage = this.getStorage()
    console.log('storage', storage)
    return this.props.user.id === undefined ? (
      <div id="entire-bag">
        {storage.map((element, index) => (
          <div key={index} id="line-item-in-bag">
            <img
              id="line-img"
              src={JSON.parse(element[Object.keys(element)]).imgUrl}
            />
            <div>
              <div id="line-name">
                {JSON.parse(element[Object.keys(element)]).name}
              </div>
              {/* <div>product id: {Object.keys(element)}</div> */}
              <div>
                quantity:{' '}
                <select>
                  <option>
                    {JSON.parse(element[Object.keys(element)]).quantity}
                  </option>
                </select>
              </div>
              <div>
                unit price: ${JSON.parse(element[Object.keys(element)]).price}
              </div>
              <div>
                total price: $
                {JSON.parse(element[Object.keys(element)]).price *
                  JSON.parse(element[Object.keys(element)]).quantity}
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
        <div>TOTAL HERE</div>
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
