import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { ShieldIcon, KeyIcon } from '@primer/octicons-react'
import checkPassword from './../actions/users/checkPassword.action'
import Modal from './../lib/Modal'
import Crypto from '../lib/Crypto'
import BootstrapField from './lib/formik/BootstrapField'
import BootstrapSubmitButton from './lib/formik/BootstrapSubmitButton'
import Api from '../ApiV2'
import EmptyState from './lib/EmptyState'

const subText = 'Please input your account password to retrieve the project recovery key'

function RecoveryKeyModalTrigger ({ ...props }) {
  const klass = 'btn btn-link btn-wide my-2 text-danger'
  const style = { fontVariant: 'small-caps' }
  const text = 'show recovery key'
  const icon = <ShieldIcon />
  return (
    <div>
      <button className={ klass } style={ style } { ...props }>
        { text }&nbsp;{ icon }
      </button>
    </div>
  )
}

// FIXME: if project needs recovery, current password check is not usefull

export default function RecoveryKeyModal ({ projectId, ...props }) {

  const salt = useSelector((state) => {
    return state.projects[projectId].salt
  })

  const passwordValid = useSelector((state) => {
    return state.users.passwordValid
  })

  const dispatch = useDispatch()

  const [hash, setHash] = React.useState(null)

  async function handleSubmit (values, bag) {
    try {
      const { password } = values
      await Api.post('/user/me/checkPassword', { password })
      const hash = await Crypto.hashPassword(password, salt)
      setHash(hash)
    } catch (e) {
      bag.setErrors({ password: 'Wrong password' })
    }
    bag.setSubmitting(false)
    return false
  }

  return (
    <Modal trigger={<RecoveryKeyModalTrigger />} footer onClose={() => setHash(null)}>
      <div className="recovery-modal-body">
        { hash &&
          (<EmptyState key={3} customIcon={KeyIcon} noBorder style={{ flexGrow: '1' }}
            text="project's recovery key" subText={hash}></EmptyState>)
        }
        { !hash &&
          (<Formik initialValues={{ password: '' }}
            handleSubmit={(e) => e.preventDefault()}
            onSubmit={handleSubmit}>
            <Form style={{ flexGrow: '1' }}>
              <EmptyState customIcon={KeyIcon} noBorder
                text="project's recovery key" subText={subText}>
                <div className="row">
                  <div className="row-body">
                    <BootstrapField name="password" type="password" label=""
                      placeholder="Enter account password..." autofocus />
                  </div>
                  <div className="row-right">
                    <BootstrapSubmitButton label="show" submittingLabel="verifying..." caps />
                  </div>
                </div>
              </EmptyState>
            </Form>
          </Formik>)
        }
      </div>
    </Modal>
  )
}

RecoveryKeyModal.propTypes = {
  projectId: PropTypes.string.isRequired
}
