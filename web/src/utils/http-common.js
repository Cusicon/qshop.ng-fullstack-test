import axios from 'axios'
const JWT_TOKEN = localStorage.getItem('VzaWNvb')

export const AXIOS = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api`,
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
})
