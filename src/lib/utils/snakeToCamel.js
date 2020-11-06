
export default function snakeToCamel (str = '') {
  return str.replace(/_([a-z0-9])/g, function (_, $1) {
    return $1.toUpperCase()
  })
}
