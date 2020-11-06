import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fetchDataSourceHistory from './../../actions/projects/fetchDataSourceHistory.action'
import Loading from './../Loading'
import Details from './../lib/Details'

class DataSourceHistory extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    dataSourceId: PropTypes.string.isRequired,
    history: PropTypes.array, // TODO: define history type
    fetchDataSourceHistory: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount () {
    const { history, projectId, dataSourceId } = this.props
    if (history == null) {
      this.props.fetchDataSourceHistory({ projectId, dataSourceId })
    }
  }

  renderRow (item, i) {
    const { projectId, dataSourceId } = this.props
    return (
      <div className="row" key={i}>
        <div className="row-left text-muted">
          <small>{ new Date(item.createdAt).toLocaleString() }</small>
        </div>
        <div className="row-body">
          <strong>{ item.message }</strong>
        </div>
        <div className="row-right text-muted">
          {/* {
            item.commitId && (
              <small><Link to={`/projects/${projectId}/dataSources/${dataSourceId}/diff/${item.uuid}`}>{ item.commitId }</Link></small>
            )
          } */}
        </div>
      </div>
    )
  }

  render () {
    const { history } = this.props
    if (history == null) {
      return <Loading />
    }
    return (
      <div className="rows">
        { history.map(this.renderRow) }
      </div>
    )
  }

}

function mapState (state, props) {
  const { dataSourceHistory } = state
  const history = dataSourceHistory[props.dataSourceId]
  return { history }
}

const actionCreators = {
  fetchDataSourceHistory
}

export default connect(mapState, actionCreators)(DataSourceHistory)
