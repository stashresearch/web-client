import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FormikWizard from '../lib/formik/FormikWizard'
import { KeyIcon } from '@primer/octicons-react'
import Crypto from './../../lib/Crypto'
import setPasswordHash from './../../actions/projects/setPasswordHash.action'
import fetchProject from './../../actions/projects/fetchProject.action'
import checkPassword from './../../actions/users/checkPassword.action'
import resetPasswordCheck from './../../actions/users/resetPasswordCheck.action'
import setProjectKey from './../../actions/projects/setProjectKey.action'
import { PROJECT_TYPE, USER_TYPE } from './../../config/propTypes'
import BootstrapField from '../lib/formik/BootstrapField'
import GenerateProjectKey from './GenerateProjectKey'
import history from '../../history'
import PersonalDataArea from './../lib/PersonalDataArea'
import BootstrapSubmitButton from '../lib/formik/BootstrapSubmitButton'

class PojectSetupForm extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    user: USER_TYPE.isRequired,
    form: PropTypes.shape({
      hash: PropTypes.string,
      errors: PropTypes.array
    }).isRequired,
    project: PROJECT_TYPE,
    passwordValid: PropTypes.bool.isRequired,
    setPasswordHash: PropTypes.func.isRequired,
    fetchProject: PropTypes.func.isRequired,
    checkPassword: PropTypes.func.isRequired,
    resetPasswordCheck: PropTypes.func.isRequired,
    setProjectKey: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
    this.generateKey = this.generateKey.bind(this)
    this.handleRecoverySubmit = this.handleRecoverySubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.project == null) {
      const { id } = this.props
      this.props.fetchProject({ id })
    }
  }

  async handlePasswordSubmit (values, bag) {
    await this.props.checkPassword(values.password)
    if (this.props.passwordValid) {
      this.props.resetPasswordCheck()
      const hash = await Crypto.hashPassword(values.password, this.props.project.salt)
      this.props.setPasswordHash(hash)
    } else {
      bag.setErrors({
        password: 'Invalid password'
      })
      bag.setSubmitting(false)
      return Promise.reject(new Error('invalid_password'))
    }
    return false
  }

  async generateKey () {
    try {
      const { user, project, form: { hash } } = this.props
      const name = `${user.firstName} ${user.lastName}`
      const key = await Crypto.generateKey(name, user.email, project.salt)
      const crypt = new Crypto(key.publicKey, key.privateKey, project.salt)
      const encryptedKey = await crypt.exportKey(hash, true)
      await this.props.setProjectKey(project.id, encryptedKey)
    } catch (e) {
      console.error(e)
      // TODO
    }
  }

  handleRecoverySubmit () {
    // TODO: prevent submit if keys are not generated
    history.push(`/projects/${this.props.id}`)
    return false
  }

  render () {
    return (
      <FormikWizard>
        <FormikWizard.Step onSubmit={this.handlePasswordSubmit} hideSubmit
          initialValues={{ password: '' }}>
          <PersonalDataArea>
            <p>
              To ensure the security of your project&apos;s sensitive data, we will encrypt it.
              Please type in your account&apos;s password to generate your project encryption keys.
            </p>
            <div className="row">
              <div className="row-body">
                <BootstrapField className="flex-column align-items-start"
                  label="Account password" name="password" type="password"
                  description="Your password will be used to securely save your encryption keys"
                  placeholder="Enter account password..." />
              </div>
              <div className="row-right">
                <BootstrapSubmitButton className="btn-inverted"
                  label={<KeyIcon size="medium" />} style={{ marginTop: '0.5rem' }} />
              </div>
            </div>
          </PersonalDataArea>
        </FormikWizard.Step>
        <FormikWizard.Step onSubmit={this.handleRecoverySubmit} initialValues={{}}>
          <GenerateProjectKey generateKey={this.generateKey}>
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Data recovery</h4>
              <p>
                Sensitive data in your project will be encrypted (only you can access it).
                Loosing your account password means loosing the encrypted data, to prevent this from happening,
                we provide you with a recovery key for each of your projects.
                Save this key somewhere <strong>private and secure</strong> as it can be used to decrypt this project&apos;s sensitive data
              </p>
              <hr />
              <p className="mb-0">Recovery Key: { this.props.form.hash || '...'}</p>
            </div>
          </GenerateProjectKey>
        </FormikWizard.Step>
      </FormikWizard>
    )
  }
}

function mapState (state, props) {
  const { projects: { formSetup }, users: { passwordValid }, session: { user } } = state
  const project = state.projects[props.id]
  return { project, form: formSetup, passwordValid, user }
}

const actionCreators = {
  setPasswordHash,
  fetchProject,
  checkPassword,
  resetPasswordCheck,
  setProjectKey
}

export default connect(mapState, actionCreators)(PojectSetupForm)
