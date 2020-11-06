import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import { OctofaceIcon } from '@primer/octicons-react'
import { Alert, Button } from 'react-bootstrap'
import ConnectFormikToRedux from './../../lib/formik/ConnectFormikToRedux'
import FormikGlobalError from './../../lib/formik/FormikGlobalError'
import BootstrapField from './../../lib/formik/BootstrapField'
import BootstrapSubmitButton from './../../lib/formik/BootstrapSubmitButton'
import setupGithubExport from './../../../actions/projects/setupGithubExport.action'
import fetchDataSources from './../../../actions/projects/dataSources/fetchDataSources.action'
import fetchProject from './../../../actions/projects/fetchProject.action'
import deleteGithubExport from './../../../actions/projects/deleteGithubExport.action'
import EmptyState from './../../lib/EmptyState'
import { PROJECT_TYPE } from './../../../config/propTypes'

const ghPlaceholder = `
git@github.com:<user>/<repo>.git ;
 https://github.com/<user>/<repo>.git ;
 gh repo clone <user>/<repo>
`

class GithubExport extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    project: PROJECT_TYPE,
    feedback: PropTypes.any,
    dataSources: PropTypes.array,
    setupGithubExport: PropTypes.func.isRequired,
    fetchDataSources: PropTypes.func.isRequired,
    fetchProject: PropTypes.func.isRequired,
    deleteGithubExport: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount () {
    if (this.props.project == null) {
      this.props.fetchProject({ id: this.props.projectId })
    }
    if (this.props.dataSources == null) {
      this.props.fetchDataSources(this.props.projectId)
    }
  }

  onDelete () {
    this.props.deleteGithubExport(this.props.projectId)
  }

  onSubmit (values) {
    // eslint-disable-next-line no-unused-expressions
    this.props.setupGithubExport(this.props.projectId, values.cloneCommand)
  }

  renderLinked () {
    const { project } = this.props
    return (
      <div className="row">
        <div className="row-body">
          Exporting data to:&nbsp;<strong>{ project.gitRepo }</strong>
        </div>
        <div className="row-right">
          <Button variant="link" className="text-danger" onClick={this.onDelete}>
            DELETE
          </Button>
        </div>
      </div>
    )
  }

  renderForm () {
    return (
      <Formik handleSubmit={(e) => e.preventDefaut()}
        onSubmit={this.onSubmit} initialValues={{ cloneCommand: '' }}>
        <Form className="align-self-stretch">
          <ConnectFormikToRedux state={this.props.feedback} />
          <FormikGlobalError />
          <p>
            Add github user &quot;stashresearch&quot; as a collaborator to your repo,
            <br/>
            then put the repo clone command here to initiate export
          </p>
          <BootstrapField label="Github clone command" name="cloneCommand"
            placeholder={ghPlaceholder} />
          <BootstrapSubmitButton caps className="mt-3" />
        </Form>
      </Formik>
    )
  }

  render () {
    console.log(this.props.feedback)
    const { project } = this.props
    const linked = project?.gitRepo != null
    return (
      <EmptyState text="github" noBorder customIcon={OctofaceIcon}>
        { this.props.feedback?.success && (
          <Alert variant="success">
            Success!
          </Alert>
        ) }
        { linked && this.renderLinked()}
        { !linked && this.renderForm() }
      </EmptyState>
    )
  }
}

function mapState (state, props) {
  const { githubExport } = state.projects
  const dataSources = state.dataSources[props.projectId]
  const project = state.projects[props.projectId]
  return { feedback: githubExport, dataSources, project }
}

const actionCreators = {
  setupGithubExport,
  fetchDataSources,
  fetchProject,
  deleteGithubExport
}

export default connect(mapState, actionCreators)(GithubExport)
