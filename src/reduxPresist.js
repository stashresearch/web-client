import Api from './Api'

const namespace = 'stashresearch'
const delimiter = ':'
const storage = window.localStorage

function getKey (str) {
  return `${namespace}${delimiter}${str}`
}

function persist ({ keys }) {
  return store => next => action => {
    const returnValue = next(action)
    keys.forEach(key => {
      storage.setItem(getKey(key), JSON.stringify(store.getState()[key]))
    })
    return returnValue
  }
}

function hydrate () {
  const regexp = new RegExp(`^${namespace}${delimiter}(.+)`)
  const state = {}
  for (let i = 0; i < storage.length; i++) {
    const key = localStorage.key(i)
    const match = key.match(regexp)
    if (match) {
      state[match[1]] = JSON.parse(storage.getItem(key))
    }
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('HYDRATE', state)
  }
  if (state.session) {
    Api.setAuthToken(state.session.token)
  }
  return state
}

function clear (key = null) {
  if (key == null) {
    storage.clear()
  } else {
    storage.removeItem(getKey(key))
  }
}

export {
  persist,
  hydrate,
  clear
}
