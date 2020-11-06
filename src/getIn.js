const voidObj = {}

/**
 * Retrieve nested data in object using path
 * @param {Object} obj
 * @param {String} path object path e.g. 'my.path.test'
 * @param {any} defaultValue value returned if path does not exsits, (default `undefined`)
 * @returns {any, undefined}
 */
export default function getIn (obj, path, defaultValue = undefined) {
  if (obj == null) { return defaultValue }
  const paths = path.split('.')
  const v = paths.reduce(function (obj, path) {
    return obj[path] || voidObj
  }, obj)
  return v === voidObj ? defaultValue : v
}
