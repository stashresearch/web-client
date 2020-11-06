import Papa from 'papaparse'
import { CSV_PARSED } from './../config/const'

const csvTypes = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export default function parseCsvUpload (file) {
  return new Promise(function (resolve, reject) {
    if (!csvTypes.includes(file.type)) {
      return reject(new Error('file_type.incorrect'))
    }
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (data) => {
        if (data.errors && data.errors.length > 0) {
          const msgs = data.errors.map((e) => `${e.row ? `[row ${e.row}]` : ''} ${e.message}`)
          reject(new Error(msgs.length === 1 ? msgs[0] : msgs.join('\n')))
        } else {
          data.meta.fields = data.data.shift()
          data.sourceName = file.name
          data.type = CSV_PARSED
          resolve(data)
        }
      },
      error: (data) => {
        console.error(data)
        reject(new Error(data.message))
      }
    })
  })
}
