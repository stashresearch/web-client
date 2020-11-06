import React from 'react'
import PropTypes from 'prop-types'
import {
  AlertIcon, InfoIcon, CheckCircleIcon, StopIcon, HubotIcon
} from '@primer/octicons-react'
import { Link } from 'react-router-dom'

export default function EmptyState ({
  variant, text, action, actionText, customIcon, subText, className, noBorder,
  children, light,
  ...props
}) {

  let Icon = customIcon || HubotIcon
  const klass = variant
  const textKlass = light ? `text-${klass}` : ''
  const wrapperKlass = `empty-state alert-${klass} ` +
    `${noBorder ? 'no-border' : ''} ${className || ''}`

  if (customIcon == null) {
    switch (variant) {
      case 'warning':
        Icon = AlertIcon
        break
      case 'info':
        Icon = InfoIcon
        break
      case 'success':
        Icon = CheckCircleIcon
        break
      case 'danger':
        Icon = StopIcon
        break
    }
  }

  return (
    <div className={wrapperKlass} {...props}>
      <Icon size="large" className={`mb-3 ${textKlass}`} />
      <div className={`empty-state-text ${textKlass}`}>{ text }</div>
      { subText && (
        <div className="empty-state-subtext">{ subText }</div>
      )}
      { children }
      { action && (
        <Link to={action} className={`btn btn-wide small-caps btn-${klass} mt-4`}>
          {actionText || ''}
        </Link>
      ) }
    </div>
  )
}

EmptyState.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  subText: PropTypes.string,
  action: PropTypes.string,
  actionText: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'info',
    'warning',
    'danger',
    'success'
  ]),
  customIcon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  noBorder: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  // brighter text (text-<variant>)
  light: PropTypes.bool
}

EmptyState.defaultProps = {
  variant: 'primary',
  noBorder: false,
  light: false
}
