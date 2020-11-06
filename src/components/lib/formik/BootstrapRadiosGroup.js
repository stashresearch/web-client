import React from 'react'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { FormGroup } from 'react-bootstrap'
import BootstrapRadio from './BootstrapRadio'

/* <Form.Group>
<div className="radio-group">
  <Form.Check type="radio" name="access" id="access-public" className={publicChecked ? 'checked' : ''}
    label="Public" value="public" checked={ publicChecked }
    onChange={formik.handleChange} />
  <Form.Check type="radio" name="access" id="access-private" className={privateChecked ? 'checked' : ''}
    label="Private" value="private" checked={ privateChecked }
    onChange={formik.handleChange} />
</div>
<small className="form-text text-muted">Public projects data will be readable by everyone, private project data will only be available to collaborators.</small>
</Form.Group> */

function BootstrapRadiosGroup (props) {

  return (
    <FormGroup>
      { props.label && <label>{props.label}</label>}
      <div className="radio-group">
        { props.fields.map((field) => {
          return (
            <BootstrapRadio key={field.name} label={field.label} name={props.name}
              value={field.value}
              id={`${props.name}-${field.value}`} />
          )
        }) }
        { props.description && (
          <small className="form-text text-muted">{props.description}</small>
        )}
      </div>
    </FormGroup>
  )

  // return (
  //   <FormCheck type="radio" { ...field } { ...props }
  //     className={ field.checked ? 'is-selected' : '' } />
  // )
}

BootstrapRadiosGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  description: PropTypes.string
}

export default BootstrapRadiosGroup
