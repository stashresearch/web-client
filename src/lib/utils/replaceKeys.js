import camelToSnake from './camelToSnake'
import snakeToCamel from './snakeToCamel'

function replaceKeys (replace, obj = {}) {
  const o = Object.assign({}, obj)
  Object.keys(o).forEach(function (k) {
    const replaced = replace(k)
    if (replaced !== k) {
      o[replaced] = o[k]
      delete o[k]
    }
  })
  return o
}

const snakeKeys = replaceKeys.bind(null, camelToSnake)
const camelKeys = replaceKeys.bind(null, snakeToCamel)

export default replaceKeys

export {
  snakeKeys,
  camelKeys
}
