import axios from 'axios'

const axiosClients = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
