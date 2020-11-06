import Api from './Api'
import { api } from './config/'

class ApiV2 extends Api {

  static baseUrl = `${api.protocol}://${api.domain}/v2`
}

export default ApiV2
