import * as openpgp from 'openpgp'
import bcrypt from 'bcryptjs'
import { promisify } from 'es6-promisify'
import simpleHash from './simpleHash'

const genSalt = promisify(bcrypt.genSalt)
const bcryptHash = promisify(bcrypt.hash)

openpgp.config.show_comment = false
openpgp.config.show_version = false
// openpgp.config.aead_protect = true
let id = 0

const { hardwareConcurrency = 1 } = window.navigator || {}
openpgp.initWorker({ path: '/openpgp.worker.js', n: hardwareConcurrency })

let decryptsQueue = {}
const resolves = {}
const rejects = {}
let jobId = 0

function decryptQueue () {
  const batch = Object.values(decryptsQueue)
  decryptsQueue = {}
  batch.forEach(async (key) => {
    const privateKey = (await openpgp.key.readArmored(key.privateKey))
    if (privateKey.err) {
      console.error(privateKey.err)
      key.data.forEach((data) => {
        rejects[data.jobId](privateKey.err[0])
      })
      throw privateKey.err[0]
    }
    const publicKeys = (await openpgp.key.readArmored(key.publicKey)).keys
    const privateKeys = [privateKey.keys[0]]
    key.data.forEach(async (data) => {
      const decryptedText = await openpgp.decrypt({
        message: await openpgp.message.readArmored(data.text),
        publicKeys,
        privateKeys
      })
      resolves[data.jobId](decryptedText.data)
      return decryptedText.data
    })
  })
}

function initKey (publicKey, privateKey) {
  const hash = simpleHash(publicKey)
  if (decryptsQueue[hash] == null) {
    decryptsQueue[hash] = {
      publicKey, privateKey, data: []
    }
  }
  return hash
}

function queueDecrypt (data, publicKey, privateKey) {
  const hash = initKey(publicKey, privateKey)
  return new Promise(function (resolve, reject) {
    decryptsQueue[hash].data.push({ text: data, jobId })
    resolves[jobId] = resolve
    rejects[jobId] = reject
    jobId++
  })
}

setInterval(decryptQueue, 500)

function logPgpMessage (message) {
  message = message.replace(/^---.+$/mg, '').trim()
  const arr = message.split('\n')
  return `${arr[0]} [...] ${arr[arr.length - 2]} ${arr[arr.length - 1]}`
}

export default class Crypto {

  /**
   * @constructor
   * Creates Crypto instance
   * @param {String} publicKey
   * @param {String} privateKey
   * @param {String} passphrase
   */
  constructor (publicKey, privateKey = null, passphrase = null) {
    this.privateKey = privateKey
    this.publicKey = publicKey
    this.passphrase = passphrase
  }

