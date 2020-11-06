import Crypto, { logPgpMessage } from '../Crypto'

/**
 * get recovery key (ensure recovery hash)
 * @param {String|Hash} key
 *  String -> direct key
 *  Hash -> { salt, password }
 */
function getRecoveryKey (key) {
  if (typeof key === 'string') {
    return Promise.resolve(key)
  } else {
    return Crypto.hashPassword(key.password, key.salt)
  }
}

/**
 * Decrypt project's member private key
 * @param {Srting} encryptedPrivateKey project's member private key
 * @param {String|Hash} recoveryKey see #getRecoveryKey
 */
async function decryptProjectPrivateKey (encryptedPrivateKey, recoveryKey) {
  return Crypto.symDecrypt(encryptedPrivateKey, await getRecoveryKey(recoveryKey))
}

/**
 *
 * @param {String} decryptedPrivateKey pgp asymetric encryption key
 * @param {String|Hash} recoveryKey see #getRecoveryKey
 */
async function encryptProjectPrivateKey (decryptedPrivateKey, recoveryKey) {
  return Crypto.symEncrypt(decryptedPrivateKey, await getRecoveryKey(recoveryKey))
}

/**
 * Re-encrypt project key:
 *  1. decrypt private key with recovery key
 *  2. encrypt private key with new password
 * @param {Srting} encryptedPrivateKey project's member private key
 * @param {String} decryptKey project's member recovery key
 * @param {String} encryptKey project's salt
 * @param {String} password user's new password
 */
async function recryptProjectKey (encryptedPrivateKey, decryptKey, encryptKey) {
  try {
    const privateKey = await decryptProjectPrivateKey(encryptedPrivateKey, decryptKey)
    console.log('dec priv key', logPgpMessage(privateKey))
    const newEncryptedPrivateKey = await encryptProjectPrivateKey(privateKey, encryptKey)
    console.log('new enc priv key', logPgpMessage(newEncryptedPrivateKey))
    return newEncryptedPrivateKey
  } catch (e) {
    console.error(e)
    if (e.message === 'crypto.symetric_decrypt') {
      console.error('failed to decrypt key')
    } else if (e.message === 'crypto.symetric_encrypt') {
      console.error('failed to encrypt key')
    }
    return Promise.reject(e)
    // TODO
  }
}

function needsRecovery (project, userId) {
  const me = project.members.filter((m) => m.userId === userId)[0]
  return me && me.needsRecovery
}

/**
 * Re-encrypt a single project private key
 * @param {Any} project
 * @param {String|Hash} decryptKey
 * @param {String|Hash} encryptKey
 */
async function projectRecovery (project, decryptKey, encryptKey) {
  if (project.needsRecovery) {
    const recrypted = await recryptProjectKey(
      project.encryptedPrivateKey,
      decryptKey,
      encryptKey
    )
    return { projectId: project.id, encryptedPrivateKey: recrypted }
  } else {
    return Promise.reject(new Error('project_recovery.no_flag'))
  }
}

async function masterPasswordRecovery (projects, decryptPassword, encryptPassword) {
  const recoveries = []
  for (const p of projects) {
    try {
      const recrypted = await projectRecovery(p, decryptPassword, encryptPassword)
      console.log(recrypted)
      recoveries.push(recrypted)
    } catch (e) {
      // console.error(e)
      return null
    }
  }
  return recoveries
}

export {
  getRecoveryKey,
  decryptProjectPrivateKey,
  encryptProjectPrivateKey,
  recryptProjectKey,
  masterPasswordRecovery,
  projectRecovery
}
