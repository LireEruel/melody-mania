/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from 'ant-design-vue'
import axios, { type InternalAxiosRequestConfig } from 'axios'

const cancelTokenSolurce = axios.CancelToken.source()

const axiosConfig = {
  cancelToken: cancelTokenSolurce.token
}

const commonAxios = axios.create(axiosConfig)

commonAxios.interceptors.request.use(function (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  config.headers = Object.assign({}, config.headers, {
    'Content-Type': 'application/json'
  })
  return config
})

commonAxios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.error(error)
    console.error('error', error?.response)
    const errorCode = String(error?.response?.status ?? '')
    if (errorCode === '401') {
      notification.error({
        key: 'error-notification',
        message: '토큰이 만료되었습니다. 로그인을 다시 해주세요.',
        description: errorCode,
        duration: 0
      })
    } else if (errorCode === '403') {
      notification.error({
        key: 'error-notification',
        message: '권한이 없습니다.',
        description: errorCode,
        duration: 0
      })
    } else {
      notification.error({
        key: 'error-notification',
        message: 'API 에러 발생',
        description: errorCode,
        duration: 0
      })
    }
    return Promise.reject(error)
  }
)

export default commonAxios
