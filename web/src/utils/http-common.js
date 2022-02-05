import axios from 'axios'
const JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmJlN2VjODFkZjU3ZGI3MThmOTA0NiIsImVtYWlsIjoiaWFtY3VzaWNvbkBnbWFpbC5jb20iLCJpYXQiOjE2NDQwODQwNjB9.WreeH0Iu0tmhIF5XdieFGx2pFN2OR52UduKCOu6z9v0'

export const AXIOS = axios.create({
  baseURL: `http://[::1]:7300/api`, // localhost:7300
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
})
