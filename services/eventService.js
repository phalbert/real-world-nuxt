import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://5d6516c05b26ae001489eb85.mockapi.io/api/v1`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getEvents(page, perPage) {
    return apiClient.get('/events?page=' + page + ' &limit=' + perPage)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
