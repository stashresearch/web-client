import React from 'react'
import Crypto from '../lib/Crypto'

const PrivateKeyContext = React.createContext({
  decryptedPrivateKey: 'privateKeyContextTest',
  decryptKey: () => {}
})

function PrivateKeyContextProvider (props) {

  const [decryptedPrivateKey, setDecryptedPrivateKey] = React.useState('privateKeyContextTest')

  function decryptKey (encryptedKey, passphrase, password) {
    setDecryptedPrivateKey('test')
  }

  return (
    <PrivateKeyContext.Provider value={{ decryptedPrivateKey, decryptKey }}>
      {/* eslint-disable-next-line react/prop-types */}
      { props.children }
    </PrivateKeyContext.Provider>
  )
}

export default PrivateKeyContext

export {
  PrivateKeyContextProvider
}
