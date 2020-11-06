import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import { ShieldCheckIcon, ShieldIcon } from '@primer/octicons-react'
import { getRecoveryKey, projectRecovery } from './../../../lib/crypto/projectUtils'
import fetchPrivateKey from './../../../actions/projects/fetchPrivateKey.action'
import updatePrivateKey from './../../../actions/projects/updatePrivateKey.action'
import BootstrapField from '../../lib/formik/BootstrapField'
import { PROJECT_TYPE } from './../../../config/propTypes'

function needsRecovery (project, userId) {
  const me = project.members.filter((m) => m.userId === userId)[0]
  return me && me.needsRecovery
}

export default function Project ({ project, userId, password, recovered, ...props }) {

  const formik = useFormikContext()
  const dispatch = useDispatch()
  // TODO: private key should be included in list when API supports it
  const encryptedPrivateKey = useSelector((state) => {
    const p = state.projects[project.id]
    return p ? p.encryptedPrivateKey : null
  })
  const [recovery, setRecovery] = React.useState(null)

  const needs = needsRecovery(project, userId)
  recovered = needs && recovered
  let color = 'text-info'
  let icon = <ShieldCheckIcon />
  if (needs && !recovered) {
    color = 'text-danger'
    icon = <ShieldIcon />
  } else if (needs && recovered) {
    color = 'text-success'
  }

  React.useEffect(() => {
    // getRecoveryKey({ salt: project.salt, password: '' }).then((r) => {
    //   console.log(project.name, r)
    // })
    if (encryptedPrivateKey == null) {
      dispatch(fetchPrivateKey(project.id))
    }
  }, [encryptedPrivateKey])

  React.useEffect(() => {
    if (needs && recovered) {
      getRecoveryKey({ salt: project.salt, password }).then((r) => {
        setRecovery(r)
      })
    }
  }, [needs, recovered])

  // async function handleClick (e) {
  //   e.preventDefault()
  //   console.log(formik.values[project.id])
  //   const projectId = project.id
  //   console.log(projectId, project)
  //   try {
  //     const recovery = await projectRecovery(
  //       project, formik.values[projectId], { salt: project.salt, password }
  //     )
  //     console.log(recovery)
  //     await dispatch(updatePrivateKey(recovery))
  //   } catch (e) {
  //     console.log(e)
  //     formik.setFieldError(projectId, 'Invalid recovery key')
  //   }
  //   return false
  // }

  if (password == null) {
    return null
  }

  return (
    <div className="row project-recovery form-inline">
      <div className={`row-left ${color}`}>
        { project.name }
      </div>
      <div className="row-body">
        { needs && !recovered && (
          <BootstrapField type="text" name={ project.id }
            disabledWhileSubmit
            placeholder="Enter recovery key..." />
        )}
        { needs && recovered && (
          <span className="text-muted">
            new recovery key:
            { recovery && <strong>{ recovery }</strong> }
            { recovery == null && <small>generating new recovery key...</small> }
          </span>
        ) }
        { !needs && (
          <small className="text-muted">No recovery needed</small>
        ) }
      </div>
      {/* <div className={`row-right ${color}`}>
        <button className="btn btn-link" onClick={handleClick}>
          { icon }
        </button>
      </div> */}
    </div>
  )
}

Project.propTypes = {
  userId: PropTypes.string.isRequired,
  project: PROJECT_TYPE.isRequired,
  password: PropTypes.string,
  recovered: PropTypes.bool
}

Project.defaultProps = {
  recovered: false
}
