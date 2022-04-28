import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  withCredentials: true,
  headers: {
    accept: 'application/json'
  }
})

export default instance

