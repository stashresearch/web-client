
export default function camelToSnake (str = '') {
  return str.replace(/([a-z]|(?:[A-Z0-9]+))([A-Z0-9]|$)/g, function (_, $1, $2) {
    return $1 + ($2 && '_' + $2)
  }).toLowerCase()
}
