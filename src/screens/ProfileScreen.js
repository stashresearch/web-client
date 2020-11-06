import React from 'react'
import Screen from './Screen'
import Profile from './../components/Profile'

export default class ProfileScreen extends Screen {

  static title = 'Profile'

  renderScreen () {
    const { handle } = this.props.match.params
    return (
      <div className="container">
        <Profile handle={ handle } />
      </div>
    )
  }
}
