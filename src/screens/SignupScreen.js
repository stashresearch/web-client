import React from 'react'
import Screen from './Screen'
import SignupForm from './../components/SignupForm'

export default class SignupScreen extends Screen {

  static title = 'Signup'

  renderScreen () {
    return (
      <div className="container">
        <h2 align="center">Register to StashResearch</h2>
        <SignupForm />
      </div>
    )
  }
}
