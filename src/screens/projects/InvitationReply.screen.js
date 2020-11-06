import React from 'react'
import Screen from './../Screen'
import EmptyState from './../../components/lib/EmptyState'

export default class InvitationReplyScreen extends Screen {

  static title = 'Invitation'

  renderScreen () {
    return (
      <div className="container">
        <EmptyState noBorder text="Invitation" subText="coming soon" />
      </div>
    )
  }
}
