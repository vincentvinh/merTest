import axios from 'axios'
import User from '@/models/user'

const API_URL = 'http://127.0.0.1:8000/api/v1/'

class AuthService {
  login (user: User) {
    const paramsUser = new URLSearchParams()
    paramsUser.append('username', user.email)
    paramsUser.append('password', user.password)

    return axios
      .post(API_URL + 'login/access-token', paramsUser)
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('token', JSON.stringify(response.data.access_token))
        }
        return response.data.access_token
      })
  }

  logout () {
    localStorage.removeItem('token')
  }

  register (user: User) {
    return axios.post(API_URL + 'users/open', {
      username: user.full_name,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
