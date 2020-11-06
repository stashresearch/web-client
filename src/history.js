import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

// history.listen((location, action) => {
//   console.log(`[${action}]: ${location.pathname}`)
//   if (action === 'POP') {
//     console.trace('poped')
//   }
// })

export default history
