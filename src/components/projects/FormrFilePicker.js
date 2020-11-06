import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FormrAuthorize from './../formr/FormrAuthorize'
import FormrPicker from './../formr/FormrPicker'

class FormrFilePicker extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired
  }

  render () {
    return (
      <FormrAuthorize>
        <FormrPicker projectId={ this.props.projectId } />
      </FormrAuthorize>
    )
  }
}

function mapState (state) {
  return {}
}

const actionCreators = {}

export default connect(mapState, actionCreators)(FormrFilePicker)
