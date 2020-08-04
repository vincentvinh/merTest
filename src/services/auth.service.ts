import axios from 'axios'
import User from '@/models/user'

const API_URL = 'http://127.0.0.1:8000/api/v1/'

class AuthService {
  login (user: User) {
    const paramsUser = new URLSearchParams()
    paramsUser.append('username', user.email)
    paramsUser.append('password', user.password)
    console.log(user.password, user.email)

    return axios
      .post(API_URL + 'login/access-token', paramsUser)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
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
