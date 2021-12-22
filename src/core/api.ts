import config from './config'
import makeApi from '@exobase/client-js'

export { ExobaseApi } from '@exobase/client-js'

export default () => {
  return makeApi(config.exobaseApiUrl)
}