  /**
   * Create Crypto instance from key data
   * @param {Object} key {publicKey, privateKey, passphrase, password}
   * @returns {Promise<Crypto>}
   * @throws {Error} crypto.import_key
   */
  static async importKey ({ publicKey, privateKey, passphrase, password }) {
    try {
      const hash = await Crypto.hashPassword(password, passphrase)
      const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(privateKey),
        passwords: [hash]
      })
      return new Crypto(publicKey, decrypted, passphrase)
    } catch (e) {
      console.error(e)
      throw new Error('crypto.import_key')
    }
  }

  /**
   * Encrypt message with symetric encryption
   * @param {String} message clear message
   * @param {String} key symetric key
   * @returns {Promise<String>} pgp armored message
   */
  static async symEncrypt (message, key) {
    console.log('sym enc', logPgpMessage(message), key)
    try {
      const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(message),
        passwords: [key]
      })
      return encrypted
    } catch (e) {
      console.error(e)
      throw new Error('crypto.symetric_encrypt')
    }
  }

  /**
   * Decrypt symetric encryption
   * @param {String} message encrypted message (pgp armored message)
   * @param {String} key symetric key
   * @returns {Promise<String>} decrypted message
   */
  static async symDecrypt (message, key) {
    console.log('sym dec', logPgpMessage(message), key)
    try {
      const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(message),
        passwords: [key]
      })
      return decrypted
    } catch (e) {
      // console.error(e)
      throw new Error('crypto.symetric_decrypt')
    }
  }

  /**
   * encrypt text with public key
   * @param {String} text
   * @returns {Promise<String>} armored encrypted text
   * @throws {Error} crypto.asym_encrypt
   */
  static async asymEncrypt (text, publicKey) {
    try {
      const encryptedText = await openpgp.encrypt({
        message: openpgp.message.fromText(text),
        publicKeys: (await openpgp.key.readArmored(publicKey)).keys
      })
      // console.log(encryptedText.data)
      return encryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
      throw new Error('crypto.asym_encrypt')
    }
  }

  static async decryptKey (encryptedPrivateKey, passphrase, password) {
    try {
      const hash = await Crypto.hashPassword(password, passphrase)
      const { data: decrypted } = await openpgp.decrypt({
        message: await openpgp.message.readArmored(encryptedPrivateKey),
        passwords: [hash]
      })
      return decrypted
    } catch (e) {
      console.error(e)
      throw new Error('crypto.decrypt_key')
    }
  }

  static async batchDecryptText ({ text, privateKey, publicKey }) {
    try {
      const decrypted = await queueDecrypt(text, publicKey, privateKey)
      return decrypted
    } catch (e) {
      console.error(e)
      throw new Error('crypto.batch_decrypt')
    }
  }

  static async decryptText ({ text, privateKey, publicKey }) {
    try {
      privateKey = (await openpgp.key.readArmored(privateKey))
      if (privateKey.err) {
        console.error(privateKey.err)
        throw privateKey.err[0]
      }
      const decryptedText = await openpgp.decrypt({
        message: await openpgp.message.readArmored(text),
        publicKeys: (await openpgp.key.readArmored(publicKey)).keys,
        privateKeys: [privateKey.keys[0]]
      })
      return decryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
      throw new Error('crypto.decrypt')
    }
  }

  /**
   * Generates key pair
   * @param {String} name for signing
   * @param {String} email for signing
   * @param {String} passphrase
   * @param {Integer} numBits
   * @returns {Promise<{publicKey, privateKey}>}
   * @throws {Error} crypto.generate_key
   */
  static async generateKey (name, email, passphrase, numBits = 2048) {
    try {
      const { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        userIds: [{ name, email }],
        numBits
      })
      return { privateKey: privateKeyArmored, publicKey: publicKeyArmored }
    } catch (e) {
      console.error(e)
      // TODO
      throw new Error('crypto.generate_key')
    }
  }

  /**
   * Hash password with salt
   * @param {String} password
   * @param {String} salt
   *  if provided salt pass with it, otherwise generates random salt
   * @returns {Promise}
   * @throws {Error} crypto.hash_password
   */
  static async hashPassword (password, salt = null) {
    try {
      salt = salt || await genSalt(10)
      return bcryptHash(password, salt)
    } catch (e) {
      console.error(e)
      throw new Error('crypto.hash_password')
    }
  }

  /**
   * encrypt text with public key
   * @param {String} text
   * @returns {Promise<String>} armored encrypted text
   * @throws {Error} crypto.encrypt
   */
  async encrypt (text) {
    try {
      const encryptedText = await openpgp.encrypt({
        message: openpgp.message.fromText(text),
        publicKeys: (await openpgp.key.readArmored(this.publicKey)).keys
      })
      // console.log(encryptedText.data)
      return encryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
      throw new Error('crypto.encrypt')
    }
  }

  /**
   * Decrypt armored encrypted text with private key
   * @param {String} text
   * @returns {Promise<String>} decrypted text
   * @throws {Error} crypto.decrypt
   */
  async decrypt (text) {
    try {
      const privateKey = (await openpgp.key.readArmored(this.privateKey))
      if (privateKey.err) {
        console.error(privateKey.err)
        throw privateKey.err[0]
      }
      const decryptedText = await openpgp.decrypt({
        message: await openpgp.message.readArmored(text),
        publicKeys: (await openpgp.key.readArmored(this.publicKey)).keys,
        privateKeys: [privateKey.keys[0]]
      })
      return decryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
      throw new Error('crypto.decrypt')
    }
  }

  async encryptAndSign (text) {
    try {
      const privateKey = (await openpgp.key.readArmored(this.privateKey))
      if (privateKey.err) {
        console.error(privateKey.err)
        throw privateKey.err[0]
      }
      const encryptedText = await openpgp.encrypt({
        message: openpgp.message.fromText(text),
        publicKeys: (await openpgp.key.readArmored(this.publicKey)).keys,
        privateKeys: [privateKey.keys[0]]
      })
      // console.log(encryptedText.data)
      return encryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
    }
  }

  async decryptSigned (text) {
    try {
      const privateKey = (await openpgp.key.readArmored(this.privateKey))
      if (privateKey.err) {
        console.error(privateKey.err)
        throw privateKey.err[0]
      }
      const decryptedText = await openpgp.decrypt({
        message: await openpgp.message.readArmored(text),
        publicKeys: (await openpgp.key.readArmored(this.publicKey)).keys,
        privateKeys: [privateKey.keys[0]]
      })
      if (!decryptedText.signatures || decryptedText.signatures.length === 0) {
        throw new Error('Signature not found')
      }
      for (const signature of decryptedText.signatures) {
        if (!signature.valid) throw new Error('Invalid Signature')
      }
      console.log(decryptedText.data)
      return decryptedText.data
    } catch (e) {
      console.error(e)
      // TODO
    }
  }

  /**
   * Encrypt private key before sending to server
   * @param {String} password
   * @param {Boolean} hashed
   *  true: passwor params is already hashed
   *  false: function will hash pass with `this.passphrase`
   * @returns {Promise} { publicKey, privateKey }
   * @throws {Error} crypto.private_key
   */
  async exportKey (password, hashed = false) {
    try {
      const hash = hashed ? password : await Crypto.hashPassword(password, this.passphrase)
      const { data: encrypted } = await openpgp.encrypt({
        message: openpgp.message.fromText(this.privateKey),
        passwords: [hash]
      })
      return { publicKey: this.publicKey, privateKey: encrypted }
    } catch (e) {
      console.error(e)
      throw new Error('crypto.export_key')
    }
  }
}

export {
  logPgpMessage
}
