import loadScript from 'load-script'
import eachSeries from 'async/eachSeries'
import { snakeKeys } from './utils/replaceKeys'

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js'
const libraries = ['client', 'auth2', 'picker']
const GOOGLE_LIB_MISSING_ERROR = new Error('Google api library missing')
let isLoading = false

export default class GoogleApi {

  static isReady () {
    return (window.gapi != null)
  }

  static isLibraryReady (library) {
    return (window.gapi[library] != null)
  }

  static areLibrariesReady () {
    return this.isReady() && libraries.every((lib) => {
      return this.isLibraryReady(lib)
    })
  }

  /**
   * Load Google JS api & libraries
   * @see self.loadLibraries
   * @param {function} callback
   */
  static load (callback) {
    if (this.isReady()) {
      this.loadLibraries(callback)
    } else if (!isLoading) {
      isLoading = true
      loadScript(GOOGLE_SDK_URL, this.loadLibraries.bind(this, callback))
    }
  }

  /**
   * Load Google libraries
   * @see libraries
   */
  static loadLibraries (callback, err) {
    isLoading = false
    if (err) {
      console.error('Error loading Googgle API script', err)
      callback(err)
    } else if (this.areLibrariesReady()) {
      callback()
    } else if (window.gapi != null && typeof window.gapi.load === 'function') {
      eachSeries(libraries, function (lib, next) { window.gapi.load(lib, next) }, function (err) {
        if (err) {
          console.error(new Error('Error loading google libraries: ' + err))
        }
        callback(err)
      })
    } else {
      console.error(GOOGLE_LIB_MISSING_ERROR)
    }
  }

  /**
   * Google api auth2 authorize
   *  @see https://developers.google.com/identity/sign-in/web/reference
   * @param {Object} options {
   *  clientId, scope, responseType, prompt, state, accessType, redirectUri
   * }
   * @param {function} callback
   */
  static authorize (options, callback) {
    if (window.gapi != null && window.gapi.auth2 != null) {
      const scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope
      console.log(snakeKeys(options))
      window.gapi.auth2.authorize({ ...snakeKeys(options), scope }, function (res) {
        /*
          FIXME: for now there is an issue with the auth2 authorize process,
            the popup is not closed automatically and is forced closed by server callback,
            thus we should ignore 'popup_closed_by_user' errors
        */
        if (res.error && res.error === 'popup_closed_by_user') {
          callback({})
        } else {
          callback(res)
        }
      })
    } else {
      console.error(GOOGLE_LIB_MISSING_ERROR)
      callback(GOOGLE_LIB_MISSING_ERROR)
    }
  }
}
