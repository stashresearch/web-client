import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'react-bootstrap'
import history from './../../history'

function onClick (to, e) {
  e.preventDefault()
  history.push(to)
}

export default function Breadcrumbs ({ breadcrumbs, ...props }) {

  if (breadcrumbs && breadcrumbs.length > 0) {
    return (
      <Breadcrumb>
        { breadcrumbs.map((b, i) => (
          <Breadcrumb.Item key={i} href={ b.to } onClick={ onClick.bind(null, b.to) }
            active={i === breadcrumbs.length - 1}>{ b.label }</Breadcrumb.Item>
        )) }
      </Breadcrumb>
    )
  }
  return null
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string
    })
  )
}
