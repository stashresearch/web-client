import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchDiff from './../../actions/projects/fetchDiff.action'
import getDiffKey from './../../lib/getDiffKey'
import Loading from './../Loading'

class DataSourceDiff extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    dataSourceId: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    source: PropTypes.string,
    diff: PropTypes.any,
    fetchDiff: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.diff == null) {
      const { projectId, dataSourceId, target, source } = this.props
      this.props.fetchDiff({ projectId, dataSourceId, target, source })
    }
  }

  render () {
    if (this.props.diff == null) {
      return (<Loading />)
    }
    return (
      <div className="diff-table" dangerouslySetInnerHTML={{ __html: this.props.diff.diffHtml }} />
    )
  }
}

function mapState (state, props) {
  const { dataSourceHistory: { diffs } } = state
  const diff = diffs[getDiffKey(props.target, props.source)]
  return { diff }
}

const actionsCreators = {
  fetchDiff
}

export default connect(mapState, actionsCreators)(DataSourceDiff)
