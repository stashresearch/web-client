import React from 'react'
import { Link } from 'react-router-dom'
import Screen from './Screen'
import AutoLogin from './../components/AutoLogin'

export default class HomeScreen extends Screen {

  renderScreen () {
    const klass = 'btn btn-primary small-caps btn-wide'
    return (
      <div className="container">
        <AutoLogin />
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Link to="/signup" className={`${klass} mr-3`}>Register</Link>
          <Link to="/login" className={`${klass} ml-3`}>Login</Link>
        </div>
      </div>
    )
  }
}
