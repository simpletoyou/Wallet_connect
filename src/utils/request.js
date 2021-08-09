import axios from 'axios'

// create an axios instance
const service = axios.create({
  timeout: 1000
})


// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
      return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
