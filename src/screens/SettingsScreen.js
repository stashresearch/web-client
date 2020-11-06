import React from 'react'
import Screen from './Screen'
import SettingsForm from './../components/SettingsForm'

export default class SettingsScreen extends Screen {

  static title = 'Settings'

  renderScreen () {
    return (
      <div className="container">
        <SettingsForm />
      </div>
    )
  }
}
