import axios from 'axios'
import CONFIG from '~/constants/config'

const axiosClients = axios.create({
  baseURL: CONFIG.baseURL,
  timeout: 10000
})

axiosClients.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClients.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClients
