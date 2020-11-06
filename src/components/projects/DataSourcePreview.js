import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchDataSourceData from './../../actions/projects/dataSources/fetchDataSourceData.action'
import DataSourceDataPreview from './dataSources/DataSourceDataPreview'
import Loading from './../Loading'
import CsvPreview from './../lib/CsvPreview'

class DataSourcePreview extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    dataSourceId: PropTypes.string.isRequired,
    data: PropTypes.any, // TODO type in config
    fetchDataSourceData: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.data == null) {
      const { dataSourceId } = this.props
      this.props.fetchDataSourceData(dataSourceId)
    }
  }

  render () {
    if (this.props.data == null) {
      return <Loading />
    }
    return (
      // <CsvPreview data={this.props.data} />
      <DataSourceDataPreview projectId={this.props.projectId} data={this.props.data} />
    )
  }
}

function mapState (state, props) {
  const { dataPreview } = state
  const data = dataPreview[props.dataSourceId]
  return { data }
}

const actionCreators = {
  fetchDataSourceData
}

export default connect(mapState, actionCreators)(DataSourcePreview)
