import axios from 'axios'
import authHeader from './auth-header.service'

const API_URL = 'http://127.0.0.1:8000/api/v1/'

class UserService {
  getUserBoard () {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getModeratorBoard () {
    return axios.get(API_URL + 'mod', { headers: authHeader() })
  }

  getAdminBoard () {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }
}

export default new UserService()
