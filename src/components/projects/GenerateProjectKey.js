import React from 'react'
import PropTypes from 'prop-types'
import Loading from './../Loading'

class GenerateProjectKey extends React.Component {

  static propTypes = {
    ...React.Component.propTypes,
    generateKey: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      generating: true
    }
  }

  componentDidMount () {
    this.props.generateKey().then(() => {
      this.setState({ generating: false })
    }).catch((e) => {
      console.error(e)
      // TODO handle error
    })
  }

  render () {
    if (this.state.generating) {
      return <Loading />
    } else {
      return this.props.children
    }
  }
}

export default GenerateProjectKey
