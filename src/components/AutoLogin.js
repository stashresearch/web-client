import React from 'react'
import { connect } from 'react-redux'
import { USER_TYPE } from './../config/propTypes'
import history from './../history'

class AutoLogin extends React.Component {

  static propTypes = {
    user: USER_TYPE
  }

  autoLogin () {
    if (this.props.user != null) {
      history.push('/dashboard')
    }
  }

  componentDidMount () {
    this.autoLogin()
  }

  componentDidUpdate () {
    this.autoLogin()
  }

  render () {
    return null
  }
}

function mapState (state) {
  const { session: { user } } = state
  return { user }
}

export default connect(mapState)(AutoLogin)
