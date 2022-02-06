import axios from 'axios'
const JWT_TOKEN = process.env.VUE_APP_JWT_TOKEN
// Temporal AUTH TOKEN
// If you like a sign in feature, I could add one.

export const AXIOS = axios.create({
  baseURL: `http://[::1]:7300/api`, // localhost:7300
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
})
