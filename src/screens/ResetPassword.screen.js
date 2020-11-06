import React from 'react'
import Screen from './Screen'
import StartReset from '../components/passwordReset/StartReset'
import ResetForm from '../components/passwordReset/ResetForm'

export default class ResetPasswordScreen extends Screen {

  renderScreen () {
    const { token } = this.props.match.params
    if (token == null) {
      return (<div className="container"><StartReset /></div>)
    }
    return (
      <div className="container">
        <ResetForm resetToken={ token } />
      </div>
    )
  }
}
