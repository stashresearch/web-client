import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

function BootstrapModal (props) {

  const [show, setShow] = React.useState(false)

  function onClick () {
    setShow(!show)
  }

  function onClose () {
    setShow(false)
    props.onClose()
  }

  React.useEffect(() => {
    if (props.show === false) {
      setShow(false)
    } else if (props.show === true) {
      setShow(true)
    }
  }, [props.show])

  return (
    <>
      {
        typeof props.trigger === 'string' ? (
          <Button variant="primary" onClick={onClick}>{ props.trigger }</Button>
        ) : React.cloneElement(props.trigger, { onClick, triggerClose: onClose })
      }
      <Modal
        show={show}
        onHide={onClose}
        animation={false}
        autoFocus enforceFocus
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        { props.title && (
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          { React.cloneElement(props.children, { triggerClose: onClose }) }
        </Modal.Body>
        { props.footer && ( // TODO
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        ) }
      </Modal>
    </>
  )
}

BootstrapModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onClose: PropTypes.func
}

BootstrapModal.defaultProps = {
  onClose: function () {}
}

export default BootstrapModal
