import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
import { Table } from 'react-bootstrap'
import { ShieldLockIcon } from '@primer/octicons-react'
import DataSourceCellPreview from './DataSourceCellPreview'

// const parseData = memoizeOne(function (data) {
//   const out = {}
//   const cols = {}
//   for (const col of data.meta) {
//     cols[col.id] = col
//   }
//   for (const row of data.data) {
//     out[row.rowId] = out[row.rowId] || []
//     row.encrypt = cols[row.columnId].encrypt
//     out[row.rowId].push(row)
//   }
//   return Object.values(out).sort((x, y) => {
//     x[0].createdAt > y[0].createdAt
//   })
// })

const parseData = memoizeOne(function (data) {
  const cols = {}
  for (const col of data.meta) {
    cols[col.id] = col
  }
  for (const row of data.data) {
    for (const cell of row.cells) {
      cell.encrypt = cols[cell.cId].encrypt
    }
  }
  return data.data
})

class DataSourceDataPreview extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    // project: PropTypes.shape({
    //   publicKey: PropTypes.string.isRequired,
    //   decryptedPrivateKey: PropTypes.string,
    //   salt: PropTypes.string.isRequired
    // }),
    data: PropTypes.shape({
      meta: PropTypes.any,
      data: PropTypes.any
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    // this.renderField = this.renderField.bind(this)
  }

  renderHeader () {
    const { data: { meta } } = this.props
    return (
      <thead>
        <tr className="text-center">
          {
            meta.map((col, i) => (
              <th key={i}>
                { col.encrypt && (
                  <ShieldLockIcon className="mr-2" />
                ) }
                {col.name}
              </th>
            ))
          }
        </tr>
      </thead>
    )
  }

  renderRow (row, i) {
    return (
      <tr key={i}>
        {
          row.cells.map((cell, i) =>
            <DataSourceCellPreview cell={ cell } key={i}
              projectId={this.props.projectId} />
          )
        }
      </tr>
    )
  }

  render () {
    const data = parseData(this.props.data)
    return (
      <>
        <Table className="data-source-preview">
          { this.renderHeader() }
          <tbody>
            { data.map(this.renderRow) }
          </tbody>
        </Table>
      </>
    )
  }
}

function mapState (state, props) {
  const project = state.projects[props.projectId]
  return { project }
}

const actionCreators = {}

export default connect(mapState, actionCreators)(DataSourceDataPreview)
