import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ShieldIcon, InfoIcon } from '@primer/octicons-react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

export default function NeedRecoveryButton ({ showText, placement, ...props }) {

  return (
    <OverlayTrigger
      placement={ placement }
      overlay={
        <Popover id="popover-positioned-bottom">
          <Popover.Title as="h3">
            <InfoIcon className="mr-2" verticalAlign="middle" />
            Project needs recovery
          </Popover.Title>
          <Popover.Content>
            This project was encrypted with an old password,
            you should update your encryption keys to be up-to-date with your new password
          </Popover.Content>
        </Popover>
      }>

      <Link className="btn btn-link text-warning"
        to="/projects/recovery"
        onClick={ () => null } { ...props } >
        { showText && 'needs recovery '}<ShieldIcon />
      </Link>
    </OverlayTrigger>
  )
}

NeedRecoveryButton.propTypes = {
  showText: PropTypes.bool,
  placement: PropTypes.oneOf([
    'top', 'left', 'right', 'bottom'
  ])
}

NeedRecoveryButton.defaultProps = {
  showText: false,
  placement: 'left'
}
