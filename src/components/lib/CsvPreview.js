import React from 'react'
import PropTypes from 'prop-types'
import memoizeOne from 'memoize-one'
import { Table } from 'react-bootstrap'
import Papa from 'papaparse'

const parseCsv = memoizeOne(function (data) {
  // return parseCSV(data, {
  //   header: true,
  //   separator: ','
  // })
  return Papa.parse(data, {
    header: false,
    delimiter: ','
  })
})

export default class CsvPreview extends React.Component {

  static propTypes = {
    data: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  renderHeaderRow (row) {
    return (
      <thead>
        <tr>
          { row.map((r, j) => (<th key={j}>{ r }</th>)) }
        </tr>
      </thead>
    )
  }

  renderRow (row, i) {
    if (i === 0) {
      return null
    }
    return (
      <tr key={i}>
        { row.map((r, j) => (<td key={j}>{ r }</td>)) }
      </tr>
    )
  }

  render () {
    const data = parseCsv(this.props.data).data
    return (
      <Table>
        { this.renderHeaderRow(data[0]) }
        <tbody>
          { data.map(this.renderRow) }
        </tbody>
      </Table>
    )
  }
}
