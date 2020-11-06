import React from 'react'
import PropTypes from 'prop-types'
import { ShieldLockIcon } from '@primer/octicons-react'
import EmptyState from './../lib/EmptyState'

export default function PersonalDataArea (props) {
  return (
    <EmptyState light variant="info" text="Personal Data Area"
      customIcon={ShieldLockIcon} className="mt-3 mb-3">
      { props.children }
    </EmptyState>
  )
}

PersonalDataArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.nodes)
  ])
}
