import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { Alert } from 'react-bootstrap'
import { ShieldLockIcon } from '@primer/octicons-react'
import fetchProjects from '../../../actions/projects/fetchProjects'
import Loading from '../../Loading'
import BootstrapField from '../../lib/formik/BootstrapField'
import BootstrapSubmitButton from '../../lib/formik/BootstrapSubmitButton'
import { masterPasswordRecovery, projectRecovery } from '../../../lib/crypto/projectUtils'
import Project from './Project'
import FormikWizard from '../../lib/formik/FormikWizard'
import updatePrivateKey from '../../../actions/projects/updatePrivateKey.action'
import Api from './../../../ApiV2'
import EmptyState from './../../lib/EmptyState'

function shouldFetchProjects (projects) {
  if (projects == null || (Array.isArray(projects) && projects.length === 0)) {
    return true
  } else if (Array.isArray(projects) && projects.length > 0) {
    if (projects.some((p) => p.encryptedPrivateKey == null)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

async function recoverProjects (projects, values, password) {
  const recoveries = []
  for (const p of projects) {
    if (!values[p.id]) { continue }
    const recovery = await projectRecovery(
      p, values[p.id], { salt: p.salt, password }
    )
    // console.log(recovery)
    recoveries.push(recovery)
  }
  return recoveries
}

export default function ProjectRecovery (props) {

  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.list)
  const fetching = useSelector((state) => state.projects.fetching)
  const userId = useSelector((state) => state.session.user.id)

  const [password, setPassword] = React.useState(null)
  const [recovered, setRecovered] = React.useState([])

  React.useEffect(() => {
    if (shouldFetchProjects(projects)) {
      dispatch(fetchProjects(true))
    }
  }, [projects])

  async function handleSubmit (values, bag) {
    // console.log('submitting', values)
    if (values.encryptPassword) {
      // master pass recovery
      console.log('masterPasswordRecovery')
      const recoveries = await masterPasswordRecovery(projects, values.encryptPassword, password)
      await Promise.all(
        recoveries.map((r) => {
          dispatch(updatePrivateKey(r))
        })
      )
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
      console.log('done')
      return false
    } else {
      console.log('single recovery')
      const recoveries = await recoverProjects(projects, values, password)
      console.log(recoveries)
      await Promise.all(
        recoveries.map(async (recovery) => {
          await dispatch(updatePrivateKey(recovery))
          setRecovered([...recovered, recovery.projectId])
          return true
        })
      )
      bag.setSubmitting(false)
      return false
    }
  }

  async function handleStep1Submit (values, bag) {
    return Api.post('/user/me/checkPassword', values).then(() => {
      setPassword(values.password)
      return false
    })
  }

  if (fetching && (
    projects == null || (Array.isArray(projects) && projects.length === 0)
  )) {
    return <Loading />
  }

  // TODO: get password from password change page?
  const initialValues = { encryptPassword: '' }
  projects.forEach((p) => { initialValues[p.id] = '' })

  return (
    <div>
      <EmptyState light variant="info" text="Projects recovery"
        customIcon={ShieldLockIcon} className="mt-3 mb-3">
        <FormikWizard initialStatus={{}}>
          <FormikWizard.Step initialValues={{ password: '' }} onSubmit={handleStep1Submit}>
            <BootstrapField type="password" name="password"
              label="Enter your current account password to start the recovery process"
              placeholder="Enter current account password" />
          </FormikWizard.Step>
          <FormikWizard.Step onSubmit={handleSubmit} initialValues={ initialValues } hideSubmit>
            <Alert variant="info">
              Recover your projects encryption keys:
              <ul>
                <li>Use each project&apos;s recovery key</li>
              </ul>
            </Alert>
            {/* MASTER PASS recovery disabled */}
            {/* <h5>Password</h5>
            <div className="form-inline">
              <BootstrapField type="password" name="encryptPassword"
                placeholder="Password used to encrypt your keys..."
                grow />
              <BootstrapSubmitButton variant="link" className="btn-link-icon"
                inline label={[
                  (<ShieldLockIcon className="mr-2" key={1} />), 'recover all'
                ]}
                submittingLabel={[
                  (<ShieldLockIcon className="mr-2" key={1} />), 'recovering...']
                } />
            </div>
            <div className="row">
              <div className="col"><hr /></div>
              <div className="col-auto">OR</div>
              <div className="col"><hr /></div>
            </div> */}
            <h5>Recovery keys</h5>
            <div className="rows">
              {
                projects.map((p, i) =>
                  <Project project={p} userId={userId} key={i}
                    recovered={recovered.includes(p.id)} password={ password } />
                )
              }
            </div>
            <BootstrapSubmitButton variant="link" className="btn-link-icon"
              label={[(<ShieldLockIcon className="mr-2" key={1} />), 'recover']} />
          </FormikWizard.Step>
        </FormikWizard>
      </EmptyState>
      {/* <Formik initialValues={ initialValues }
        initialStatus={{ recovered: [] }}
        handleSubmit={(e) => e.preventDefault()}
        onSubmit={handleSubmit} >
        <Form>
          <h5>Password</h5>
          <div className="form-inline">
            <BootstrapField type="password" name="password"
              placeholder="Password used to encrypt your keys..."
              grow />
            <BootstrapSubmitButton variant="link" className="btn-link-icon"
              inline label={[
                (<ShieldLockIcon className="mr-2" key={1} />), 'recover all'
              ]}
              submittingLabel={[
                (<ShieldLockIcon className="mr-2" key={1} />), 'recovering...']
              } />
          </div>
          <div className="row">
            <div className="col"><hr /></div>
            <div className="col-auto">OR</div>
            <div className="col"><hr /></div>
          </div>
          <h5>Recovery keys</h5>
          <div className="rows">
            { projects.map((p, i) => <Project project={p} userId={userId} key={i} />) }
          </div>
          <BootstrapSubmitButton variant="link" className="btn-link-icon"
            label={[(<ShieldLockIcon className="mr-2" key={1} />), 'recover']} />
        </Form>
      </Formik> */}
    </div>
  )
}
