import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  UploadIcon, CheckIcon, ShieldIcon, InfoIcon
} from '@primer/octicons-react'
import objectHash from 'object-hash'
import fetchDataSource from './../../../actions/projects/dataSources/fetchDataSource.action'
import fetchPrivateKey from './../../../actions/projects/fetchPrivateKey.action'
import putDataSourceData from './../../../actions/projects/dataSources/putDataSourceData.action'
import { CSV_PARSED } from './../../../config/const'
import Loading from './../../Loading'
import Crypto from './../../../lib/Crypto'
import EmptyState from './../../lib/EmptyState'

const klass = 'update-csv'
const DEV_WAIT_TIME = process.env.NODE_ENV === 'production' ? 100 : 1500

// TODO: handle changes in columns
// TODO: handle put rejected by server: better feedback

async function encryptParsedCsv (csv, columns, publicKey) {
  console.log('encrypt parsed CSV', columns)
  for (const r in csv.data) {
    const row = csv.data[r]
    for (const c in row) {
      const cell = row[c]
      if (columns[c].encrypt) {
        row[c] = await Crypto.asymEncrypt(cell, publicKey)
      }
    }
  }
  console.log(csv.data)
  return csv
}

function genChecksum (data) {
  const checksum = []
  for (const row of data) {
    const r = []
    for (const cell of row) {
      r.push(objectHash(cell))
    }
    checksum.push(r)
  }
  console.log(checksum)
  return checksum
}

export default function UpdateCsvDs ({
  dataSourceId, parsedCsv, waitingText, finishedText, onSent, link
}) {

  const dispatch = useDispatch()
  const dataSource = useSelector((state) => state.dataSources[dataSourceId])
  const publicKey = useSelector(
    (state) => state.projects[dataSource?.projectId]?.publicKey
  )
  const feedback = useSelector((state) => state.dataSources.putFeedback[dataSourceId])
  const [encrypted, setEncrypted] = React.useState(null)
  const [sent, setSent] = React.useState(false)

  // FETCH dataSource
  React.useEffect(() => {
    if (dataSource == null) {
      dispatch(fetchDataSource(dataSourceId))
    }
  }, [dataSource])

  // FETCH publicKey
  React.useEffect(() => {
    if (publicKey == null && dataSource != null) {
      dispatch(fetchPrivateKey(dataSource.projectId))
    }
  }, [publicKey])

  // ENCRYPT data
  React.useEffect(() => {
    if (dataSource && publicKey && parsedCsv && parsedCsv.type === CSV_PARSED) {
      const checksum = genChecksum(parsedCsv.data)
      encryptParsedCsv(parsedCsv, dataSource.columns, publicKey).then((parsed) => {
        parsed.checksum = checksum
        setTimeout(() => {
          setEncrypted(parsed)
        }, DEV_WAIT_TIME)
      })
    }
  }, [dataSource, publicKey, parsedCsv])

  // PUT upload data to server
  React.useEffect(() => {
    if (encrypted) {
      dispatch(putDataSourceData({
        id: dataSourceId,
        data: encrypted.data,
        columnNames: encrypted.meta.fields,
        checksum: encrypted.checksum
      })).then(() => {
        setTimeout(() => {
          setSent(true)
        }, DEV_WAIT_TIME)
      })
    }
  }, [encrypted])

  // CALLBACK
  React.useEffect(() => {
    if (sent) {
      onSent(dataSource)
    }
  }, [sent])

  if (dataSource == null) {
    return <Loading />
  } else if (feedback && feedback.success === false && feedback.error) {
    return (
      <EmptyState noBorder variant="danger" text="error"
        subText={JSON.stringify(feedback.error)} />
    )
  } else if (parsedCsv && parsedCsv.type === CSV_PARSED) {
    console.log(parsedCsv)
    if (sent) {
      return (
        <div className={ klass }>
          <CheckIcon size="large" className={`${klass}-icon`} />
          <div className={`${klass}-text`}>{ finishedText }</div>
          <Link to={`/projects/${dataSource.projectId}/settings`}
            className={`${klass}-action btn btn-link`}>
            go back to settings
          </Link>
        </div>
      )
    }
    if (encrypted) {
      console.log(encrypted)
      return (
        <div className={ klass }>
          <UploadIcon className={`${klass}-icon`} size="large" />
          <div className={`${klass}-text`}>
            Sending data...
          </div>
          <Loading />
        </div>
      )
    }
    return (
      <div className={ klass }>
        <ShieldIcon size="large" className={`${klass}-icon`} />
        <div className={`${klass}-text`}>
          Encrypting data...
        </div>
        <Loading />
        <div className={`${klass}-subtext mt-2`}>This might take a while please wait...</div>
      </div>
    )
  }

  return (
    <div className={ klass }>
      <InfoIcon size="large" className={`${klass}-icon`} />
      <div className={`${klass}-text`}>{ waitingText }</div>
    </div>
  )
}

UpdateCsvDs.propTypes = {
  dataSourceId: PropTypes.string.isRequired,
  parsedCsv: PropTypes.shape({
    data: PropTypes.array,
    type: PropTypes.string,
    meta: PropTypes.shape({
      fields: PropTypes.array
    })
  }),
  onSent: PropTypes.func,
  waitingText: PropTypes.string,
  finishedText: PropTypes.string,
  link: PropTypes.string
}

UpdateCsvDs.defaultProps = {
  onSent: function () {},
  waitingText: 'Waiting for CSV data...',
  finishedText: 'New CSV data was uploaded!'
}
