import axios from 'axios'
import { isEmpty, toNumber } from 'lodash'
import { addNotification } from '../components/shared/notification'

function queryParams (params) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&')
}

function makeAPICall (originalConfig) {
  return axios(originalConfig)
    .then((nextResponse) => {
      return nextResponse
    })
    .catch((error) => {
      if (error.response && error.response.status) {
        localStorage.removeItem('AUTH_TOKEN')
        localStorage.removeItem('AUTH_OBJECT')
      } else {
        addNotification(
          error.message ? error.message : 'Server issue',
          5000,
          true,
          'danger'
        )
        return error
      }
    })
}
export default function callApi (url, options = {}) {
  // const defaultHeaders = {
  //   Accept: 'application/json',
  //   'Access-Control-Allow-Origin': 'http://localhost:8080/'
  // }

  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'
  // const query = options.query || {};
  const method = options.method || 'get'
  const data = options.data || null
  const headers = ''
  // const routeParams = options.routeParams
  if (options.routeParams) {
    url = url + `${options.routeParams}`
  }
  if (options.query) {
    url = url + `${options.query}`
  }
  //= extend({ ...options.headers, ...defaultHeaders });
  const removeAuthorizationHeader = options.removeAuthorizationHeader || false
  const timeout = options.timeout || null
  const otherConfig = options.otherConfig || {}
  //  headers,
  const originalConfig = {
    method,
    url,
    headers
  }

  if (data) {
    originalConfig.data = data
  }

  if (timeout) {
    // axios expects timeout to be a no.
    originalConfig.timeout = toNumber(timeout)
  }

  if (!isEmpty(options.queryParams)) {
    let urlWithQueryParams = url
    urlWithQueryParams +=
      (urlWithQueryParams.indexOf('?') === -1 ? '?' : '&') +
      queryParams(options.queryParams)
    delete options.queryParams
    originalConfig.url = urlWithQueryParams
  }

  if (!removeAuthorizationHeader) {
    const TOKEN = localStorage.getItem('AUTH_TOKEN')
    originalConfig.headers = {
      Authorization: 'Bearer ' + TOKEN
    }
  }
  return makeAPICall(originalConfig, otherConfig)
}
