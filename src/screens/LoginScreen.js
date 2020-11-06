import React from 'react'
import Screen from './Screen'
import LoginForm from './../components/LoginForm'

export default class LoginScreen extends Screen {

  static title = 'Login'

  renderScreen () {
    return (
      <div className="container">
        <LoginForm />
      </div>
    )
  }
}
