import React from 'react'
import PropTypes from 'prop-types'

export default function Details (props) {

  const [open, setOpen] = React.useState(props.open)

  function toggleOpen (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    }
    setOpen(!open)
  }

  function handleKey (e) {
    console.log(e)
    if (['Enter', 'return'].includes(e.key)) {
      toggleOpen(e)
    }
  }

  function stopPropagation (e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
      // e.nativeEvent.stopImmediatePropagation()
    }
  }

  return (
    <details open={open} className={props.className}>
      <summary onClick={toggleOpen} onKeyPress={handleKey}>{props.summary}</summary>
      <div>
        { open && props.children }
      </div>
    </details>
  )
}

Details.propTypes = {
  open: PropTypes.bool,
  summary: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
}

Details.defaultProps = {
  open: false,
  summary: ''
}
