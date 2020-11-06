
/**
 * Parse API error object
 * @param {Any} error error object from API
 */
export default function parseApiFormError (e) {
  if (e.data) {
    if (Array.isArray(e.data)) {
      const out = {}
      e.data.forEach((d) => { out[d.field] = d.message })
      return out
    } else {
      if (e.data.condition) {
        const out = {}
        const c = e.data.condition
        for (const f in c) {
          out[f] = c[f]
        }
        return out
      } else if (e.data.field && e.data.message) {
        return { [e.data.field]: e.data.message }
      }
      return e.data
    }
  } else {
    // TODO handle potential errors
    return `Server error:\n${JSON.stringify(e)}`
  }
}
