
function parseCSV (data, { header = true, separator = ',' } = {}) {
  const result = []
  const rows = data.split(/(?!\B"[^"]*)\n(?![^"]*"\B)/g)
  rows.forEach(function (row, i) {
    if (i === 0 && !header) { return }
    const values = row.split(separator)
    result.push(values)
  })
  return result
}

export default parseCSV
