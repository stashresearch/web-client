import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import fetchProject from './../../actions/projects/fetchProject.action'
import Loading from './../Loading'
import ProjectTitle from './ProjectTitle'
import ProjectMenu from './ProjectMenu'
import EmptyState from './../lib/EmptyState'
import Breadcrumbs from './../lib/Breadcrumbs'

// TODO check project setup done (publicKey)

export default function ProjectPageWrapper ({ projectId, active, breadcrumbs, ...props }) {

  const dispatch = useDispatch()
  const project = useSelector((state) => state.projects[projectId])
  const [alertSetup, setAlertSetup] = React.useState(false)

  React.useEffect(() => {
    if (project == null) {
      dispatch(fetchProject({ id: projectId }))
    }
  }, [projectId])

  React.useEffect(() => {
    if (project != null && project.publicKey == null) {
      setAlertSetup(true)
    }
  }, [project])

  if (project == null) {
    return <Loading />
  }

  if (alertSetup) {
    return (
      <div className="project-detail">
        <ProjectTitle project={ project } />
        <EmptyState variant="danger" noBorder
          text="This project is not properly setup."
          action={`/projects/${projectId}/setup`} actionText="Go to setup page" />
      </div>
    )
  }

  return (
    <div className="project-detail">
      <ProjectTitle project={ project } />
      <ProjectMenu projectId={ projectId } active={ active } />
      <div className="nav-tabs-container">
        <Breadcrumbs breadcrumbs={ breadcrumbs } />
        { props.children }
      </div>
    </div>
  )
}

ProjectPageWrapper.propTypes = {
  projectId: PropTypes.string.isRequired,
  active: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  ...Breadcrumbs.propTypes
}
