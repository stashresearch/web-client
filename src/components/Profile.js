import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import fetchProfile from './../actions/fetchProfile.action'
import Loading from './Loading'

class Profile extends React.Component {

  static propTypes = {
    handle: PropTypes.string.isRequired,
    profile: PropTypes.any, // TODO profile type
    fetchProfile: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.profile == null) {
      const { handle } = this.props
      this.props.fetchProfile({ handle })
    }
  }

  render () {
    const { profile } = this.props
    if (profile == null) {
      return <Loading />
    }
    return (
      <div>
        <Gravatar email={profile.email} size={100} alt="profile picture" />
        { profile.firstName } { profile.lastName }
      </div>
    )
  }
}

function mapState (state, props) {
  const { profiles } = state
  const profile = profiles[props.handle]
  return { profile }
}

const actionCreators = {
  fetchProfile
}

export default connect(mapState, actionCreators)(Profile)
