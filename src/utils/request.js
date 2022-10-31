import axios from "axios";
import { call, all, put, takeLatest } from "redux-saga/effects";
import { browserHistory } from "../store";
import { isEmpty, toNumber } from "lodash";
import { addNotification } from "./notification";
const TOKEN = localStorage.getItem("AUTH_TOKEN");
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
      return nextResponse;
    })
    .catch((error) => {
      if (error.response && error.response.status) {
        // browserHistory.push('/login');
        // browserHistory.go('/login');
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("AUTH_OBJECT");
      } else {
        addNotification(error);
        return error;
      }
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
      Authorization: "Bearer " + TOKEN,
    };
  }
  return makeAPICall(originalConfig, otherConfig);
}
