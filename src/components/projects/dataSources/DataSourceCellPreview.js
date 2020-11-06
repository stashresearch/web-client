/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { ShieldLockIcon, UnlockIcon } from '@primer/octicons-react'
import memoize from 'p-memoize'
import Crypto from '../../../lib/Crypto'

const decryptData = memoize(function (text, publicKey, privateKey) {
  return Crypto.batchDecryptText({
    text,
    publicKey,
    privateKey
  })
})

export default function DataSourceCellPreview ({ projectId, cell, ...props }) {

  const { publicKey, decryptedPrivateKey } = useSelector(
    (state) => state.projects[projectId]
  )
  const [value, setValue] = React.useState(cell.encrypt ? <ShieldLockIcon /> : cell.v)

  React.useEffect(() => {
    if (cell.encrypt) {
      if (decryptedPrivateKey != null) {
        // const start = Date.now()
        setValue(<UnlockIcon />)
        decryptData(
          cell.v, publicKey, decryptedPrivateKey
        ).then((data) => {
          // console.log(data, Date.now() - start, 'ms')
          setValue(data)
        }).catch(console.error)
      } else {
        setValue(<ShieldLockIcon />)
      }
    }
  }, [cell.v, decryptedPrivateKey])

  const klass = typeof value === 'string' ? '' : 'text-center text-info'

  return (
    <td className={klass}>{ value }</td>
  )
}
