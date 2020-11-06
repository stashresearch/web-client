import { api } from './config/'

const baseUrl = `${api.protocol}://${api.domain}${api.endpoint}`

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'

class Api {

  static _bearer = null
  static baseUrl = baseUrl

  static getUrl (endpoint) {
    endpoint = endpoint.startsWith('/') ? endpoint : ('/' + endpoint)
    return `${this.baseUrl}${endpoint}`
  }

  static setAuthToken (token) {
    this._bearer = token
  }

  static buildHeaders () {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (this._bearer !== null) {
      headers.Authorization = `Bearer ${this._bearer}`
    }
    return headers
  }

  static request (endpoint, method, body = {}) {
    return fetch(this.getUrl(endpoint), {
      method,
      body: method !== 'get' ? JSON.stringify(body) : null,
      headers: this.buildHeaders()
    }).then((r) => {
      return r.json().then((data) => {
        return r.ok ? data : Promise.reject(data)
      })
    })
  }

  static getCSV (endpoint) {
    return fetch(this.getUrl(endpoint), {
      method: GET,
      headers: this.buildHeaders()
    }).then((res) => {
      return res.ok ? res.text() : Promise.reject(new Error(''))
    })
  }

  static get (endpoint) {
    return this.request(endpoint, GET)
  }

  static post (endpoint, body) {
    return this.request(endpoint, POST, body)
  }

  static put (endpoint, body) {
    return this.request(endpoint, PUT, body)
  }

  static delete (endpoint, body) {
    return this.request(endpoint, DELETE, body)
  }
}

export default Api
