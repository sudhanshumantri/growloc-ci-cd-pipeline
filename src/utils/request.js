import axios from "axios";
import { isEmpty, toNumber } from "lodash";
import { Store } from "react-notifications-component";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcm93TG9jIiwic3ViIjp7InVzZXJJZCI6MX0sImlhdCI6MTY2NDg5MDg5N30.-5qxeV9zF_MfdOPWNJiVEQv8CC8OavXSUZksam6hpw0";
function queryParams(params) {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}
function handleError(error) {
  const errorObj = new Error(error);
  throw errorObj;
}

function makeAPICall(originalConfig) {
  console.log(originalConfig);
  return axios(originalConfig)
    .then((nextResponse) => {
      if (nextResponse.data.code == 0) {
        // browserHistory.push('/login');
        // browserHistory.go('/login');
        // localStorage.removeItem('AUTH_TOKEN');
        // localStorage.removeItem('AUTH_OBJECT');
        Store.addNotification({
          title: nextResponse.data.message,
          // message: "teodosii@react-notifications-component",
          type: "danger",
          insert: "top",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      } else {
        return nextResponse;
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
      // //console.log('bad request response', error.response);
      // if (error.response.status === 401) {
      //     return error.response.data.msg;
      // }
      // return handleError(error, otherConfig);
    });
}

export default function callApi(url, options = {}) {
  const defaultHeaders = {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8080/",
  };

  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  // const query = options.query || {};
  const method = options.method || "get";
  const data = options.data || null;
  const headers = "";
  const routeParams = options.routeParams;
  if (options.routeParams) {
    url = url + `${options.routeParams}`;
  }
  if (options.query) {
    url = url + `${options.query}`;
  }
  //= extend({ ...options.headers, ...defaultHeaders });
  const removeAuthorizationHeader = options.removeAuthorizationHeader || false;
  const timeout = options.timeout || null;
  const otherConfig = options.otherConfig || {};
  //  headers,
  const originalConfig = {
    method,
    url,
    headers,
  };

  if (data) {
    originalConfig.data = data;
  }

  if (timeout) {
    // axios expects timeout to be a no.
    originalConfig.timeout = toNumber(timeout);
  }

  if (!isEmpty(options.queryParams)) {
    let urlWithQueryParams = url;
    urlWithQueryParams +=
      (urlWithQueryParams.indexOf("?") === -1 ? "?" : "&") +
      queryParams(options.queryParams);
    delete options.queryParams;
    originalConfig.url = urlWithQueryParams;
  }
  if (!removeAuthorizationHeader) {
      originalConfig.headers = {
          'Authorization': "Bearer " + TOKEN
      };
  }
  return makeAPICall(originalConfig, otherConfig);
}
