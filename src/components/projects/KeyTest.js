import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import { Button } from 'react-bootstrap'
import { ShieldLockIcon } from '@primer/octicons-react'
import fetchProject from './../../actions/projects/fetchProject.action'
import fetchPrivateKey from './../../actions/projects/fetchPrivateKey.action'
import Crypto from './../../lib/Crypto'
import BootstrapField from '../lib/formik/BootstrapField'

class KeyTest extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    project: PropTypes.any,
    fetchProject: PropTypes.func.isRequired,
    fetchPrivateKey: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount () {
    const { id } = this.props
    if (this.props.project == null) {
      await this.props.fetchProject({ id })
    }
    if (this.props.project.encryptedPrivateKey == null) {
      await this.props.fetchPrivateKey(id)
    }
  }

  async handleSubmit (values, bag) {
    try {
      console.log(values)
      const { project } = this.props
      const crypto = await Crypto.importKey({
        publicKey: project.publicKey,
        privateKey: project.encryptedPrivateKey,
        passphrase: project.salt,
        password: values.password
      })
      // console.log(crypto)
      const startEnc = Date.now()
      const enc = await crypto.encrypt('test encryption')
      console.log('encrypted', enc)
      console.log('encrypted', Date.now() - startEnc, 'ms')
      const startDec = Date.now()
      const dec = await crypto.decrypt(enc)
      console.log('decrypted', dec, Date.now() - startDec, 'ms')
    } catch (e) {
      bag.setErrors({ password: ' ' })
    }
  }

  render () {
    return (
      <Formik
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={this.handleSubmit}
        initialValues={{ password: '' }}>
        <Form className="form-inline" style={{ justifyContent: 'center' }}>
          <BootstrapField name="password" type="password" label=""
            placeholder="password" />
          <Button type="submit" variant="link" className="mx-2">
            <ShieldLockIcon size={24} />
          </Button>
        </Form>
      </Formik>
    )
  }
}

function mapState (state, props) {
  const project = state.projects[props.id]
  return { project }
}

const actionCreators = {
  fetchProject,
  fetchPrivateKey
}

export default connect(mapState, actionCreators)(KeyTest)
