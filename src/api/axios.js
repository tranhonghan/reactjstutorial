
import axiosInstance from 'axios'
import ENDPOINT from './endpoint'
import {showLoading} from '../utils/helpers'
import APP_CONSTANTS from '../constants/appConstants'

const apiCallStack =  []

const axios = axiosInstance.create({
    baseURL: ENDPOINT.BASE_URL,
    timeout: 30000
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const userToken = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)

    const backgroundCall = config.data && config.data.background === true
    if (!backgroundCall) {
        showLoading(true)
        apiCallStack.push(config.url)
    }

    const headers = {
        'Content-type': 'application/json;charset=UTF-8'
    }
    if (userToken) {
        headers[APP_CONSTANTS.USER_TOKEN] = userToken
    }

    config.headers.common = headers

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const apiCallIndex = apiCallStack.indexOf(response.config.url)
    if (apiCallIndex !== -1) {
        showLoading(false)
        apiCallStack.splice(apiCallIndex, 1)
    }

    return response;

  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const apiCallIndex = apiCallStack.indexOf(error.config.url)
    if (apiCallIndex !== -1) {
        showLoading(false)
        apiCallStack.splice(apiCallIndex, 1)
    }

    return Promise.reject(error);
  });

  export default axios