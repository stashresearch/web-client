import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Breadcrumb } from 'react-bootstrap'
import { FileIcon } from '@primer/octicons-react'
import fetchProject from './../../actions/projects/fetchProject.action'
import createDataSource from './../../actions/projects/createDataSource.action'
import { PROJECT_TYPE } from './../../config/propTypes'
import Loading from './../Loading'
import ProjectMenu from './ProjectMenu'
import GoogleFilePicker from './../GoogleFilePicker'
import GoogleDriveLogo from './../../lib/GoogleDriveLogo'
import FormrFilePicker from './FormrFilePicker'
import FormrLogo from './../../lib/FormrLogo'
import history from './../../history'
import NewFromCsv from './dataSources/NewFromCsv'
import ProjectPageWrapper from './ProjectPageWrapper'

class NewDataSourceForm extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PROJECT_TYPE,
    newDataSource: PropTypes.shape({
      created: PropTypes.string,
      sending: PropTypes.bool.isRequired,
      error: PropTypes.any
    }).isRequired,
    fetchProject: PropTypes.func.isRequired,
    createDataSource: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onPicked = this.onPicked.bind(this)
  }

  componentDidMount () {
    if (this.props.project == null) {
      const { projectId } = this.props
      this.props.fetchProject({ id: projectId })
    }
  }

  componentDidUpdate (prevProps) {
    const { newDataSource } = this.props
    if (prevProps.newDataSource.sending &&
      !newDataSource.sending &&
      newDataSource.error == null &&
      newDataSource.created != null) {
      history.push(`/dataSources/${newDataSource.created}/setup`)
    }
  }

  async onPicked (data) {
    this.props.createDataSource(data)
  }

  renderForm () {
    const { projectId } = this.props
    return (
      <div className="nav-tabs-container">
        <h4 className="mb-4"><GoogleDriveLogo size="1.5rem" />Google Forms / sheets</h4>
        <GoogleFilePicker projectId={ projectId } text="+ Link new file"
          onPicked={ this.onPicked } />
        <h4 className="mt-5 mb-4"><FileIcon className="mr-2" size="medium" /> CSV upload</h4>
        <NewFromCsv projectId={ projectId } />
        <h4 className="mt-5 mb-4"><FormrLogo /></h4>
        COMING SOON
        {/* <FormrFilePicker projectId={ projectId } /> */}

      </div>
    )
  }

  renderError () {
    return (
      <Alert variant="danger" className="mt-3">
        { JSON.stringify(this.props.newDataSource.error) }
      </Alert>
    )
  }

  render () {
    const { project, projectId, newDataSource } = this.props
    const breadcrumbs = [
      {
        to: `/projects/${projectId}/settings`,
        label: 'Project Settings'
      },
      {
        to: '#',
        label: 'Add data source'
      }
    ]
    if (project == null) {
      return <Loading />
    }
    return (
      <ProjectPageWrapper projectId={ projectId } active="Settings" breadcrumbs={breadcrumbs}>
        { newDataSource.error && this.renderError() }
        { this.renderForm() }
      </ProjectPageWrapper>
    )
  }
}

function mapState (state, props) {
  const { projects } = state
  const project = projects[props.projectId]
  return { project, newDataSource: projects.newDataSource }
}

const actionCreators = {
  fetchProject,
  createDataSource
}

export default connect(mapState, actionCreators)(NewDataSourceForm)
