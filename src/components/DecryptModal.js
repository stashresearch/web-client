import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { ShieldLockIcon, ShieldXIcon } from '@primer/octicons-react'
import Modal from './../lib/Modal'
import { PROJECT_TYPE } from './../config/propTypes'
import fetchProject from './../actions/projects/fetchProject.action'
import fetchPrivateKey from './../actions/projects/fetchPrivateKey.action'
import decryptPrivateKey from './../actions/projects/decryptPrivateKey.action'
import checkPassword from './../actions/users/checkPassword.action'
import eraseDecryptedPrivateKey from './../actions/projects/eraseDecryptedPrivateKey.action'
import BootstrapField from './lib/formik/BootstrapField'
import BootstrapSubmitButton from './lib/formik/BootstrapSubmitButton'
import PersonalDataArea from './lib/PersonalDataArea'

function DecryptModalTrigger ({ projectId, onClick, triggerClose, ...props }) {

  const decryptedPrivateKey = useSelector((state) => {
    return state.projects[projectId].decryptedPrivateKey
  })

  const dispatch = useDispatch()

  function clearPrivateKey () {
    dispatch(eraseDecryptedPrivateKey(projectId))
  }

  const isDecrypted = decryptedPrivateKey != null
  let klass = 'btn btn-link btn-wide my-2'
  klass += isDecrypted ? ' text-danger' : ''
  const style = { fontVariant: 'small-caps' }
  const text = isDecrypted ? 'hide' : 'show'
  const icon = isDecrypted ? <ShieldXIcon /> : <ShieldLockIcon />
  const handleClick = isDecrypted ? clearPrivateKey : onClick

  return (
    <div align="right">
      <button className={ klass } { ...props } onClick={ handleClick } style={ style }>
        { text } personal data&nbsp;{ icon }
      </button>
    </div>
  )
}

DecryptModalTrigger.propTypes = {
  projectId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  triggerClose: PropTypes.func
}

class DecryptModal extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PROJECT_TYPE,
    passwordValid: PropTypes.bool.isRequired,
    fetchProject: PropTypes.func.isRequired,
    fetchPrivateKey: PropTypes.func.isRequired,
    decryptPrivateKey: PropTypes.func.isRequired,
    checkPassword: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      show: null
    }
  }

  async componentDidMount () {
    if (this.props.project == null) {
      await this.props.fetchProject({ id: this.props.projectId })
    }
    if (this.props.project.encryptedPrivateKey == null) {
      this.props.fetchPrivateKey(this.props.projectId)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.show === null && this.state.show === false) {
      this.setState({ show: null })
    }
  }

  async handleSubmit (values, bag) {
    await this.props.checkPassword(values.password)
    if (this.props.passwordValid) {
      const { project: { encryptedPrivateKey, salt, id } } = this.props
      await this.props.decryptPrivateKey({
        projectId: id,
        encryptedPrivateKey,
        passphrase: salt,
        password: values.password
      })
      this.setState({ show: false })
    } else {
      bag.setErrors({ password: 'Wrong password' })
    }
    bag.setSubmitting(false)
    return false
  }

  render () {
    return (
      <Modal show={this.state.show}
        trigger={<DecryptModalTrigger projectId={this.props.projectId} />}>
        <PersonalDataArea>
          <Formik
            handleSubmit={(e) => e.preventDefault()}
            onSubmit={this.handleSubmit}
            initialValues={{ password: '' }}>
            <Form className="form-inline" style={{ justifyContent: 'center' }}>
              <BootstrapField name="password" type="password" label=""
                placeholder="password" autofocus />
              <BootstrapSubmitButton label="decrypt" submittingLabel="decrypting..." caps />
            </Form>
          </Formik>
        </PersonalDataArea>
      </Modal>
    )
  }
}

function mapState (state, props) {
  const { users: { passwordValid } } = state
  const project = state.projects[props.projectId]
  return { project, passwordValid }
}

const actionCreators = {
  fetchProject,
  fetchPrivateKey,
  decryptPrivateKey,
  checkPassword
}

export default connect(mapState, actionCreators)(DecryptModal)
