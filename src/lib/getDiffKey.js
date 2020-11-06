
export default function getDiffKey (target, source) {
  return `${target}${source == null ? '' : '/' + source}`
}
