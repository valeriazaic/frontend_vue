import axios from 'axios'

const instance = axios.create({
 // baseURL: 'http://192.168.96.149:8080',
  baseURL: '/',
  withCredentials: true,
  headers: {
    accept: 'application/json'
  }
})

export default instance

